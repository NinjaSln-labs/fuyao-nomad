#!/usr/bin/env python3
"""扶摇 · Nomad — LangGraph runtime smoke（v0.36）

验证「导出映射产物可被真实编排 runtime 消费」：读取团队包 roster（harness 无关源）
与 LangGraph mapping（harness/langgraph/mapping.example.yaml），在真实 LangGraph
StateGraph 上组装并执行一条确定性链，断言映射语义成立。

边界（与 export-orchestration-mapping.md 一致）：
- 不调 LLM——槽位以确定性 stub node 表示，产出 roster 声明的 outputs 键名；
  验证的是映射/拓扑/门语义，不是模型行为。
- 不实现编排引擎——本脚本是「用户侧组装」的参考实现（smoke 形态）。
- 争用顾问（check:contention）仍在扶摇侧跑，不进图引擎。

验证的映射语义（公共映射表逐项）：
1. slots[].id --mapping--> StateGraph node id
2. serial 边链 --> 有向边（执行序断言）
3. orthogonal_slots --> 旁路链（条件边接线示例）
4. gate_level: confirm --> interrupt() 动态门 + Command(resume=) 续跑（HITL）——
   R15：LangGraph 1.2.x 实测 compile(interrupt_before=...) 不再中断（三形态探针），
   改用官方推荐的动态 interrupt() 承载 confirm 门（发现记录见 MAPPING.md）
5. slots[].outputs --> node 产出记录（stub 按 roster 声明回填键名）
6. 执行记录写外挂状态文件（.agents/langgraph-smoke/），图引擎不拥有

用法：
    python3 -m venv .venv && .venv/bin/pip install langgraph pyyaml
    python harness/langgraph/smoke/smoke.py --project .   # 项目根内运行

退出码：0 = 全过；1 = 任一断言失败。
"""

from __future__ import annotations

import argparse
import importlib.metadata as _im
import json
import operator
import sys
from pathlib import Path
from typing import Annotated, TypedDict

try:
    import yaml
except ImportError:
    sys.exit("缺少 pyyaml — 请在 venv 中 `pip install pyyaml`")

try:
    from langgraph.graph import END, START, StateGraph
    from langgraph.checkpoint.memory import InMemorySaver as Saver
    from langgraph.types import Command, interrupt
except ImportError:
    try:
        from langgraph.checkpoint.memory import MemorySaver as Saver  # type: ignore
        from langgraph.graph import END, START, StateGraph
        from langgraph.types import Command, interrupt
    except ImportError:
        sys.exit("缺少 langgraph — 请在 venv 中 `pip install langgraph`")


class SmokeState(TypedDict, total=False):
    """图状态：trace 只追加执行序；records 逐槽位记录产出；gate_decisions 记人工裁决。"""

    trace: Annotated[list[str], operator.add]
    records: Annotated[list[dict], operator.add]
    gate_decisions: Annotated[list[str], operator.add]


def discover_roster(project_root: Path) -> tuple[str, Path]:
    """在 agents/packs/ 下发现唯一 roster（多包时需 --pack-id 指定）。"""
    packs_dir = project_root / "agents" / "packs"
    if not packs_dir.is_dir():
        raise SystemExit(f"未找到 {packs_dir} — 请先在项目内 pack:import 团队包")
    found: list[tuple[str, Path]] = []
    for pack_dir in sorted(packs_dir.iterdir()):
        roster = pack_dir / "roster.yaml"
        if roster.is_file():
            found.append((pack_dir.name, roster))
    if not found:
        raise SystemExit("agents/packs/ 下无 roster.yaml")
    return found[0]


def load_yaml(path: Path) -> dict:
    with path.open(encoding="utf-8") as fh:
        data = yaml.safe_load(fh)
    if not isinstance(data, dict):
        raise SystemExit(f"{path} 应为 YAML 映射")
    return data


# --- Phase A：映射完整性（纯数据断言，不建图） ----------------------------


