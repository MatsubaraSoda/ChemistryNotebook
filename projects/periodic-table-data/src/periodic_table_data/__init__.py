"""元素周期表数据流水线包。"""

from __future__ import annotations

__version__ = "0.1.0"


def main() -> None:
    from periodic_table_data.export import run

    path = run()
    print(f"Wrote {path}")
