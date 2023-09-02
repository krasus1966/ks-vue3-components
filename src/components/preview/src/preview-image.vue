<template>
  <el-image :src="url" fit="fill"/>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps<{
  url: string
}>()

</script>

<style scoped lang="scss">

</style>
