import { App } from 'vue'
import preview from './src/index.vue'
import previewPdfEmbed from './src/preview-pdf-embed.vue'
import previewPdfJs from './src/preview-pdf-js.vue'
import previewTxt from './src/preview-txt.vue'
import previewImage from './src/preview-image.vue'
import previewHtml from './src/preview-html.vue'
import previewDialog from './src/index-dialog.vue'

// 让这个组件可以通过use的形式使用
export default {
  install (app:App) {
    app.component('ks-preview', preview)
    .component('ks-preview-pdf-embed', previewPdfEmbed)
    .component('ks-preview-pdf', previewPdfJs)
    .component('ks-preview-txt', previewTxt)
    .component('ks-preview-html', previewHtml)
    .component('ks-preview-image', previewImage)
    .component('ks-preview-dialog', previewDialog)
  }
}
