/** 主表 7 周期 × 18 列；null 为不可见占位（含 La/Ac 原位） */
export const MAIN_TABLE: (number | null)[][] = [
  // Period 1
  [1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2],
  // Period 2
  [3, 4, null, null, null, null, null, null, null, null, null, null, 5, 6, 7, 8, 9, 10],
  // Period 3
  [11, 12, null, null, null, null, null, null, null, null, null, null, 13, 14, 15, 16, 17, 18],
  // Period 4
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  // Period 5
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  // Period 6（第 3 列留空，镧系在下方）
  [55, 56, null, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  // Period 7（第 3 列留空，锕系在下方）
  [87, 88, null, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
]

/** 镧系 La–Lu（57–71），与主表第 3 列对齐 */
export const LANTHANIDES: number[] = [
  57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
]

/** 锕系 Ac–Lr（89–103），与主表第 3 列对齐 */
export const ACTINIDES: number[] = [
  89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103,
]

export const COLS = 18
export const F_BLOCK_OFFSET_COLS = 2
