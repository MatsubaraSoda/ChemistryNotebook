<script setup lang="ts">
import ElementCell from './ElementCell.vue'
import {
  ACTINIDES,
  COLS,
  F_BLOCK_OFFSET_COLS,
  LANTHANIDES,
  MAIN_TABLE,
} from '../data/layout'

const gridStyle = {
  gridTemplateColumns: `repeat(${COLS}, var(--cell-size))`,
}

/** 镧/锕系行：左偏移 + 15 格后，剩余列填满以免挤到下一行开头 */
const fRowTrailing = COLS - F_BLOCK_OFFSET_COLS - LANTHANIDES.length
</script>

<template>
  <div class="inline-flex flex-col gap-3 [--cell-size:4.5rem]">
    <!-- 主表 7×18 -->
    <div class="grid gap-0.5" :style="gridStyle">
      <template v-for="(row, rowIndex) in MAIN_TABLE" :key="`p-${rowIndex}`">
        <template v-for="(cell, colIndex) in row" :key="`p-${rowIndex}-${colIndex}`">
          <ElementCell v-if="cell !== null" :atomic-number="cell" />
          <div v-else class="size-(--cell-size)" aria-hidden="true" />
        </template>
      </template>
    </div>

    <!-- f 区：前 2 列空位，从第 3 列与主表对齐 -->
    <div class="grid gap-0.5" :style="gridStyle">
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
    </div>
  </div>
</template>
