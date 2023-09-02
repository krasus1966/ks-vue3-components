<template>
  <el-scrollbar height="80vh">
    <template v-for="(item,index) in fileUrl">
      <component :is="`ks-preview-${fileType}`" :url="item"></component>
    </template>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch} from 'vue'

const props = defineProps<{
  type: 'pdf-embed' | 'pdf-js' | 'txt',
  urls: string[],
}>()
const fileType = ref(props.type)
const fileUrl = ref(props.urls)

watch(() => props.type, (value) => {
  fileType.value = value
})

watch(() => props.urls, (value) => {
  fileUrl.value = value
})

</script>

<style lang="scss" scoped>

</style>
