"""Generate periodic-table/src/data/elements.ts from elements.json."""

from __future__ import annotations

import json
from pathlib import Path

_PROJECT_ROOT = Path(__file__).resolve().parents[2]
_JSON_PATH = _PROJECT_ROOT / "data" / "elements.json"
_TS_PATH = _PROJECT_ROOT.parent / "periodic-table" / "src" / "data" / "elements.ts"

_HEADER = """\
/** mendeleev series 英文名 */
export type ElementSeries =
  | 'Alkali metals'
  | 'Alkaline earth metals'
  | 'Transition metals'
  | 'Lanthanides'
  | 'Actinides'
  | 'Poor metals'
  | 'Metalloids'
  | 'Nonmetals'
  | 'Halogens'
  | 'Noble gases'

/** 周期表三大类（由 series 归并） */
export type ElementCategory = 'Metals' | 'Transition metals' | 'Nonmetals'

/** series → Metals / Transition metals / Nonmetals */
export const SERIES_TO_CATEGORY: Record<ElementSeries, ElementCategory> = {
  'Alkali metals': 'Metals',
  'Alkaline earth metals': 'Metals',
  'Poor metals': 'Metals',
  'Transition metals': 'Transition metals',
  Lanthanides: 'Transition metals',
  Actinides: 'Transition metals',
  Metalloids: 'Nonmetals',
  Nonmetals: 'Nonmetals',
  Halogens: 'Nonmetals',
  'Noble gases': 'Nonmetals',
}

export function categoryOfSeries(series: ElementSeries): ElementCategory {
  return SERIES_TO_CATEGORY[series]
}

export interface ElementInfo {
  /** 原子序数；无量纲 */
  atomicNumber: number
  /** 元素符号 */
  symbol: string
  /** 英语名称 */
  nameEn: string
  /** 中文名称（单汉字） */
  nameZh: string
  /** 相对原子质量（u，IUPAC；同 amu/Da，最多三位小数）；无标准原子量时为 "[质量数]" */
  atomicMass: number | string
  /** mendeleev 分类；无物理单位 */
  series: ElementSeries
  /** Pauling 电负性（无量纲）；无公认值时为 null */
  electronegativityPauling: number | null
  /** Slater 原子半径（pm）；无数据时为 null */
  atomicRadiusPm: number | null
  /** Pyykkö 单键共价半径（pm）；无数据时为 null */
  covalentRadiusPyykkoPm: number | null
  /** 金属半径（pm，`el.metallic_radius`）；非金属等无数据时为 null */
  metallicRadiusPm: number | null
  /** 范德华半径（pm，mendeleev 默认 `el.vdw_radius`）；超重元素等无数据时为 null */
  vdwRadiusPm: number | null
  /** 第一电离能（kJ/mol）；展示取整；无数据时为 null */
  ionizationEnergyFirstKjMol: number | null
  /** 电子亲和能（kJ/mol，mendeleev 符号约定）；展示取整；无数据时为 null */
  electronAffinityKjMol: number | null
}

/** 各字段单位；null 表示无物理单位或为分类/文本 */
export const ELEMENT_FIELD_UNITS = {
  atomicNumber: null,
  symbol: null,
  nameEn: null,
  nameZh: null,
  atomicMass: 'u',
  series: null,
  electronegativityPauling: null,
  atomicRadiusPm: 'pm',
  covalentRadiusPyykkoPm: 'pm',
  metallicRadiusPm: 'pm',
  vdwRadiusPm: 'pm',
  ionizationEnergyFirstKjMol: 'kJ/mol',
  electronAffinityKjMol: 'kJ/mol',
} as const

/** 1–118 号元素基本信息（由 periodic-table-data/data/elements.json 生成） */
export const ELEMENTS: ElementInfo[] = [
"""

_FOOTER = """\
]

/** 按原子序数索引（1–118） */
export const ELEMENTS_BY_Z: Record<number, ElementInfo> = Object.fromEntries(
  ELEMENTS.map((el) => [el.atomicNumber, el]),
)
"""


def _format_atomic_mass(value: int | float | str) -> str:
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, float) and value == int(value):
        return str(int(value))
    return repr(value)


def _format_nullable_number(value: int | float | None) -> str:
    return "null" if value is None else repr(value)


def _format_nullable_kj_mol(value: float | None) -> str:
    """General-chemistry display: integer kJ/mol."""
    if value is None:
        return "null"
    return repr(round(float(value)))


def _format_row(row: dict) -> str:
    mass = _format_atomic_mass(row["atomicMass"])
    en = _format_nullable_number(row["electronegativityPauling"])
    ar = _format_nullable_number(row["atomicRadiusPm"])
    cr = _format_nullable_number(row["covalentRadiusPyykkoPm"])
    mr = _format_nullable_number(row["metallicRadiusPm"])
    vr = _format_nullable_number(row["vdwRadiusPm"])
    ie = _format_nullable_kj_mol(row["ionizationEnergyFirstKjMol"])
    ea = _format_nullable_kj_mol(row["electronAffinityKjMol"])
    return (
        f'  {{ atomicNumber: {row["atomicNumber"]}, symbol: {json.dumps(row["symbol"])}, '
        f'nameEn: {json.dumps(row["nameEn"])}, nameZh: {json.dumps(row["nameZh"], ensure_ascii=False)}, '
        f"atomicMass: {mass}, series: {json.dumps(row['series'])}, "
        f"electronegativityPauling: {en}, atomicRadiusPm: {ar}, "
        f"covalentRadiusPyykkoPm: {cr}, metallicRadiusPm: {mr}, vdwRadiusPm: {vr}, "
        f"ionizationEnergyFirstKjMol: {ie}, "
        f"electronAffinityKjMol: {ea} }},"
    )


def run(
    json_path: Path | None = None,
    ts_path: Path | None = None,
) -> Path:
    src = json_path or _JSON_PATH
    dst = ts_path or _TS_PATH
    rows = json.loads(src.read_text(encoding="utf-8"))
    body = "\n".join(_format_row(r) for r in rows)
    dst.write_text(_HEADER + body + "\n" + _FOOTER, encoding="utf-8")
    return dst
