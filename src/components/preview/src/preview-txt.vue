<template>
    <div class="pdf">
        <template v-for="item in pageNum" :key="item">
            <canvas :id="`pdf-canvas-${item}`" class="pdf-page" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { defineProps, watchEffect, ref, nextTick, onMounted } from 'vue'
import * as PDF from 'pdfjs-dist'

const props = defineProps({
  // 显示的图标
  url: {
    type: String,
    default: ''
  },
  isMultiPage: {
    type: Boolean,
    default: false
  }
})
const pdfCtx = ref()
const pageNum = ref(0)
onMounted(() => {
  resolvePdf(props.url)
})
watchEffect(() => {

})
const resolvePdf = (url:string) => {
  const loadingTask = PDF.getDocument(url)
  loadingTask.promise.then((pdf) => {
    pdfCtx.value = pdf
    pageNum.value = pdf.numPages
    nextTick(() => {
      renderPdf()
    })
  })
}
const renderPdf = (num = 1) => {
  pdfCtx.value.getPage(num).then((page) => {
    const canvas = document.getElementById(`pdf-canvas-${num}`)
    if (!canvas) {
      console.log('canvas not found')
      return
    }
    const ctx = canvas.getContext('2d')
    const viewport = page.getViewport({ scale: 1 })
    // 画布大小,默认值是width:300px,height:150px
    canvas.height = viewport.height
    canvas.width = viewport.width
    // 画布的dom大小, 设置移动端,宽度设置铺满整个屏幕
    const clientWidth = document.body.clientWidth
    canvas.style.width = clientWidth + 'px'
    // 根据pdf每页的宽高比例设置canvas的高度
    canvas.style.height = clientWidth * (viewport.height / viewport.width) + 'px'
    page.render({
      canvasContext: ctx,
      viewport
    })
    if (num < pageNum.value) {
      renderPdf(num + 1)
    } else {
      // emit('onRendered')
    }
  })
}
</script>

<style scoped lang="scss">

</style>
