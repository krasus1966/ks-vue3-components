<template>
    <component :is="`ks-preview-${type}`" :url="url"></component>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  type: {
    type: 'pdf-embed' | 'pdf-js' | 'txt',
    required: true
  },
  url: {
    type: string,
    required: true
  }
}>()

</script>

<style lang="scss" scoped>

</style>
