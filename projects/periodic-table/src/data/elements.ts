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
} as const

/** 1–118 号元素基本信息（由 periodic-table-data/data/elements.json 生成） */
export const ELEMENTS: ElementInfo[] = [
  { atomicNumber: 1, symbol: "H", nameEn: "Hydrogen", nameZh: "氢", atomicMass: 1.008, series: "Nonmetals", electronegativityPauling: 2.2, atomicRadiusPm: 25, covalentRadiusPyykkoPm: 32 },
  { atomicNumber: 2, symbol: "He", nameEn: "Helium", nameZh: "氦", atomicMass: 4.003, series: "Noble gases", electronegativityPauling: null, atomicRadiusPm: 120, covalentRadiusPyykkoPm: 46 },
  { atomicNumber: 3, symbol: "Li", nameEn: "Lithium", nameZh: "锂", atomicMass: 6.94, series: "Alkali metals", electronegativityPauling: 0.98, atomicRadiusPm: 145, covalentRadiusPyykkoPm: 133 },
  { atomicNumber: 4, symbol: "Be", nameEn: "Beryllium", nameZh: "铍", atomicMass: 9.012, series: "Alkaline earth metals", electronegativityPauling: 1.57, atomicRadiusPm: 105, covalentRadiusPyykkoPm: 102 },
  { atomicNumber: 5, symbol: "B", nameEn: "Boron", nameZh: "硼", atomicMass: 10.81, series: "Metalloids", electronegativityPauling: 2.04, atomicRadiusPm: 85, covalentRadiusPyykkoPm: 85 },
  { atomicNumber: 6, symbol: "C", nameEn: "Carbon", nameZh: "碳", atomicMass: 12.011, series: "Nonmetals", electronegativityPauling: 2.55, atomicRadiusPm: 70, covalentRadiusPyykkoPm: 75 },
  { atomicNumber: 7, symbol: "N", nameEn: "Nitrogen", nameZh: "氮", atomicMass: 14.007, series: "Nonmetals", electronegativityPauling: 3.04, atomicRadiusPm: 65, covalentRadiusPyykkoPm: 71 },
  { atomicNumber: 8, symbol: "O", nameEn: "Oxygen", nameZh: "氧", atomicMass: 15.999, series: "Nonmetals", electronegativityPauling: 3.44, atomicRadiusPm: 60, covalentRadiusPyykkoPm: 63 },
  { atomicNumber: 9, symbol: "F", nameEn: "Fluorine", nameZh: "氟", atomicMass: 18.998, series: "Halogens", electronegativityPauling: 3.98, atomicRadiusPm: 50, covalentRadiusPyykkoPm: 64 },
  { atomicNumber: 10, symbol: "Ne", nameEn: "Neon", nameZh: "氖", atomicMass: 20.18, series: "Noble gases", electronegativityPauling: null, atomicRadiusPm: 160, covalentRadiusPyykkoPm: 67 },
  { atomicNumber: 11, symbol: "Na", nameEn: "Sodium", nameZh: "钠", atomicMass: 22.99, series: "Alkali metals", electronegativityPauling: 0.93, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 155 },
  { atomicNumber: 12, symbol: "Mg", nameEn: "Magnesium", nameZh: "镁", atomicMass: 24.305, series: "Alkaline earth metals", electronegativityPauling: 1.31, atomicRadiusPm: 150, covalentRadiusPyykkoPm: 139 },
  { atomicNumber: 13, symbol: "Al", nameEn: "Aluminum", nameZh: "铝", atomicMass: 26.982, series: "Poor metals", electronegativityPauling: 1.61, atomicRadiusPm: 125, covalentRadiusPyykkoPm: 126 },
  { atomicNumber: 14, symbol: "Si", nameEn: "Silicon", nameZh: "硅", atomicMass: 28.085, series: "Metalloids", electronegativityPauling: 1.9, atomicRadiusPm: 110, covalentRadiusPyykkoPm: 116 },
  { atomicNumber: 15, symbol: "P", nameEn: "Phosphorus", nameZh: "磷", atomicMass: 30.974, series: "Nonmetals", electronegativityPauling: 2.19, atomicRadiusPm: 100, covalentRadiusPyykkoPm: 111 },
  { atomicNumber: 16, symbol: "S", nameEn: "Sulfur", nameZh: "硫", atomicMass: 32.06, series: "Nonmetals", electronegativityPauling: 2.58, atomicRadiusPm: 100, covalentRadiusPyykkoPm: 103 },
  { atomicNumber: 17, symbol: "Cl", nameEn: "Chlorine", nameZh: "氯", atomicMass: 35.45, series: "Halogens", electronegativityPauling: 3.16, atomicRadiusPm: 100, covalentRadiusPyykkoPm: 99 },
  { atomicNumber: 18, symbol: "Ar", nameEn: "Argon", nameZh: "氩", atomicMass: 39.948, series: "Noble gases", electronegativityPauling: null, atomicRadiusPm: 71, covalentRadiusPyykkoPm: 96 },
  { atomicNumber: 19, symbol: "K", nameEn: "Potassium", nameZh: "钾", atomicMass: 39.098, series: "Alkali metals", electronegativityPauling: 0.82, atomicRadiusPm: 220, covalentRadiusPyykkoPm: 196 },
  { atomicNumber: 20, symbol: "Ca", nameEn: "Calcium", nameZh: "钙", atomicMass: 40.078, series: "Alkaline earth metals", electronegativityPauling: 1.0, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 171 },
  { atomicNumber: 21, symbol: "Sc", nameEn: "Scandium", nameZh: "钪", atomicMass: 44.956, series: "Transition metals", electronegativityPauling: 1.36, atomicRadiusPm: 160, covalentRadiusPyykkoPm: 148 },
  { atomicNumber: 22, symbol: "Ti", nameEn: "Titanium", nameZh: "钛", atomicMass: 47.867, series: "Transition metals", electronegativityPauling: 1.54, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 136 },
  { atomicNumber: 23, symbol: "V", nameEn: "Vanadium", nameZh: "钒", atomicMass: 50.941, series: "Transition metals", electronegativityPauling: 1.63, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 134 },
  { atomicNumber: 24, symbol: "Cr", nameEn: "Chromium", nameZh: "铬", atomicMass: 51.996, series: "Transition metals", electronegativityPauling: 1.66, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 122 },
  { atomicNumber: 25, symbol: "Mn", nameEn: "Manganese", nameZh: "锰", atomicMass: 54.938, series: "Transition metals", electronegativityPauling: 1.55, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 119 },
  { atomicNumber: 26, symbol: "Fe", nameEn: "Iron", nameZh: "铁", atomicMass: 55.845, series: "Transition metals", electronegativityPauling: 1.83, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 116 },
  { atomicNumber: 27, symbol: "Co", nameEn: "Cobalt", nameZh: "钴", atomicMass: 58.933, series: "Transition metals", electronegativityPauling: 1.88, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 111 },
  { atomicNumber: 28, symbol: "Ni", nameEn: "Nickel", nameZh: "镍", atomicMass: 58.693, series: "Transition metals", electronegativityPauling: 1.91, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 110 },
  { atomicNumber: 29, symbol: "Cu", nameEn: "Copper", nameZh: "铜", atomicMass: 63.546, series: "Transition metals", electronegativityPauling: 1.9, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 112 },
  { atomicNumber: 30, symbol: "Zn", nameEn: "Zinc", nameZh: "锌", atomicMass: 65.38, series: "Transition metals", electronegativityPauling: 1.65, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 118 },
  { atomicNumber: 31, symbol: "Ga", nameEn: "Gallium", nameZh: "镓", atomicMass: 69.723, series: "Poor metals", electronegativityPauling: 1.81, atomicRadiusPm: 130, covalentRadiusPyykkoPm: 124 },
  { atomicNumber: 32, symbol: "Ge", nameEn: "Germanium", nameZh: "锗", atomicMass: 72.63, series: "Metalloids", electronegativityPauling: 2.01, atomicRadiusPm: 125, covalentRadiusPyykkoPm: 121 },
  { atomicNumber: 33, symbol: "As", nameEn: "Arsenic", nameZh: "砷", atomicMass: 74.922, series: "Metalloids", electronegativityPauling: 2.18, atomicRadiusPm: 115, covalentRadiusPyykkoPm: 121 },
  { atomicNumber: 34, symbol: "Se", nameEn: "Selenium", nameZh: "硒", atomicMass: 78.971, series: "Nonmetals", electronegativityPauling: 2.55, atomicRadiusPm: 115, covalentRadiusPyykkoPm: 116 },
  { atomicNumber: 35, symbol: "Br", nameEn: "Bromine", nameZh: "溴", atomicMass: 79.904, series: "Halogens", electronegativityPauling: 2.96, atomicRadiusPm: 115, covalentRadiusPyykkoPm: 114 },
  { atomicNumber: 36, symbol: "Kr", nameEn: "Krypton", nameZh: "氪", atomicMass: 83.798, series: "Noble gases", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 117 },
  { atomicNumber: 37, symbol: "Rb", nameEn: "Rubidium", nameZh: "铷", atomicMass: 85.468, series: "Alkali metals", electronegativityPauling: 0.82, atomicRadiusPm: 235, covalentRadiusPyykkoPm: 210 },
  { atomicNumber: 38, symbol: "Sr", nameEn: "Strontium", nameZh: "锶", atomicMass: 87.62, series: "Alkaline earth metals", electronegativityPauling: 0.95, atomicRadiusPm: 200, covalentRadiusPyykkoPm: 185 },
  { atomicNumber: 39, symbol: "Y", nameEn: "Yttrium", nameZh: "钇", atomicMass: 88.906, series: "Transition metals", electronegativityPauling: 1.22, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 163 },
  { atomicNumber: 40, symbol: "Zr", nameEn: "Zirconium", nameZh: "锆", atomicMass: 91.224, series: "Transition metals", electronegativityPauling: 1.33, atomicRadiusPm: 155, covalentRadiusPyykkoPm: 154 },
  { atomicNumber: 41, symbol: "Nb", nameEn: "Niobium", nameZh: "铌", atomicMass: 92.906, series: "Transition metals", electronegativityPauling: 1.6, atomicRadiusPm: 145, covalentRadiusPyykkoPm: 147 },
  { atomicNumber: 42, symbol: "Mo", nameEn: "Molybdenum", nameZh: "钼", atomicMass: 95.95, series: "Transition metals", electronegativityPauling: 2.16, atomicRadiusPm: 145, covalentRadiusPyykkoPm: 138 },
  { atomicNumber: 43, symbol: "Tc", nameEn: "Technetium", nameZh: "锝", atomicMass: "[98]", series: "Transition metals", electronegativityPauling: 2.1, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 128 },
  { atomicNumber: 44, symbol: "Ru", nameEn: "Ruthenium", nameZh: "钌", atomicMass: 101.07, series: "Transition metals", electronegativityPauling: 2.2, atomicRadiusPm: 130, covalentRadiusPyykkoPm: 125 },
  { atomicNumber: 45, symbol: "Rh", nameEn: "Rhodium", nameZh: "铑", atomicMass: 102.906, series: "Transition metals", electronegativityPauling: 2.28, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 125 },
  { atomicNumber: 46, symbol: "Pd", nameEn: "Palladium", nameZh: "钯", atomicMass: 106.42, series: "Transition metals", electronegativityPauling: 2.2, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 120 },
  { atomicNumber: 47, symbol: "Ag", nameEn: "Silver", nameZh: "银", atomicMass: 107.868, series: "Transition metals", electronegativityPauling: 1.93, atomicRadiusPm: 160, covalentRadiusPyykkoPm: 128 },
  { atomicNumber: 48, symbol: "Cd", nameEn: "Cadmium", nameZh: "镉", atomicMass: 112.414, series: "Transition metals", electronegativityPauling: 1.69, atomicRadiusPm: 155, covalentRadiusPyykkoPm: 136 },
  { atomicNumber: 49, symbol: "In", nameEn: "Indium", nameZh: "铟", atomicMass: 114.818, series: "Poor metals", electronegativityPauling: 1.78, atomicRadiusPm: 155, covalentRadiusPyykkoPm: 142 },
  { atomicNumber: 50, symbol: "Sn", nameEn: "Tin", nameZh: "锡", atomicMass: 118.71, series: "Poor metals", electronegativityPauling: 1.96, atomicRadiusPm: 145, covalentRadiusPyykkoPm: 140 },
  { atomicNumber: 51, symbol: "Sb", nameEn: "Antimony", nameZh: "锑", atomicMass: 121.76, series: "Metalloids", electronegativityPauling: 2.05, atomicRadiusPm: 145, covalentRadiusPyykkoPm: 140 },
  { atomicNumber: 52, symbol: "Te", nameEn: "Tellurium", nameZh: "碲", atomicMass: 127.6, series: "Metalloids", electronegativityPauling: 2.1, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 136 },
  { atomicNumber: 53, symbol: "I", nameEn: "Iodine", nameZh: "碘", atomicMass: 126.904, series: "Halogens", electronegativityPauling: 2.66, atomicRadiusPm: 140, covalentRadiusPyykkoPm: 133 },
  { atomicNumber: 54, symbol: "Xe", nameEn: "Xenon", nameZh: "氙", atomicMass: 131.293, series: "Noble gases", electronegativityPauling: 2.6, atomicRadiusPm: null, covalentRadiusPyykkoPm: 131 },
  { atomicNumber: 55, symbol: "Cs", nameEn: "Cesium", nameZh: "铯", atomicMass: 132.905, series: "Alkali metals", electronegativityPauling: 0.79, atomicRadiusPm: 260, covalentRadiusPyykkoPm: 232 },
  { atomicNumber: 56, symbol: "Ba", nameEn: "Barium", nameZh: "钡", atomicMass: 137.327, series: "Alkaline earth metals", electronegativityPauling: 0.89, atomicRadiusPm: 215, covalentRadiusPyykkoPm: 196 },
  { atomicNumber: 57, symbol: "La", nameEn: "Lanthanum", nameZh: "镧", atomicMass: 138.905, series: "Lanthanides", electronegativityPauling: 1.1, atomicRadiusPm: 195, covalentRadiusPyykkoPm: 180 },
  { atomicNumber: 58, symbol: "Ce", nameEn: "Cerium", nameZh: "铈", atomicMass: 140.116, series: "Lanthanides", electronegativityPauling: 1.12, atomicRadiusPm: 185, covalentRadiusPyykkoPm: 163 },
  { atomicNumber: 59, symbol: "Pr", nameEn: "Praseodymium", nameZh: "镨", atomicMass: 140.908, series: "Lanthanides", electronegativityPauling: 1.13, atomicRadiusPm: 185, covalentRadiusPyykkoPm: 176 },
  { atomicNumber: 60, symbol: "Nd", nameEn: "Neodymium", nameZh: "钕", atomicMass: 144.242, series: "Lanthanides", electronegativityPauling: 1.14, atomicRadiusPm: 185, covalentRadiusPyykkoPm: 174 },
  { atomicNumber: 61, symbol: "Pm", nameEn: "Promethium", nameZh: "钷", atomicMass: "[145]", series: "Lanthanides", electronegativityPauling: null, atomicRadiusPm: 185, covalentRadiusPyykkoPm: 173 },
  { atomicNumber: 62, symbol: "Sm", nameEn: "Samarium", nameZh: "钐", atomicMass: 150.36, series: "Lanthanides", electronegativityPauling: 1.17, atomicRadiusPm: 185, covalentRadiusPyykkoPm: 172 },
  { atomicNumber: 63, symbol: "Eu", nameEn: "Europium", nameZh: "铕", atomicMass: 151.964, series: "Lanthanides", electronegativityPauling: null, atomicRadiusPm: 185, covalentRadiusPyykkoPm: 168 },
  { atomicNumber: 64, symbol: "Gd", nameEn: "Gadolinium", nameZh: "钆", atomicMass: 157.25, series: "Lanthanides", electronegativityPauling: 1.2, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 169 },
  { atomicNumber: 65, symbol: "Tb", nameEn: "Terbium", nameZh: "铽", atomicMass: 158.925, series: "Lanthanides", electronegativityPauling: null, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 168 },
  { atomicNumber: 66, symbol: "Dy", nameEn: "Dysprosium", nameZh: "镝", atomicMass: 162.5, series: "Lanthanides", electronegativityPauling: 1.22, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 167 },
  { atomicNumber: 67, symbol: "Ho", nameEn: "Holmium", nameZh: "钬", atomicMass: 164.93, series: "Lanthanides", electronegativityPauling: 1.23, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 166 },
  { atomicNumber: 68, symbol: "Er", nameEn: "Erbium", nameZh: "铒", atomicMass: 167.259, series: "Lanthanides", electronegativityPauling: 1.24, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 165 },
  { atomicNumber: 69, symbol: "Tm", nameEn: "Thulium", nameZh: "铥", atomicMass: 168.934, series: "Lanthanides", electronegativityPauling: 1.25, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 164 },
  { atomicNumber: 70, symbol: "Yb", nameEn: "Ytterbium", nameZh: "镱", atomicMass: 173.045, series: "Lanthanides", electronegativityPauling: null, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 170 },
  { atomicNumber: 71, symbol: "Lu", nameEn: "Lutetium", nameZh: "镥", atomicMass: 174.967, series: "Transition metals", electronegativityPauling: 1.0, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 162 },
  { atomicNumber: 72, symbol: "Hf", nameEn: "Hafnium", nameZh: "铪", atomicMass: 178.49, series: "Transition metals", electronegativityPauling: 1.3, atomicRadiusPm: 155, covalentRadiusPyykkoPm: 152 },
  { atomicNumber: 73, symbol: "Ta", nameEn: "Tantalum", nameZh: "钽", atomicMass: 180.948, series: "Transition metals", electronegativityPauling: 1.5, atomicRadiusPm: 145, covalentRadiusPyykkoPm: 146 },
  { atomicNumber: 74, symbol: "W", nameEn: "Tungsten", nameZh: "钨", atomicMass: 183.84, series: "Transition metals", electronegativityPauling: 1.7, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 137 },
  { atomicNumber: 75, symbol: "Re", nameEn: "Rhenium", nameZh: "铼", atomicMass: 186.207, series: "Transition metals", electronegativityPauling: 1.9, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 131 },
  { atomicNumber: 76, symbol: "Os", nameEn: "Osmium", nameZh: "锇", atomicMass: 190.23, series: "Transition metals", electronegativityPauling: 2.2, atomicRadiusPm: 130, covalentRadiusPyykkoPm: 129 },
  { atomicNumber: 77, symbol: "Ir", nameEn: "Iridium", nameZh: "铱", atomicMass: 192.217, series: "Transition metals", electronegativityPauling: 2.2, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 122 },
  { atomicNumber: 78, symbol: "Pt", nameEn: "Platinum", nameZh: "铂", atomicMass: 195.084, series: "Transition metals", electronegativityPauling: 2.2, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 123 },
  { atomicNumber: 79, symbol: "Au", nameEn: "Gold", nameZh: "金", atomicMass: 196.967, series: "Transition metals", electronegativityPauling: 2.4, atomicRadiusPm: 135, covalentRadiusPyykkoPm: 124 },
  { atomicNumber: 80, symbol: "Hg", nameEn: "Mercury", nameZh: "汞", atomicMass: 200.592, series: "Transition metals", electronegativityPauling: 1.9, atomicRadiusPm: 150, covalentRadiusPyykkoPm: 133 },
  { atomicNumber: 81, symbol: "Tl", nameEn: "Thallium", nameZh: "铊", atomicMass: 204.38, series: "Poor metals", electronegativityPauling: 1.8, atomicRadiusPm: 190, covalentRadiusPyykkoPm: 144 },
  { atomicNumber: 82, symbol: "Pb", nameEn: "Lead", nameZh: "铅", atomicMass: 207.2, series: "Poor metals", electronegativityPauling: 1.8, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 144 },
  { atomicNumber: 83, symbol: "Bi", nameEn: "Bismuth", nameZh: "铋", atomicMass: 208.98, series: "Poor metals", electronegativityPauling: 1.9, atomicRadiusPm: 160, covalentRadiusPyykkoPm: 151 },
  { atomicNumber: 84, symbol: "Po", nameEn: "Polonium", nameZh: "钋", atomicMass: "[209]", series: "Metalloids", electronegativityPauling: 2.0, atomicRadiusPm: 190, covalentRadiusPyykkoPm: 145 },
  { atomicNumber: 85, symbol: "At", nameEn: "Astatine", nameZh: "砹", atomicMass: "[210]", series: "Halogens", electronegativityPauling: 2.2, atomicRadiusPm: null, covalentRadiusPyykkoPm: 147 },
  { atomicNumber: 86, symbol: "Rn", nameEn: "Radon", nameZh: "氡", atomicMass: "[222]", series: "Noble gases", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 142 },
  { atomicNumber: 87, symbol: "Fr", nameEn: "Francium", nameZh: "钫", atomicMass: "[223]", series: "Alkali metals", electronegativityPauling: 0.7, atomicRadiusPm: null, covalentRadiusPyykkoPm: 223 },
  { atomicNumber: 88, symbol: "Ra", nameEn: "Radium", nameZh: "镭", atomicMass: "[226]", series: "Alkaline earth metals", electronegativityPauling: 0.9, atomicRadiusPm: 215, covalentRadiusPyykkoPm: 201 },
  { atomicNumber: 89, symbol: "Ac", nameEn: "Actinium", nameZh: "锕", atomicMass: "[227]", series: "Actinides", electronegativityPauling: 1.1, atomicRadiusPm: 195, covalentRadiusPyykkoPm: 186 },
  { atomicNumber: 90, symbol: "Th", nameEn: "Thorium", nameZh: "钍", atomicMass: 232.038, series: "Actinides", electronegativityPauling: 1.3, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 175 },
  { atomicNumber: 91, symbol: "Pa", nameEn: "Protactinium", nameZh: "镤", atomicMass: 231.036, series: "Actinides", electronegativityPauling: 1.5, atomicRadiusPm: 180, covalentRadiusPyykkoPm: 169 },
  { atomicNumber: 92, symbol: "U", nameEn: "Uranium", nameZh: "铀", atomicMass: 238.029, series: "Actinides", electronegativityPauling: 1.7, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 170 },
  { atomicNumber: 93, symbol: "Np", nameEn: "Neptunium", nameZh: "镎", atomicMass: "[237]", series: "Actinides", electronegativityPauling: 1.3, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 171 },
  { atomicNumber: 94, symbol: "Pu", nameEn: "Plutonium", nameZh: "钚", atomicMass: "[244]", series: "Actinides", electronegativityPauling: 1.3, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 172 },
  { atomicNumber: 95, symbol: "Am", nameEn: "Americium", nameZh: "镅", atomicMass: "[243]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: 175, covalentRadiusPyykkoPm: 166 },
  { atomicNumber: 96, symbol: "Cm", nameEn: "Curium", nameZh: "锔", atomicMass: "[247]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 166 },
  { atomicNumber: 97, symbol: "Bk", nameEn: "Berkelium", nameZh: "锫", atomicMass: "[247]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 168 },
  { atomicNumber: 98, symbol: "Cf", nameEn: "Californium", nameZh: "锎", atomicMass: "[251]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 168 },
  { atomicNumber: 99, symbol: "Es", nameEn: "Einsteinium", nameZh: "锿", atomicMass: "[252]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 165 },
  { atomicNumber: 100, symbol: "Fm", nameEn: "Fermium", nameZh: "镄", atomicMass: "[257]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 167 },
  { atomicNumber: 101, symbol: "Md", nameEn: "Mendelevium", nameZh: "钔", atomicMass: "[258]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 173 },
  { atomicNumber: 102, symbol: "No", nameEn: "Nobelium", nameZh: "锘", atomicMass: "[259]", series: "Actinides", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 176 },
  { atomicNumber: 103, symbol: "Lr", nameEn: "Lawrencium", nameZh: "铹", atomicMass: "[262]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 161 },
  { atomicNumber: 104, symbol: "Rf", nameEn: "Rutherfordium", nameZh: "𬬻", atomicMass: "[267]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 157 },
  { atomicNumber: 105, symbol: "Db", nameEn: "Dubnium", nameZh: "𬭊", atomicMass: "[268]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 149 },
  { atomicNumber: 106, symbol: "Sg", nameEn: "Seaborgium", nameZh: "𬭳", atomicMass: "[271]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 143 },
  { atomicNumber: 107, symbol: "Bh", nameEn: "Bohrium", nameZh: "𬭛", atomicMass: "[274]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 141 },
  { atomicNumber: 108, symbol: "Hs", nameEn: "Hassium", nameZh: "𬭶", atomicMass: "[269]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 134 },
  { atomicNumber: 109, symbol: "Mt", nameEn: "Meitnerium", nameZh: "鿏", atomicMass: "[276]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 129 },
  { atomicNumber: 110, symbol: "Ds", nameEn: "Darmstadtium", nameZh: "𫟼", atomicMass: "[281]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 128 },
  { atomicNumber: 111, symbol: "Rg", nameEn: "Roentgenium", nameZh: "𬬭", atomicMass: "[281]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 121 },
  { atomicNumber: 112, symbol: "Cn", nameEn: "Copernicium", nameZh: "鿔", atomicMass: "[285]", series: "Transition metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 122 },
  { atomicNumber: 113, symbol: "Nh", nameEn: "Nihonium", nameZh: "鿭", atomicMass: "[286]", series: "Poor metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 136 },
  { atomicNumber: 114, symbol: "Fl", nameEn: "Flerovium", nameZh: "𫓧", atomicMass: "[289]", series: "Poor metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 143 },
  { atomicNumber: 115, symbol: "Mc", nameEn: "Moscovium", nameZh: "镆", atomicMass: "[288]", series: "Poor metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 162 },
  { atomicNumber: 116, symbol: "Lv", nameEn: "Livermorium", nameZh: "𫟷", atomicMass: "[293]", series: "Poor metals", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 175 },
  { atomicNumber: 117, symbol: "Ts", nameEn: "Tennessine", nameZh: "鿬", atomicMass: "[294]", series: "Halogens", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 165 },
  { atomicNumber: 118, symbol: "Og", nameEn: "Oganesson", nameZh: "鿫", atomicMass: "[294]", series: "Noble gases", electronegativityPauling: null, atomicRadiusPm: null, covalentRadiusPyykkoPm: 157 },
]

/** 按原子序数索引（1–118） */
export const ELEMENTS_BY_Z: Record<number, ElementInfo> = Object.fromEntries(
  ELEMENTS.map((el) => [el.atomicNumber, el]),
)