def check_mapping_integrity(roster: dict, mapping: dict) -> dict:
    """roster 槽位与 mapping 逐项对齐；返回摘要供 Phase B 消费。"""
    problems: list[str] = []

    roster_id = roster.get("id")
    if mapping.get("roster_id") != roster_id:
        problems.append(f"mapping.roster_id={mapping.get('roster_id')!r} != roster.id={roster_id!r}")

    slots = roster.get("slots") or []
    slot_ids = [s["id"] for s in slots]
    mappings: dict = mapping.get("mappings") or {}

    if sorted(mappings) != sorted(slot_ids):
        problems.append(f"mappings 槽位集 {sorted(mappings)} != roster 槽位集 {sorted(slot_ids)}")
    if len(set(mappings.values())) != len(mappings):
        problems.append(f"mappings 存在重复 node 名: {mappings}")

    node_names = {sid: mappings.get(sid, sid) for sid in slot_ids}

    topo = mapping.get("topology") or {}
    edges = topo.get("edges") or []
    orthogonal = topo.get("orthogonal") or []
    serial_chain = [edges[0][0]] + [e[1] for e in edges] if edges else []
    for pair in edges:
        if len(pair) != 2 or pair[0] not in slot_ids or pair[1] not in slot_ids:
            problems.append(f"topology.edges 含未知槽位: {pair}")

    orch = roster.get("orchestration") or {}
    if orch.get("mode") == "serial":
        order = orch.get("serial_order") or []
        if serial_chain != order:
            problems.append(f"mapping serial 链 {serial_chain} != roster.serial_order {order}")
    roster_orth = orch.get("orthogonal_slots") or []
    if sorted(orthogonal) != sorted(roster_orth):
        problems.append(f"mapping.topology.orthogonal {orthogonal} != roster.orthogonal_slots {roster_orth}")

    confirm_slots = [s["id"] for s in slots if s.get("gate_level") == "confirm"]
    overlap = set(serial_chain) & set(orthogonal)
    if overlap:
        problems.append(f"serial 与 orthogonal 槽位重叠: {sorted(overlap)}")

    if problems:
        raise SystemExit("Phase A 映射完整性失败:\n  - " + "\n  - ".join(problems))

    return {
        "roster_id": roster_id,
        "slot_ids": slot_ids,
        "node_names": node_names,
        "serial_chain": serial_chain,
        "orthogonal_chain": orthogonal,
        "confirm_slots": confirm_slots,
        "outputs_by_slot": {s["id"]: s.get("outputs") or [] for s in slots},
        "purpose_by_slot": {s["id"]: s.get("purpose", "") for s in slots},
    }


# --- Phase B：组装 StateGraph 并执行（真实 LangGraph runtime） ------------


def build_graph(summary: dict, gate_nodes: set[str]) -> StateGraph:
    """按 mapping 组装图：serial 链 + 正交旁路链；confirm 槽位内嵌动态 interrupt() 门。"""
    names = summary["node_names"]
    serial_chain = summary["serial_chain"]
    orthogonal_chain = summary["orthogonal_chain"]
    outputs_by_slot = summary["outputs_by_slot"]
    purpose_by_slot = summary["purpose_by_slot"]

    graph = StateGraph(SmokeState)

    for slot_id in summary["slot_ids"]:
        node_name = names[slot_id]

        def make_node(sid: str, nname: str):
            def node_fn(state: SmokeState) -> dict:
                # confirm 门：动态 interrupt()（R15 —— interrupt_before 在 1.2.x 不可靠）
                if nname in gate_nodes:
                    interrupt({
                        "gate": nname,
                        "roster_slot": sid,
                        "message": "gate_level=confirm — 待人工裁决",
                    })
                record = {
                    "slot": sid,
                    "node": nname,
                    "purpose": purpose_by_slot[sid],
                    "outputs": list(outputs_by_slot[sid]),
                }
                return {"trace": [nname], "records": [record]}

            node_fn.__name__ = nname
            return node_fn

        graph.add_node(node_name, make_node(slot_id, node_name))

    # serial 链：START → 首槽 → …（边序来自 mapping.topology.edges）
    if serial_chain:
        graph.add_edge(START, names[serial_chain[0]])
        for src, dst in zip(serial_chain, serial_chain[1:]):
            graph.add_edge(names[src], names[dst])

    # 正交旁路链（选型示例）：主链末槽经条件边接入正交链，链尾 → END
    # runtime 可另选 interrupt / 独立旁路形态——扶摇只声明槽位语义
    if orthogonal_chain:
        tail = names[serial_chain[-1]] if serial_chain else None
        first_orth = names[orthogonal_chain[0]]

        def route_to_orthogonal(state: SmokeState) -> str:
            return first_orth

        if tail:
            graph.add_conditional_edges(tail, route_to_orthogonal, [first_orth])
        else:
            graph.add_edge(START, first_orth)
        for src, dst in zip(orthogonal_chain, orthogonal_chain[1:]):
            graph.add_edge(names[src], names[dst])
        graph.add_edge(names[orthogonal_chain[-1]], END)
    elif serial_chain:
        graph.add_edge(names[serial_chain[-1]], END)

    return graph


