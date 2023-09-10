const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
const fs = require('fs')

// 打包入口文件夹
// const entryDir = path.resolve(__dirname, '../components')
const entryDir = path.resolve(__dirname, '../packages')
// 出口文件夹
const outputDir = path.resolve(__dirname, '../lib')

// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// rollup配置
const rollupOptions = {
  external: ['vue', 'vue-router','vuedraggable','vue-pdf-embed'],
  output: {
    globals: {
      vue: 'Vue',
      vuedraggable: 'vuedraggable',
      'vue-pdf-embed': 'vue-pdf-embed',
    }
  }
}

// 全量打包
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  })
}

// 单组件打包
// name:组件名称
// const buildSingle = async (name) => {
//   await build(defineConfig({
//     ...baseConfig,
//     build: {
//       rollupOptions,
//       lib: {
//         entry: path.resolve(entryDir + `/${name}/index.ts`),
//         name: 'index',
//         fileName: 'index',
//         formats: ['es', 'umd']
//       },
//       outDir: path.resolve(outputDir, name)
//     }
//   }))
// }

// 每个组件生成package.json
const createPackageJson = (name) => {
  const fileStr = `
  {
    "name":"${name}",
    "version": "0.0.0",
    "main":"index.umd.js",
    "module":"index.es.js",
    "style":"style.css"
  }
  `
  fsExtra.outputFile(
    path.resolve(outputDir, `/${name}/package.json`),
    fileStr,
    'utf-8'
  )
}

// 打包成库
const buildLib = async () => {
  await buildAll()
  // 获取组件名称组成的数组
  // const components = fs.readdirSync(entryDir).filter(name => {
  //   const componentDir = path.resolve(entryDir, name)
  //   const isDir = fs.lstatSync(componentDir).isDirectory()
  //   return isDir && fs.readdirSync(componentDir).includes('index.ts') && name !== 'util'
  // })

  // for (const name of components) {
  //   await buildSingle(name)
  //   createPackageJson(name)
  // }
}

buildLib()
