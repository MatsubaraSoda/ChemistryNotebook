import { ELEMENTS, type ElementSeries } from './elements'
import { BUGN_RGB } from './colormaps/BuGn'
import { BUPU_RGB } from './colormaps/BuPu'
import { ORRD_RGB } from './colormaps/OrRd'
import { PUBU_RGB } from './colormaps/PuBu'
import { RDBU_RGB } from './colormaps/RdBu'
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

/**
 * Half-range for a 0-centered diverging map (matplotlib CenteredNorm style).
 * Optionally drop the N largest-|v| points from range estimation (outliers still
 * hit DIVERGING_T_MIN/MAX when sampled). Widen by 1/DATA_SPAN_FRACTION so typical
 * extremes use 75% of each half-axis before the soft clamp below.
 */
function centeredHalfRange(
  values: number[],
  dropLargestAbs = 0,
): number {
  let forRange = values
  if (dropLargestAbs > 0 && values.length > dropLargestAbs) {
    const drop = new Set(
      [...values]
        .sort((a, b) => Math.abs(b) - Math.abs(a))
        .slice(0, dropLargestAbs),
    )
    forRange = values.filter((v) => !drop.has(v))
  }
  const raw = Math.max(...forRange.map((v) => Math.abs(v)), 0)
  if (raw === 0) return 1
  return raw / DATA_SPAN_FRACTION
}

/** Soft ends of diverging LUTs: avoid near-black poles so black cell text stays readable. */
const DIVERGING_T_MIN = 0.12
const DIVERGING_T_MAX = 0.88

/** Map value → [0, 1] with 0 at t = 0.5; clamp away from LUT poles. */
function normalizeCentered(value: number, halfRange: number): number {
  const t = 0.5 + 0.5 * (value / halfRange)
  return Math.min(DIVERGING_T_MAX, Math.max(DIVERGING_T_MIN, t))
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

const metallicRadiusValues = ELEMENTS.map((el) => el.metallicRadiusPm).filter(
  (value): value is number => value !== null,
)

const METALLIC_RADIUS_MIN = Math.min(...metallicRadiusValues)
const METALLIC_RADIUS_MAX = domainMax(
  METALLIC_RADIUS_MIN,
  Math.max(...metallicRadiusValues),
)

const vdwRadiusValues = ELEMENTS.map((el) => el.vdwRadiusPm).filter(
  (value): value is number => value !== null,
)

const VDW_RADIUS_MIN = Math.min(...vdwRadiusValues)
const VDW_RADIUS_MAX = domainMax(VDW_RADIUS_MIN, Math.max(...vdwRadiusValues))

const ionizationEnergyValues = ELEMENTS.map(
  (el) => el.ionizationEnergyFirstKjMol,
).filter((value): value is number => value !== null)

const IONIZATION_ENERGY_MIN = Math.min(...ionizationEnergyValues)
const IONIZATION_ENERGY_MAX = domainMax(
  IONIZATION_ENERGY_MIN,
  Math.max(...ionizationEnergyValues),
)

const electronAffinityValues = ELEMENTS.map(
  (el) => el.electronAffinityKjMol,
).filter((value): value is number => value !== null)

/** Drop He/Ar extreme negatives from range only; they clamp to DIVERGING_T_MIN. */
const ELECTRON_AFFINITY_HALF_RANGE = centeredHalfRange(
  electronAffinityValues,
  2,
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

function normalizeMetallicRadius(value: number): number {
  return (
    (value - METALLIC_RADIUS_MIN) / (METALLIC_RADIUS_MAX - METALLIC_RADIUS_MIN)
  )
}

function normalizeVdwRadius(value: number): number {
  return (value - VDW_RADIUS_MIN) / (VDW_RADIUS_MAX - VDW_RADIUS_MIN)
}

function normalizeIonizationEnergy(value: number): number {
  return (
    (value - IONIZATION_ENERGY_MIN) /
    (IONIZATION_ENERGY_MAX - IONIZATION_ENERGY_MIN)
  )
}

function normalizeElectronAffinity(value: number): number {
  return normalizeCentered(value, ELECTRON_AFFINITY_HALF_RANGE)
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

export function metallicRadiusBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(BUGN_RGB, normalizeMetallicRadius(value))
}

export function metallicRadiusTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}

export function vdwRadiusBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(PUBU_RGB, normalizeVdwRadius(value))
}

export function vdwRadiusTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}

export function ionizationEnergyBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(ORRD_RGB, normalizeIonizationEnergy(value))
}

export function ionizationEnergyTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}

export function electronAffinityBackground(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return sampleColormap(RDBU_RGB, normalizeElectronAffinity(value))
}

export function electronAffinityTextClass(
  _value: number | null | undefined,
): string {
  return 'text-black'
}

/*
 * Previous series palette (HEX/RGB):
 * Alkali metals #FFB74D [255, 183, 77]
 * Alkaline earth metals #FFF176 [255, 241, 118]
 * Transition metals #81D4FA [129, 212, 250]
 * Poor metals #B0BEC5 [176, 190, 197]
 * Metalloids #A5D6A7 [165, 214, 167]
 * Nonmetals #AED581 [174, 213, 129]
 * Halogens #4DB6AC [77, 182, 172]
 * Noble gases #9575CD [149, 117, 205]
 * Lanthanides #F48FB1 [244, 143, 177]
 * Actinides #CE93D8 [206, 147, 216]
 */
/** 10 类 mendeleev series 离散色（教材分区风格） */
export const SERIES_COLOR: Record<ElementSeries, string> = {
  'Alkali metals': 'hsl(0, 82%, 84%)',
  'Alkaline earth metals': 'hsl(32, 85%, 82%)',
  'Transition metals': 'hsl(215, 75%, 85%)',
  'Poor metals': 'hsl(190, 65%, 84%)',
  Metalloids: 'hsl(160, 55%, 84%)',
  Nonmetals: 'hsl(100, 55%, 84%)',
  Halogens: 'hsl(55, 80%, 80%)',
  'Noble gases': 'hsl(270, 70%, 86%)',
  Lanthanides: 'hsl(325, 70%, 85%)',
  Actinides: 'hsl(20, 45%, 82%)',
}

export function seriesBackground(
  series: ElementSeries | null | undefined,
): string {
  if (series === null || series === undefined) {
    return rgbCss(MISSING_RGB)
  }
  return SERIES_COLOR[series]
}

export function seriesTextClass(
  _series: ElementSeries | null | undefined,
): string {
  return 'text-black'
}
