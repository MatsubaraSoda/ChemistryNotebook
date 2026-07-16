"""Export a matplotlib named colormap as a hard-coded TypeScript LUT.

Runtime front-end only looks up this table — no colormap library in the HTML bundle.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

_PROJECT_ROOT = Path(__file__).resolve().parents[2]
_DEFAULT_OUT_DIR = (
    _PROJECT_ROOT.parent / "periodic-table" / "src" / "data" / "colormaps"
)


def _safe_ident(name: str) -> str:
    """Map colormap name to a valid TS export identifier (e.g. YlOrRd -> YLORRD)."""
    cleaned = re.sub(r"[^0-9A-Za-z]+", "_", name).strip("_")
    if not cleaned:
        raise ValueError(f"invalid colormap name: {name!r}")
    if cleaned[0].isdigit():
        cleaned = f"CM_{cleaned}"
    return cleaned.upper()


def export_colormap(
    name: str = "viridis",
    n: int = 256,
    out_dir: Path | None = None,
) -> Path:
    from matplotlib import colormaps

    if n < 2:
        raise ValueError("n must be >= 2")

    cmap = colormaps[name]
    rows: list[tuple[int, int, int]] = []
    for i in range(n):
        t = i / (n - 1)
        r, g, b, _a = cmap(t)
        rows.append((round(r * 255), round(g * 255), round(b * 255)))

    dest_dir = out_dir or _DEFAULT_OUT_DIR
    dest_dir.mkdir(parents=True, exist_ok=True)
    out_path = dest_dir / f"{name}.ts"

    const_name = f"{_safe_ident(name)}_RGB"
    body = ",\n".join(f"  [{r}, {g}, {b}]" for r, g, b in rows)
    text = (
        f"/** matplotlib sequential colormap: {name} (N={n}), sRGB 0–255 */\n"
        f"export const COLORMAP_NAME = {name!r} as const\n"
        f"export const {const_name}: readonly (readonly [number, number, number])[] = [\n"
        f"{body},\n"
        f"]\n"
    )
    out_path.write_text(text, encoding="utf-8")
    return out_path


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(
        description="Bake a matplotlib colormap to TypeScript RGB LUT",
    )
    parser.add_argument(
        "--name",
        default="viridis",
        help="matplotlib colormap name (default: viridis)",
    )
    parser.add_argument(
        "--n",
        type=int,
        default=256,
        help="number of samples (default: 256)",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=None,
        help="output directory (default: periodic-table/src/data/colormaps)",
    )
    args = parser.parse_args(argv)
    path = export_colormap(name=args.name, n=args.n, out_dir=args.out_dir)
    print(f"Wrote {path}")


if __name__ == "__main__":
    main()
