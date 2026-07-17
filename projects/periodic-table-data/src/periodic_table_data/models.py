"""Typed element records and field unit metadata."""

from __future__ import annotations

from dataclasses import asdict, dataclass, fields
from typing import Any

FIELD_UNITS: dict[str, str | None] = {
    "atomicNumber": None,
    "symbol": None,
    "nameEn": None,
    "nameZh": None,
    "atomicMass": "u",
    "series": None,
    "electronegativityPauling": None,
    "atomicRadiusPm": "pm",
    "covalentRadiusPyykkoPm": "pm",
    "metallicRadiusPm": "pm",
    "vdwRadiusPm": "pm",
    "ionizationEnergyFirstKjMol": "kJ/mol",
    "electronAffinityKjMol": "kJ/mol",
}


@dataclass(slots=True)
class ElementRecord:
    """One element row for export to JSON / TypeScript."""

    atomicNumber: int
    symbol: str
    nameEn: str
    nameZh: str
    atomicMass: float | str
    series: str
    electronegativityPauling: float | None
    atomicRadiusPm: int | None
    covalentRadiusPyykkoPm: int | None
    metallicRadiusPm: int | None
    vdwRadiusPm: int | None
    ionizationEnergyFirstKjMol: float | None
    electronAffinityKjMol: float | None

    def __post_init__(self) -> None:
        if not 1 <= self.atomicNumber <= 118:
            raise ValueError(f"atomicNumber out of range: {self.atomicNumber}")
        if not self.symbol or not self.nameEn or not self.nameZh:
            raise ValueError(f"missing name fields for Z={self.atomicNumber}")
        if self.atomicMass is None or self.atomicMass == "":
            raise ValueError(f"atomicMass missing for Z={self.atomicNumber}")
        if not self.series:
            raise ValueError(f"series missing for Z={self.atomicNumber}")
        if (
            self.electronegativityPauling is not None
            and self.electronegativityPauling <= 0
        ):
            raise ValueError(
                f"electronegativityPauling must be positive for Z={self.atomicNumber}"
            )
        for name in (
            "atomicRadiusPm",
            "covalentRadiusPyykkoPm",
            "metallicRadiusPm",
            "vdwRadiusPm",
        ):
            value = getattr(self, name)
            if value is not None and value <= 0:
                raise ValueError(f"{name} must be positive for Z={self.atomicNumber}")
        if (
            self.ionizationEnergyFirstKjMol is not None
            and self.ionizationEnergyFirstKjMol <= 0
        ):
            raise ValueError(
                f"ionizationEnergyFirstKjMol must be positive for Z={self.atomicNumber}"
            )

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def assert_field_units_complete() -> None:
    """FIELD_UNITS keys must match ElementRecord fields."""
    field_names = {f.name for f in fields(ElementRecord)}
    unit_names = set(FIELD_UNITS)
    if field_names != unit_names:
        raise ValueError(
            f"FIELD_UNITS keys {unit_names} != ElementRecord fields {field_names}"
        )
