# -*- coding: utf-8 -*-
"""
将同目录下 `proto_*.md` 转为 Jupyter Notebook (仅写 JSON, 不执行单元格).

规则:
1. 若正文以 YAML front matter (`---` ... `---`) 开头, 整块作为第 1 个 **raw** cell (供 Quarto 等).
2. 围栏代码块: 仅当语言标识归一化后为 `python` 时生成 **code** cell; 大小写及 `{python}` 形式均支持.
   其他语言的围栏不拆断前文, 与前后 Markdown 一并写入同一 **markdown** cell.
3. 其余内容按顺序写入 **markdown** cell.

输出: 与源 md 同目录, 文件名为去掉前缀 `proto_` 后的 basename + `.ipynb`.

用法:
  python script_md_to_ipynb.py              # 转换本脚本目录下所有 proto_*.md
  python script_md_to_ipynb.py path/to/proto_某篇.md  # 仅转换指定文件
"""
from __future__ import annotations

import json
import sys
import uuid
from pathlib import Path

PROTO_PREFIX = "proto_"


def to_jupyter_source(text: str) -> list[str]:
    if not text.endswith("\n"):
        text += "\n"
    return text.splitlines(keepends=True)


def normalize_fence_lang(opener_line: str) -> str | None:
    """从 ```xxx 行解析语言标识, 转小写; 非围栏行返回 None."""
    if not opener_line.startswith("```"):
        return None
    rest = opener_line[3:].strip()
    if not rest:
        return ""
    if rest.startswith("{") and rest.endswith("}"):
        rest = rest[1:-1].strip()
    return rest.split()[0].lower() if rest else ""


def split_yaml_front_matter(lines: list[str]) -> tuple[str | None, list[str]]:
    """
    若以 --- 开头且后续存在闭合 ---, 返回 (yaml_raw 含两侧 ---, 剩余行列表).
    否则返回 (None, 原列表).
    """
    if not lines:
        return None, lines
    if lines[0].strip() != "---":
        return None, lines
    for j in range(1, len(lines)):
        if lines[j].strip() == "---":
            yaml_block = "\n".join(lines[: j + 1]) + "\n"
            rest = lines[j + 1 :]
            return yaml_block, rest
    return None, lines


def md_lines_to_cells(body_lines: list[str]) -> list[dict]:
    """将正文行列表转为 notebook cells (不含 YAML raw cell)."""
    cells: list[dict] = []
    md_buf: list[str] = []
    i = 0
    n = len(body_lines)

    def flush_md() -> None:
        nonlocal md_buf
        if not md_buf:
            return
        text = "\n".join(md_buf)
        if text.strip():
            cells.append(
                {
                    "cell_type": "markdown",
                    "id": str(uuid.uuid4()),
                    "metadata": {},
                    "source": to_jupyter_source(text),
                }
            )
        md_buf = []

    while i < n:
        line = body_lines[i]
        lang = normalize_fence_lang(line)
        if lang is not None:
            if lang == "python":
                flush_md()
                i += 1
                code_lines: list[str] = []
                while i < n and not body_lines[i].startswith("```"):
                    code_lines.append(body_lines[i])
                    i += 1
                if i < n and body_lines[i].startswith("```"):
                    i += 1
                code = "\n".join(code_lines)
                cells.append(
                    {
                        "cell_type": "code",
                        "id": str(uuid.uuid4()),
                        "metadata": {},
                        "source": to_jupyter_source(code),
                        "outputs": [],
                        "execution_count": None,
                    }
                )
            else:
                # 非 python 围栏: 保留围栏与内容, 作为 markdown
                md_buf.append(line)
                i += 1
                while i < n and not body_lines[i].startswith("```"):
                    md_buf.append(body_lines[i])
                    i += 1
                if i < n:
                    md_buf.append(body_lines[i])
                    i += 1
        else:
            md_buf.append(line)
            i += 1

    flush_md()
    return cells


def proto_md_to_ipynb(proto_md: Path) -> Path:
    if proto_md.suffix.lower() != ".md":
        raise ValueError(f"需要 .md 文件: {proto_md}")
    name = proto_md.name
    if not name.startswith(PROTO_PREFIX):
        raise ValueError(f"源文件须以 {PROTO_PREFIX!r} 开头: {proto_md}")

    out_name = name[len(PROTO_PREFIX) :]
    if not out_name.lower().endswith(".md"):
        raise ValueError(f"去掉前缀后应为 .md 结尾: {proto_md}")
    out_ipynb = proto_md.with_name(out_name[:-3] + ".ipynb")

    text = proto_md.read_text(encoding="utf-8")
    lines = text.splitlines()
    yaml_block, body_lines = split_yaml_front_matter(lines)
    while body_lines and not body_lines[0].strip():
        body_lines.pop(0)

    nb_cells: list[dict] = []
    if yaml_block is not None:
        nb_cells.append(
            {
                "cell_type": "raw",
                "id": str(uuid.uuid4()),
                "metadata": {"vscode": {"languageId": "raw"}},
                "source": to_jupyter_source(yaml_block),
            }
        )

    nb_cells.extend(md_lines_to_cells(body_lines))

    nb = {
        "cells": nb_cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3",
            },
            "language_info": {
                "name": "python",
                "version": "3.13.0",
            },
        },
        "nbformat": 4,
        "nbformat_minor": 5,
    }

    out_ipynb.write_text(json.dumps(nb, ensure_ascii=False, indent=1), encoding="utf-8")
    return out_ipynb


def main() -> None:
    script_dir = Path(__file__).resolve().parent
    if len(sys.argv) > 1:
        paths = [Path(p).resolve() for p in sys.argv[1:]]
    else:
        paths = sorted(script_dir.glob(f"{PROTO_PREFIX}*.md"))

    if not paths:
        print(f"未找到待转换文件: {script_dir / (PROTO_PREFIX + '*.md')}", file=sys.stderr)
        sys.exit(1)

    for p in paths:
        out = proto_md_to_ipynb(p)
        print("OK:", p.name, "->", out.name)


if __name__ == "__main__":
    main()
