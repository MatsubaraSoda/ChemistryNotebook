/** 缺失项占位（em dash U+2014） */
export const MISSING = '—'

export function formatAtomicMass(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined || value === '') return MISSING
  return String(value)
}

export function formatSymbol(value: string | null | undefined): string {
  if (value === null || value === undefined || value === '') return MISSING
  return value
}
