<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  atomicRadiusBackground,
  atomicRadiusTextClass,
  covalentRadiusBackground,
  covalentRadiusTextClass,
  electronegativityBackground,
  electronegativityTextClass,
} from '../data/colorScale'
import { CHINESE_DISPLAY_KEY } from '../data/displaySettings'
import { ELEMENTS_BY_Z } from '../data/elements'
import {
  formatAtomicMass,
  formatAtomicRadiusPm,
  formatCovalentRadiusPyykkoPm,
  formatElectronegativityPauling,
  formatNameZh,
  formatSymbol,
  MISSING,
} from '../data/cellDisplay'
import { PROPERTY_MODE_KEY } from '../data/propertyModes'

const props = defineProps<{
  atomicNumber: number
}>()

const injectedPropertyMode = inject(PROPERTY_MODE_KEY)
const injectedChineseDisplay = inject(CHINESE_DISPLAY_KEY)

if (!injectedPropertyMode) {
  throw new Error('ElementCell requires PROPERTY_MODE_KEY provider')
}

if (!injectedChineseDisplay) {
  throw new Error('ElementCell requires CHINESE_DISPLAY_KEY provider')
}

const propertyMode = injectedPropertyMode
const chineseDisplay = injectedChineseDisplay

const element = computed(() => ELEMENTS_BY_Z[props.atomicNumber])

const displayZ = computed(() =>
  element.value ? String(element.value.atomicNumber) : MISSING,
)

const displaySymbol = computed(() =>
  formatSymbol(element.value?.symbol),
)

const displayNameZh = computed(() =>
  formatNameZh(element.value?.nameZh),
)

const displayTopRight = computed(() => {
  switch (chineseDisplay.value) {
    case 'small':
      return displayNameZh.value
    case 'large':
      return displaySymbol.value
    case 'none':
      return ''
  }
})

const displayMain = computed(() =>
  chineseDisplay.value === 'large' ? displayNameZh.value : displaySymbol.value,
)

const displayMass = computed(() =>
  formatAtomicMass(element.value?.atomicMass),
)

const displayElectronegativity = computed(() =>
  formatElectronegativityPauling(element.value?.electronegativityPauling),
)

const displayAtomicRadius = computed(() =>
  formatAtomicRadiusPm(element.value?.atomicRadiusPm),
)

const displayCovalentRadius = computed(() =>
  formatCovalentRadiusPyykkoPm(element.value?.covalentRadiusPyykkoPm),
)

const displayProperty = computed(() => {
  switch (propertyMode.value) {
    case 'atomicMass':
      return displayMass.value
    case 'electronegativityPauling':
      return displayElectronegativity.value
    case 'atomicRadiusPm':
      return displayAtomicRadius.value
    case 'covalentRadiusPyykkoPm':
      return displayCovalentRadius.value
    default:
      return MISSING
  }
})

const cellBackground = computed(() => {
  switch (propertyMode.value) {
    case 'electronegativityPauling':
      return electronegativityBackground(element.value?.electronegativityPauling)
    case 'atomicRadiusPm':
      return atomicRadiusBackground(element.value?.atomicRadiusPm)
    case 'covalentRadiusPyykkoPm':
      return covalentRadiusBackground(element.value?.covalentRadiusPyykkoPm)
    default:
      return 'white'
  }
})

const propertyTextClass = computed(() => {
  switch (propertyMode.value) {
    case 'electronegativityPauling':
      return electronegativityTextClass(element.value?.electronegativityPauling)
    case 'atomicRadiusPm':
      return atomicRadiusTextClass(element.value?.atomicRadiusPm)
    case 'covalentRadiusPyykkoPm':
      return covalentRadiusTextClass(element.value?.covalentRadiusPyykkoPm)
    default:
      return 'text-black'
  }
})

const ariaLabel = computed(() => {
  const el = element.value
  if (!el) return `未知元素 ${props.atomicNumber}`
  const chineseDisplayNote =
    chineseDisplay.value === 'small'
      ? '，中文名小字显示于序数区右侧'
      : chineseDisplay.value === 'large'
        ? '，中文名大字显示于符号区'
        : ''
  switch (propertyMode.value) {
    case 'electronegativityPauling':
      return `${el.nameZh}，${el.atomicNumber} 号，Pauling 电负性 ${displayElectronegativity.value}${chineseDisplayNote}`
    case 'atomicRadiusPm':
      return `${el.nameZh}，${el.atomicNumber} 号，原子半径 ${displayAtomicRadius.value} pm${chineseDisplayNote}`
    case 'covalentRadiusPyykkoPm':
      return `${el.nameZh}，${el.atomicNumber} 号，Pyykkö 单键共价半径 ${displayCovalentRadius.value} pm${chineseDisplayNote}`
    default:
      return `${el.nameZh}，${el.atomicNumber} 号，标准原子量 ${displayMass.value}${chineseDisplayNote}`
    }
})
</script>

<template>
  <!--
    Cell 内部架构（方形，flex 列，无 margin）
    字号/区带高度继承 PeriodicTable 上相对 --cell-size 的变量：
    --font-meta / --font-symbol / --band-meta

    ┌─ shell：size-(--cell-size)，始终方形 ─────────┐
    │ ① band-z      固定高度，贴上边；左槽 Z，右槽按中文显示模式补充信息 │
    │ ② band-symbol flex-1，吃掉剩余高度；文字垂直+水平居中           │
    │ ③ band-prop   与 ① 同高，贴下边；文字在区域内垂直居中、水平居中 │
    └──────────────────────────────────────────────┘

    「贴边」= 区域在格子中的位置（① 首行 / ③ 末行）
    「居中」= 文字在各自区域内的对齐（items-center）
  -->
  <div
    class="box-border flex size-(--cell-size) flex-col overflow-hidden border border-solid border-black bg-white text-black"
    :aria-label="ariaLabel"
    :style="{ backgroundColor: cellBackground }"
  >
    <!-- ① 原子序数区：左槽 Z；右槽在中文小/大模式显示中文名或符号 -->
    <div
      class="flex h-(--band-meta) min-w-0 shrink-0 items-center justify-between px-0.5 text-(length:--font-meta) leading-none"
    >
      <span class="shrink-0 text-left tabular-nums">{{ displayZ }}</span>
      <span
        v-if="displayTopRight"
        class="min-w-0 shrink text-right"
      >
        {{ displayTopRight }}
      </span>
    </div>

    <!-- ② 符号区：剩余空间；文字垂直+水平居中 -->
    <div
      class="flex flex-1 items-center justify-center text-(length:--font-symbol) leading-none font-semibold"
    >
      {{ displayMain }}
    </div>

    <!-- ③ 属性区：贴下边；文字垂直居中、水平居中 -->
    <div
      class="flex h-(--band-meta) shrink-0 items-center justify-center px-0.5 text-(length:--font-meta) leading-none tabular-nums"
      :class="propertyTextClass"
    >
      {{ displayProperty }}
    </div>
  </div>
</template>