def run_smoke(summary: dict) -> dict:
    """执行图：confirm 槽位以 interrupt() 门拦截；Command(resume=) 裁决后续跑至 END。"""
    names = summary["node_names"]
    gate_slots = summary["confirm_slots"]
    gate_nodes = {names[s] for s in gate_slots}

    graph = build_graph(summary, gate_nodes).compile(checkpointer=Saver())

    config = {"configurable": {"thread_id": "fuyao-langgraph-smoke"}}
    expected_serial = [names[s] for s in summary["serial_chain"]]
    expected_orth = [names[s] for s in summary["orthogonal_chain"]]
    gate_slot = summary["confirm_slots"][0] if summary["confirm_slots"] else None

    evidence: dict = {"steps": [], "assertions": []}

    def record(step: str, detail: dict) -> None:
        evidence["steps"].append({"step": step, **detail})

    # s1：首段执行至 confirm 门（interrupt() 于目标 node 内触发）
    result = graph.invoke({"trace": [], "records": []}, config)
    interrupted = bool(result.get("__interrupt__"))
    trace_before_gate = list(result.get("trace") or [])

    interrupts = result.get("__interrupt__") or ()
    gate_payloads = [getattr(i, "value", None) for i in interrupts]
    record("invoke-until-gate", {
        "interrupted": interrupted,
        "gate_payload": gate_payloads,
        "trace": trace_before_gate,
    })

    if gate_nodes:
        evidence["assertions"].append({
            "check": "confirm 槽位触发 interrupt() 动态门",
            "expect": f"中断于 {sorted(gate_nodes)}",
            "actual": interrupted and all(
                (p or {}).get("gate") in gate_nodes for p in gate_payloads
            ),
            "pass": interrupted and all(
                (p or {}).get("gate") in gate_nodes for p in gate_payloads
            ),
        })
        expected_pre_gate = [n for n in expected_serial if n not in gate_nodes]
        evidence["assertions"].append({
            "check": "门前置槽位已按 serial 序执行",
            "expect": expected_pre_gate,
            "actual": trace_before_gate,
            "pass": trace_before_gate == expected_pre_gate,
        })

        # 门：人工裁决（HITL）——Command(resume=) 携裁决续跑
        if gate_slot:
            decision = f"{gate_slot}: approved-by-operator"
            result = graph.invoke(Command(resume={"decision": decision}), config)
            record("gate-confirm", {
                "slot": gate_slot,
                "decision": decision,
                "resume": "Command(resume=)",
            })

    # s2：续跑至 END；校验终态
    final_trace = list(result.get("trace") or [])
    expected_trace = expected_serial + expected_orth
    evidence["assertions"].append({
        "check": "全链执行序 = mapping 拓扑（serial + orthogonal 旁路）",
        "expect": expected_trace,
        "actual": final_trace,
        "pass": final_trace == expected_trace,
    })

    records = result.get("records") or []
    serial_records = [r for r in records if r["slot"] in summary["serial_chain"]]
    evidence["assertions"].append({
        "check": "serial 槽位产出记录 = roster 声明 outputs（键名逐一）",
        "expect": {s: summary["outputs_by_slot"][s] for s in summary["serial_chain"]},
        "actual": {r["slot"]: r["outputs"] for r in serial_records},
        "pass": len(serial_records) == len(summary["serial_chain"])
        and all(r["outputs"] == summary["outputs_by_slot"][r["slot"]] for r in serial_records),
    })

    if gate_slot:
        # 裁决经 Command(resume=) 注入：门槽位在续跑中完成执行即裁决生效
        evidence["assertions"].append({
            "check": "confirm 门人工裁决已续跑通过（Command(resume=) 后门槽位完成执行）",
            "expect": f"{names[gate_slot]} 出现在 final_trace",
            "actual": names[gate_slot] in final_trace,
            "pass": names[gate_slot] in final_trace,
        })

    # node 名集 = mapping.mappings 值集（runtime 消费 mapping 的直接证据）
    evidence["assertions"].append({
        "check": "图 node 名集 = mapping.mappings 值集",
        "expect": sorted(set(summary["node_names"].values())),
        "actual": sorted(set(final_trace)),
        "pass": sorted(set(final_trace)) == sorted(set(summary["node_names"].values())),
    })

    evidence["final_trace"] = final_trace
    evidence["records"] = records
    return evidence


