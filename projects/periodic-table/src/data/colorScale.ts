import { ELEMENTS } from './elements'
import { BUPU_RGB } from './colormaps/BuPu'
import { YLGNBU_RGB } from './colormaps/YlGnBu'
import { YLORRD_RGB } from './colormaps/YlOrRd'

const MISSING_RGB = [245, 245, 245] as const

/**
 * Fraction of the colormap span the data occupies. The domain span is widened
 * so the data max lands at this fraction (0.75 → only the lightest 75% of the
 * LUT is used, keeping the darkest stops in reserve).
 */
const DATA_SPAN_FRACTION = 0.75

/** Widen [dataMin, dataMax] so dataMax maps to t = DATA_SPAN_FRACTION. */
function domainMax(dataMin: number, dataMax: number): number {
  return dataMin + (dataMax - dataMin) / DATA_SPAN_FRACTION
}

const electronegativityValues = ELEMENTS.map(
  (el) => el.electronegativityPauling,
).filter((value): value is number => value !== null)

const ELECTRONEGATIVITY_MIN = Math.min(...electronegativityValues)
const ELECTRONEGATIVITY_MAX = domainMax(
  ELECTRONEGATIVITY_MIN,
  Math.max(...electronegativityValues),
)

const atomicRadiusValues = ELEMENTS.map((el) => el.atomicRadiusPm).filter(
  (value): value is number => value !== null,
)

const ATOMIC_RADIUS_MIN = Math.min(...atomicRadiusValues)
const ATOMIC_RADIUS_MAX = domainMax(
  ATOMIC_RADIUS_MIN,
  Math.max(...atomicRadiusValues),
)

const covalentRadiusValues = ELEMENTS.map(
  (el) => el.covalentRadiusPyykkoPm,
).filter((value): value is number => value !== null)

const COVALENT_RADIUS_MIN = Math.min(...covalentRadiusValues)
const COVALENT_RADIUS_MAX = domainMax(
  COVALENT_RADIUS_MIN,
  Math.max(...covalentRadiusValues),
)

function normalizeElectronegativity(value: number): number {
  return (
    (value - ELECTRONEGATIVITY_MIN) /
    (ELECTRONEGATIVITY_MAX - ELECTRONEGATIVITY_MIN)
  )
}

function normalizeAtomicRadius(value: number): number {
  return (
    (value - ATOMIC_RADIUS_MIN) / (ATOMIC_RADIUS_MAX - ATOMIC_RADIUS_MIN)
  )
}

function normalizeCovalentRadius(value: number): number {
  return (
    (value - COVALENT_RADIUS_MIN) /
    (COVALENT_RADIUS_MAX - COVALENT_RADIUS_MIN)
  )
}

function rgbCss(rgb: readonly [number, number, number]): string {
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`
}

/** Nearest-neighbor sample from a baked matplotlib LUT (t in [0, 1]). */
export function sampleColormap(
  lut: readonly (readonly [number, number, number])[],
  t: number,
): string {
  if (lut.length === 0) return rgbCss(MISSING_RGB)
  const clamped = Math.min(1, Math.max(0, t))
  const index = Math.round(clamped * (lut.length - 1))
  return rgbCss(lut[index]!)
}

export function electronegativityBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(YLORRD_RGB, normalizeElectronegativity(value))
}

export function electronegativityTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}

export function atomicRadiusBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(YLGNBU_RGB, normalizeAtomicRadius(value))
}

export function atomicRadiusTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}

export function covalentRadiusBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(BUPU_RGB, normalizeCovalentRadius(value))
}

export function covalentRadiusTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}
