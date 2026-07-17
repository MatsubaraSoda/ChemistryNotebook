<script setup lang="ts">
import { inject } from 'vue'
import {
  CHINESE_DISPLAY_KEY,
  type ChineseDisplayMode,
} from '../data/displaySettings'
import { PROPERTY_MODE_KEY, type PropertyMode } from '../data/propertyModes'

const injectedPropertyMode = inject(PROPERTY_MODE_KEY)
const injectedChineseDisplay = inject(CHINESE_DISPLAY_KEY)

if (!injectedPropertyMode) {
  throw new Error('TopControlGrid requires PROPERTY_MODE_KEY provider')
}

if (!injectedChineseDisplay) {
  throw new Error('TopControlGrid requires CHINESE_DISPLAY_KEY provider')
}

const propertyMode = injectedPropertyMode
const chineseDisplay = injectedChineseDisplay

const EXCLUSIVE_BUTTONS: { id: PropertyMode; label: string }[] = [
  { id: 'atomicMass', label: '标准原子量' },
  { id: 'electronegativityPauling', label: '电负性' },
  { id: 'series', label: '元素分类' },
  { id: 'atomicRadiusPm', label: '原子半径 (pm)' },
  { id: 'covalentRadiusPyykkoPm', label: '共价半径 (pm)' },
  { id: 'metallicRadiusPm', label: '金属半径 (pm)' },
  { id: 'vdwRadiusPm', label: '范德华半径 (pm)' },
  { id: 'ionizationEnergyFirstKjMol', label: '第一电离能 (kJ/mol)' },
  { id: 'electronAffinityKjMol', label: '电子亲和能 (kJ/mol)' },
]

function selectMode(id: PropertyMode): void {
  propertyMode.value = id
}

function nextChineseDisplayMode(mode: ChineseDisplayMode): ChineseDisplayMode {
  switch (mode) {
    case 'none':
      return 'small'
    case 'small':
      return 'large'
    case 'large':
      return 'none'
  }
}

function toggleChineseDisplay(): void {
  chineseDisplay.value = nextChineseDisplayMode(chineseDisplay.value)
}

function chineseDisplayLabel(mode: ChineseDisplayMode): string {
  switch (mode) {
    case 'small':
      return '中文显示 (小)'
    case 'large':
      return '中文显示 (大)'
    case 'none':
      return '中文显示 (无)'
  }
}
</script>

<template>
  <section
    class="m-0 grid w-full grid-cols-10 gap-0 border-b border-solid border-neutral-900 p-0"
    aria-label="顶部显示控制栏"
  >
    <div class="contents" role="radiogroup" aria-label="第三区属性（互斥）">
      <button
        v-for="btn in EXCLUSIVE_BUTTONS"
        :key="btn.id"
        type="button"
        class="box-border flex min-h-10 cursor-pointer items-center justify-center border-r border-solid border-neutral-900 px-2 text-sm leading-tight hover:bg-neutral-100"
        :class="
          btn.id === propertyMode
            ? 'bg-neutral-900 text-white hover:bg-neutral-900'
            : 'bg-white text-neutral-900'
        "
        role="radio"
        :aria-checked="btn.id === propertyMode"
        @click="selectMode(btn.id)"
      >
        {{ btn.label }}
      </button>
    </div>

    <button
      type="button"
      class="box-border flex min-h-10 cursor-pointer items-center justify-center px-2 text-sm leading-tight hover:bg-neutral-100"
      :class="
        chineseDisplay === 'none'
          ? 'bg-white text-neutral-900'
          : 'bg-neutral-900 text-white hover:bg-neutral-900'
      "
      :aria-pressed="chineseDisplay !== 'none'"
      @click="toggleChineseDisplay"
    >
      {{ chineseDisplayLabel(chineseDisplay) }}
    </button>
  </section>
</template>
