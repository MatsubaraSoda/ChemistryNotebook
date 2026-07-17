import type { ElementSeries } from './elements'
import { MISSING } from './cellDisplay'

/** mendeleev series → 第三区中文短名 */
export const SERIES_LABEL_ZH: Record<ElementSeries, string> = {
  'Alkali metals': '碱金属',
  'Alkaline earth metals': '碱土金属',
  'Transition metals': '过渡金属',
  Lanthanides: '镧系',
  Actinides: '锕系',
  'Poor metals': '主族金属',
  Metalloids: '类金属',
  Nonmetals: '非金属',
  Halogens: '卤素',
  'Noble gases': '稀有气体',
}

export function formatSeries(
  series: ElementSeries | null | undefined,
): string {
  if (series === null || series === undefined) return MISSING
  return SERIES_LABEL_ZH[series]
}
