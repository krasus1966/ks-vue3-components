import preview from './src/index.vue'
import previewPdfEmbed from './src/preview-pdf-embed.vue'
import previewPdfJs from './src/preview-pdf-js.vue'
import previewTxt from './src/preview-txt.vue'
import { App } from 'vue'

// 让这个组件可以通过use的形式使用
export default {
  install (app:App) {
    app.component('ks-preview', preview)
    app.component('ks-preview-pdf-embed', previewPdfEmbed)
    app.component('ks-preview-pdf-js', previewPdfJs)
    app.component('ks-preview-txt', previewTxt)
  }
}
