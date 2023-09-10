import { App } from 'vue'
import menu from './src/index.vue'
import infiniteMenu from './src/menu'

// 让这个组件可以通过use的形式使用
export default {
  install (app:App) {
    app.component('ks-menu', menu)
    .component('ks-infinite-menu', infiniteMenu)
  }
}
