<script setup lang="ts">
import { computed } from 'vue'
import { ELEMENTS_BY_Z } from '../data/elements'
import { formatAtomicMass, formatSymbol, MISSING } from '../data/cellDisplay'

const props = defineProps<{
  atomicNumber: number
}>()

/** 日后第三区切换用；第一版固定为相对原子质量 */
const propertyMode = 'atomicMass' as const

const element = computed(() => ELEMENTS_BY_Z[props.atomicNumber])

const displayZ = computed(() =>
  element.value ? String(element.value.atomicNumber) : MISSING,
)

const displaySymbol = computed(() =>
  formatSymbol(element.value?.symbol),
)

const displayMass = computed(() =>
  formatAtomicMass(element.value?.atomicMass),
)

const displayProperty = computed(() => {
  switch (propertyMode) {
    case 'atomicMass':
      return displayMass.value
    default:
      return MISSING
  }
})

const ariaLabel = computed(() => {
  const el = element.value
  if (!el) return `未知元素 ${props.atomicNumber}`
  return `${el.nameZh}，${el.atomicNumber} 号，相对原子质量 ${displayMass.value}`
})
</script>

<template>
  <!--
    Cell 内部架构（方形，flex 列，无 margin）

    ┌─ shell：size-(--cell-size)，始终方形 ─────────┐
    │ ① band-z      固定高度，贴上边；文字在区域内垂直居中、水平左对齐 │
    │ ② band-symbol flex-1，吃掉剩余高度；文字垂直+水平居中           │
    │ ③ band-prop   与 ① 同高，贴下边；文字在区域内垂直居中、水平居中 │
    └──────────────────────────────────────────────┘

    「贴边」= 区域在格子中的位置（① 首行 / ③ 末行）
    「居中」= 文字在各自区域内的对齐（items-center）
  -->
  <div
    class="box-border flex size-(--cell-size) flex-col overflow-hidden border border-solid border-black bg-white text-black"
    :aria-label="ariaLabel"
  >
    <!-- ① 原子序数区：贴上边；文字垂直居中、左对齐 -->
    <div
      class="flex h-5 shrink-0 items-center justify-start px-0.5 text-left text-xs leading-none tabular-nums"
    >
      {{ displayZ }}
    </div>

    <!-- ② 符号区：剩余空间；文字垂直+水平居中 -->
    <div
      class="flex flex-1 items-center justify-center text-lg leading-none font-semibold"
    >
      {{ displaySymbol }}
    </div>

    <!-- ③ 属性区（第一版：相对原子质量）：贴下边；文字垂直居中、水平居中 -->
    <div
      class="flex h-5 shrink-0 items-center justify-center truncate px-0.5 text-xs leading-none tabular-nums"
    >
      {{ displayProperty }}
    </div>
  </div>
</template>
