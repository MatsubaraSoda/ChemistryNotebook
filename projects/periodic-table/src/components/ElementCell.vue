<script setup lang="ts">
defineProps<{
  atomicNumber?: number
}>()
</script>

<template>
  <div
    class="box-border size-(--cell-size) border border-solid border-black bg-white"
    aria-hidden="true"
  />
</template>
