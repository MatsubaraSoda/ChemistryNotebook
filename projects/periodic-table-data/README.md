# 元素周期表数据流水线

用 **uv + Python 3.12** 拉取/整理元素周期表相关数据，导出给前端项目使用。

## 与前端的关系

| 项目 | 路径 | 职责 |
|------|------|------|
| 本项目 | `projects/periodic-table-data` | 数据获取与导出（Python） |
| 前端 | `projects/periodic-table` | 单文件 HTML 周期表 UI（Vue） |

前端运行时数据位于 `periodic-table/src/data/`；本项目**不**替代该目录，只负责生成可被前端消费的数据产物。

## Git 约定

与元素周期表相关的改动统一在分支 **`feat/periodic-table`** 上进行。

## 环境

- Python：**3.12 系列**（`requires-python = ">=3.12,<3.13"`）
- `.python-version` 已 pin 为 `3.12`
- 依赖：**mendeleev**（符号、英文名、相对原子质量）

## 中文名

简体单汉字来自 Code Golf 题表（非 mendeleev）：

https://codegolf.stackexchange.com/questions/283358/chinese-periodic-table-of-elements-%E5%85%83%E7%B4%A0%E5%91%A8%E6%9C%9F%E8%A1%A8

固化于 `src/periodic_table_data/name_zh.py`。

## 导出

```powershell
cd d:\WorkSpace\Blog\ChemistryNotebook\projects\periodic-table-data
uv sync
uv run periodic-table-data
```

生成 [`data/elements.json`](data/elements.json)，每条含：

- `atomicNumber` / `symbol` / `nameEn` / `nameZh` / `atomicMass`
- `atomicMass`：最多三位小数；无标准相对原子质量的放射性核素为整数质量数并加 `[]`（如 `[209]`）
- 说明：mendeleev 的 `mass_str()` 会对所有 `is_radioactive` 加括号（铀会变成 `[238.02891]`），与 IUPAC 不符；本项目按 IUPAC：Th/Pa/U 用数值，其余无标准原子量的放射性元素用 `[质量数]`

