<template>
  <div class="pdf">
    <div class="pdf-view">
      <canvas :id="`pdfCanvas${page}`" v-for="page in state.pdfPages" :key="page"></canvas>
    </div>
    <div class="pdf-bottom"></div>
  </div>
</template>

<script setup lang="ts">
import {reactive, nextTick, onMounted, defineProps, watch} from 'vue'
import * as PDF from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry.js'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})
const state = reactive<any>({
  pdfPath: props.url,
  pdfPages: '', // 页数
  pdfWidth: '', // 宽度
  pdfSrc: '', // 地址
  pdfScale: 1.0 // 放大倍数
})

let pdfDoc: any = ''

// 页面加载时
onMounted(() => {
  initTableData()
})

watch(() => props.url, (value) => {
  state.pdfPath = props.url
  initTableData()
})

// 初始化表格数据
const initTableData = () => {
  PDF.GlobalWorkerOptions.workerSrc = workerSrc
  loadFile(state.pdfPath)
}

// 加载pdf文件
const loadFile = (url: string) => {
  const loadingTask = PDF.getDocument(url)
  loadingTask.promise.then((pdf: any) => {
    pdfDoc = pdf
    state.pdfPages = pdf.numPages
    nextTick(() => {
      renderPage(1) // 表示渲染第 1 页
    })
  })
}

// 渲染指定页面的内容
const renderPage = (num: number) => {
  pdfDoc.getPage(num).then((page: any) => {
    const canvas: any = document.getElementById(`pdfCanvas${num}`)
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1
    const ratio = dpr / bsr
    const viewport = page.getViewport({scale: state.pdfScale})
    canvas.width = viewport.width * ratio
    // canvas.height = viewport.height * ratio
    canvas.height = viewport.height * ratio
    // canvas.style.width = viewport.width + 'px'
    // canvas.style.height = viewport.height + 'px'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    state.pdfWidth = viewport.width + 'px'
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    // 将 PDF 页面渲染到 canvas 上下文中
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    page.render(renderContext)
    if (state.pdfPages > num) {
      renderPage(num + 1)
    }
  })
}
</script>

<style scoped lang="scss">
.pdf {
  .pdf-view {
    width: 100%;
    height: auto;
    margin: 0 auto;
    border: 1px solid #f90;
    overflow: auto;
  }
}
</style>
