<script setup lang="ts">
import ElementCell from './ElementCell.vue'
import {
  ACTINIDES,
  COLS,
  F_BLOCK_OFFSET_COLS,
  GROUP_NUMBERS,
  LANTHANIDES,
  MAIN_TABLE,
  PERIOD_NUMBERS,
} from '../data/layout'

/** 左轴列 + 18 列元素，轴格与元素格同为 --cell-size 正方形 */
const gridStyle = {
  gridTemplateColumns: `repeat(${COLS + 1}, var(--cell-size))`,
}

/** 镧/锕系行：左偏移 + 15 格后，剩余列填满以免挤到下一行开头 */
const fRowTrailing = COLS - F_BLOCK_OFFSET_COLS - LANTHANIDES.length

/** 轴标签：正方形格内居中；字号用 --font-axis（相对 --cell-size） */
const axisLabelClass =
  'box-border flex size-(--cell-size) items-center justify-center text-(length:--font-axis) leading-none font-semibold tabular-nums text-neutral-700 opacity-60'
</script>

<template>
  <!--
    两个独立 grid（主表 / f 区），列：轴正方形 + 元素 × 18
    族/周期/6*/7* 均为无边框正方形；仅 ElementCell 有边框。
    字号相对 --cell-size：--font-meta / --font-symbol / --font-axis；区带高 --band-meta
    表宽 W = 19×cell + 18×gap(0.125rem)；4rem 时约 1252px
    cell = clamp：左右各留 0.75rem 内边距（用 100vw 扣减，不用 margin）
  -->
  <div
    class="inline-flex flex-col gap-3 [--cell-size:clamp(1.5rem,calc((100vw-1.5rem-18*0.125rem)/19),4rem)] [--font-meta:calc(var(--cell-size)*0.17)] [--font-symbol:calc(var(--cell-size)*0.28)] [--font-axis:calc(var(--cell-size)*0.32)] [--band-meta:calc(var(--cell-size)*0.28)]"
  >
    <!-- 主表：(1+7)×(1+18) = 顶栏族号 + 侧栏周期 + 元素 -->
    <div class="grid gap-0.5" :style="gridStyle">
      <!-- 行 0：空角 + 族号 1–18（均为正方形） -->
      <div class="size-(--cell-size)" aria-hidden="true" />
      <div
        v-for="g in GROUP_NUMBERS"
        :key="`g-${g}`"
        :class="axisLabelClass"
        aria-hidden="true"
      >
        {{ g }}
      </div>

      <!-- 行 1–7：周期号 + 元素行 -->
      <template v-for="(row, rowIndex) in MAIN_TABLE" :key="`p-${rowIndex}`">
        <div :class="axisLabelClass" aria-hidden="true">
          {{ PERIOD_NUMBERS[rowIndex] }}
        </div>
        <template v-for="(cell, colIndex) in row" :key="`p-${rowIndex}-${colIndex}`">
          <ElementCell v-if="cell !== null" :atomic-number="cell" />
          <div v-else class="size-(--cell-size)" aria-hidden="true" />
        </template>
      </template>
    </div>

    <!-- f 区：左栏 6*/7*（正方形）+ 原有偏移与元素（无顶栏族号） -->
    <div class="grid gap-0.5" :style="gridStyle">
      <div :class="axisLabelClass" aria-hidden="true">6*</div>
      <div
        v-for="i in F_BLOCK_OFFSET_COLS"
        :key="`ln-pad-${i}`"
        class="size-(--cell-size)"
        aria-hidden="true"
      />
      <ElementCell
        v-for="n in LANTHANIDES"
        :key="`ln-${n}`"
        :atomic-number="n"
      />
      <div
        v-for="i in fRowTrailing"
        :key="`ln-trail-${i}`"
        class="size-(--cell-size)"
        aria-hidden="true"
      />

      <div :class="axisLabelClass" aria-hidden="true">7*</div>
      <div
        v-for="i in F_BLOCK_OFFSET_COLS"
        :key="`an-pad-${i}`"
        class="size-(--cell-size)"
        aria-hidden="true"
      />
      <ElementCell
        v-for="n in ACTINIDES"
        :key="`an-${n}`"
        :atomic-number="n"
      />
      <div
        v-for="i in fRowTrailing"
        :key="`an-trail-${i}`"
        class="size-(--cell-size)"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
