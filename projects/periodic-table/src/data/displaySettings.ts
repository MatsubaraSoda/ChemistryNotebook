import type { InjectionKey, Ref } from 'vue'

export type ChineseDisplayMode = 'none' | 'small' | 'large'

export const CHINESE_DISPLAY_KEY: InjectionKey<Ref<ChineseDisplayMode>> =
  Symbol('chineseDisplay')
