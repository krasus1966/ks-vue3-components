<template>
    <component :is="`ks-preview-${type}`" :url="url"></component>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const url = ref('/resource/file/download/6457604d77862e60b032af19')

const type = ref('pdf-js')
</script>

<style lang="scss" scoped>

</style>