# --- Phase C：外挂状态落盘 + 结果汇总 -------------------------------------


def main() -> int:
    parser = argparse.ArgumentParser(description="扶摇 LangGraph runtime smoke")
    parser.add_argument("--project", default=".", help="项目根（已 pack:import）")
    parser.add_argument("--pack-id", default=None, help="多包时指定包 id")
    parser.add_argument(
        "--mapping",
        default="harness/langgraph/mapping.example.yaml",
        help="mapping 文件（相对项目根）",
    )
    parser.add_argument("--json", action="store_true", help="仅输出 JSON 证据")
    args = parser.parse_args()

    project = Path(args.project).resolve()
    pack_id, roster_path = discover_roster(project)
    if args.pack_id and pack_id != args.pack_id:
        raise SystemExit(f"发现包 {pack_id} != --pack-id {args.pack_id}")
    mapping_path = project / args.mapping
    if not mapping_path.is_file():
        raise SystemExit(f"未找到 mapping 文件: {mapping_path}")

    roster = load_yaml(roster_path)
    mapping = load_yaml(mapping_path)

    summary = check_mapping_integrity(roster, mapping)
    evidence = run_smoke(summary)

    # 外挂状态：执行记录写项目侧（图引擎不拥有——呼应 checkpoint 外挂形态）
    out_dir = project / ".agents" / "langgraph-smoke"
    out_dir.mkdir(parents=True, exist_ok=True)
    payload = {
        "roster_id": summary["roster_id"],
        "pack_dir": pack_id,
        "runtime": "langgraph",
        "runtime_version": _im.version("langgraph"),
        "mapping": args.mapping,
        "assertions": evidence["assertions"],
        "final_trace": evidence["final_trace"],
        "records": evidence["records"],
        "steps": evidence["steps"],
        "result": "pass" if all(a["pass"] for a in evidence["assertions"]) else "fail",
    }
    out_path = out_dir / "run.json"
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(f"roster : {summary['roster_id']}（{pack_id}）")
        print(f"mapping: {args.mapping}")
        print(f"runtime: langgraph {_im.version('langgraph')}")
        print(f"trace  : {' → '.join(evidence['final_trace'])}")
        for a in evidence["assertions"]:
            mark = "PASS" if a["pass"] else "FAIL"
            print(f"[{mark}] {a['check']}")
            if not a["pass"]:
                print(f"        expect={a['expect']!r}")
                print(f"        actual={a['actual']!r}")
        print(f"evidence → {out_path}")
        print(f"result  : {payload['result']}")

    return 0 if payload["result"] == "pass" else 1


if __name__ == "__main__":
    sys.exit(main())
