<script setup lang="ts">
import { provide, ref } from 'vue'
import PeriodicTable from './components/PeriodicTable.vue'
import TopControlGrid from './components/TopControlGrid.vue'
import {
  CHINESE_DISPLAY_KEY,
  type ChineseDisplayMode,
} from './data/displaySettings'
import {
  PROPERTY_MODE_KEY,
  type PropertyMode,
} from './data/propertyModes'

const propertyMode = ref<PropertyMode>('atomicMass')
const chineseDisplay = ref<ChineseDisplayMode>('none')

provide(PROPERTY_MODE_KEY, propertyMode)
provide(CHINESE_DISPLAY_KEY, chineseDisplay)
</script>

<template>
  <main class="flex min-h-svh flex-col bg-white">
    <!-- Flush to viewport: no margin/padding on the control bar layer -->
    <TopControlGrid />

    <div class="flex flex-1 flex-col items-center overflow-x-auto pt-8">
      <PeriodicTable />
    </div>
  </main>
</template>
