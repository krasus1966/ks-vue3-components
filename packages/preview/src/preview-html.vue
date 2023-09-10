<template>
  <div class="html" v-html="content">

  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const content = ref('')

async function getFile() {
  const res = await fetch(props.url);
  content.value = await res.text();
  console.log('文件内容:' + content.value)
}

onMounted(() => {
  getFile()
})
</script>

<style scoped lang="scss">
pre {
  white-space: pre-wrap;
}
</style>
