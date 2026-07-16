"""元素周期表数据流水线包。"""

from __future__ import annotations

__version__ = "0.1.0"


def main() -> None:
    from periodic_table_data.export import run
    from periodic_table_data.export_ts import run as run_ts

    path = run()
    print(f"Wrote {path}")
    ts_path = run_ts()
    print(f"Wrote {ts_path}")
