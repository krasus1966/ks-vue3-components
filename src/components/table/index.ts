import table from './src/index.vue'
import tablePage from './src/table-page.vue'
import { App } from 'vue'

// 让这个组件可以通过use的形式使用
export default {
  install (app:App) {
    app.component('ks-table', table)
    app.component('ks-table-page', tablePage)
  }
}
