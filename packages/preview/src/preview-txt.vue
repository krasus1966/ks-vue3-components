<template>
    <div class="txt">
        <pre class="previewer-content">{{  }}</pre>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  // 显示的图标
  url: {
    type: String,
    default: ''
  }
})

</script>

<style scoped lang="scss">

</style>
