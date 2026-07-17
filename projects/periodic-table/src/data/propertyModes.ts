import type { InjectionKey, Ref } from 'vue'

export type PropertyMode =
  | 'series'
  | 'atomicMass'
  | 'electronegativityPauling'
  | 'atomicRadiusPm'
  | 'covalentRadiusPyykkoPm'
  | 'metallicRadiusPm'
  | 'vdwRadiusPm'
  | 'ionizationEnergyFirstKjMol'
  | 'electronAffinityKjMol'

export const PROPERTY_MODE_KEY: InjectionKey<Ref<PropertyMode>> =
  Symbol('propertyMode')
