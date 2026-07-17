/** 缺失项占位（em dash U+2014） */
export const MISSING = '—'

export function formatAtomicMass(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined || value === '') return MISSING
  return String(value)
}

export function formatElectronegativityPauling(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return value.toFixed(2)
}

export function formatAtomicRadiusPm(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return String(value)
}

export function formatCovalentRadiusPyykkoPm(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return String(value)
}

export function formatMetallicRadiusPm(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return String(value)
}

export function formatVdwRadiusPm(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return String(value)
}

export function formatIonizationEnergyFirstKjMol(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return String(Math.round(value))
}

export function formatElectronAffinityKjMol(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return MISSING
  return String(Math.round(value))
}

export function formatSymbol(value: string | null | undefined): string {
  if (value === null || value === undefined || value === '') return MISSING
  return value
}

export function formatNameZh(value: string | null | undefined): string {
  if (value === null || value === undefined || value === '') return MISSING
  return value
}
