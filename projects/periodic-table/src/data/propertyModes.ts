import type { InjectionKey, Ref } from 'vue'

export type PropertyMode =
  | 'atomicMass'
  | 'electronegativityPauling'
  | 'atomicRadiusPm'
  | 'covalentRadiusPyykkoPm'

export const PROPERTY_MODE_KEY: InjectionKey<Ref<PropertyMode>> =
  Symbol('propertyMode')
