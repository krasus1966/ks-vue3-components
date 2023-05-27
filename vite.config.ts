import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 8090,
    proxy: {
      '/resource': {
        // 配置接口调用目标地址
        target: 'http://127.0.0.1:8002/',
        // 当进行代理时，Host 的源默认会保留（即Host是浏览器发过来的host），如果将changeOrigin设置为true，则host会变成target的值。
        changeOrigin: true,
        // 前缀 /api 是否被替换为特定目标，不过大多数后端给到的接口都是以/api打头，这个没有完全固定的答案，根据自己的业务需求进行调整
        rewrite: path => path.replace(/^\/resource/, '/')
      }
    }
  },
  base: '/ks-components-page/'
})
