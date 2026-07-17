"""Build and write elements.json from mendeleev + local Chinese names."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from mendeleev import element
from pint import UnitRegistry

from periodic_table_data.models import ElementRecord, assert_field_units_complete
from periodic_table_data.name_zh import NAME_ZH

# Package root: .../periodic-table-data
_PROJECT_ROOT = Path(__file__).resolve().parents[2]
_OUTPUT_PATH = _PROJECT_ROOT / "data" / "elements.json"

_UREG = UnitRegistry()

# IUPAC：虽具放射性但仍给出标准相对原子质量（不用 []）
# 见 https://iupac.qmul.ac.uk/AtWt/ — Th / Pa / U
_STANDARD_ATOMIC_WEIGHT_RADIOACTIVE = frozenset({90, 91, 92})


def _atomic_mass_number(value: Any) -> float:
    if value is None:
        raise ValueError("atomic_weight is missing")
    if isinstance(value, (int, float)):
        return float(value)
    try:
        return float(str(value).strip())
    except ValueError as exc:
        raise ValueError(f"cannot parse atomic_weight: {value!r}") from exc


def _round_max_3(value: float) -> float:
    """At most 3 decimal places (6.94 stays 6.94; 9.0121831 -> 9.012)."""
    return round(value, 3)


def _atomic_mass_field(el: Any) -> float | str:
    """Display mass per common periodic-table / IUPAC convention.

    - No standard atomic weight (most radioactives): mass number in brackets, e.g. \"[209]\".
    - Otherwise: relative atomic mass, max 3 decimal places (U is 238.029, not \"[238.02891]\").

    Note: mendeleev ``mass_str()`` wraps *all* ``is_radioactive`` values in brackets,
    including U — that disagrees with IUPAC (brackets = longest-lived isotope mass number
    when no standard atomic weight is assigned).
    """
    aw = _atomic_mass_number(el.atomic_weight)
    if el.is_radioactive and el.atomic_number not in _STANDARD_ATOMIC_WEIGHT_RADIOACTIVE:
        return f"[{round(aw)}]"
    return _round_max_3(aw)


def _pauling_electronegativity(el: Any) -> float | None:
    value = el.en_pauling
    if value is None:
        return None
    return round(float(value), 2)


def _radius_pm(el: Any, attr: str) -> int | None:
    value = getattr(el, attr)
    if value is None:
        return None
    return round(float(value))


def ev_to_kj_mol(value_eV: float) -> float:
    """Convert single-particle energy (eV) to molar energy (kJ/mol) via pint."""
    q = (value_eV * _UREG.eV * _UREG.N_A).to("kJ/mol")
    return float(q.magnitude)


def _first_ionization_energy_kj_mol(el: Any) -> float | None:
    energies = el.ionenergies
    if not energies:
        return None
    value = energies.get(1)
    if value is None:
        return None
    return ev_to_kj_mol(float(value))


def _electron_affinity_kj_mol(el: Any) -> float | None:
    value = el.electron_affinity
    if value is None:
        return None
    return ev_to_kj_mol(float(value))


def build_elements() -> list[ElementRecord]:
    assert_field_units_complete()
    rows: list[ElementRecord] = []
    for z in range(1, 119):
        el = element(z)
        rows.append(
            ElementRecord(
                atomicNumber=z,
                symbol=el.symbol,
                nameEn=el.name,
                nameZh=NAME_ZH[z - 1],
                atomicMass=_atomic_mass_field(el),
                series=el.series,
                electronegativityPauling=_pauling_electronegativity(el),
                atomicRadiusPm=_radius_pm(el, "atomic_radius"),
                covalentRadiusPyykkoPm=_radius_pm(el, "covalent_radius_pyykko"),
                metallicRadiusPm=_radius_pm(el, "metallic_radius"),
                vdwRadiusPm=_radius_pm(el, "vdw_radius"),
                ionizationEnergyFirstKjMol=_first_ionization_energy_kj_mol(el),
                electronAffinityKjMol=_electron_affinity_kj_mol(el),
            )
        )
    assert len(rows) == 118
    assert all(r.covalentRadiusPyykkoPm is not None for r in rows)
    return rows


def run(output_path: Path | None = None) -> Path:
    path = output_path or _OUTPUT_PATH
    path.parent.mkdir(parents=True, exist_ok=True)
    rows = build_elements()
    path.write_text(
        json.dumps([r.to_dict() for r in rows], ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return path
