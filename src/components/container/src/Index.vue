<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="collapse" :data="data"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="collapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, ref, watch} from 'vue'
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'
import { MenuItem } from '../../menu/src/type'

const props = defineProps<{
  isCollapse: boolean,
  data: MenuItem[]
}>()

const collapse = ref(props.isCollapse)

const emits = defineEmits(['update:isCollapse'])

watch(()=> collapse,(val)=>{
  // 需要修改父组件数据
  emits('update:isCollapse', collapse)
})
//
// const data = [
//   {
//     name: '首页',
//     index: '/',
//     icon: 'HomeFilled'
//   }, {
//     name: '图标选择器',
//     index: '/chooseIcon',
//     icon: 'Check'
//   }, {
//     name: '省市区选择',
//     index: '/chooseArea',
//     icon: 'Location'
//   }, {
//     name: '趋势标记',
//     index: '/trend',
//     icon: 'Sort'
//   }, {
//     name: '时间选择',
//     index: '/chooseTime',
//     icon: 'Timer'
//   }, {
//     name: '通知菜单',
//     index: '/notification',
//     icon: 'Bell'
//   }, {
//     name: '导航菜单',
//     index: '/menu',
//     icon: 'Menu'
//   }, {
//     name: '城市选择',
//     index: '/chooseCity',
//     icon: 'Guide'
//   }, {
//     name: '进度条',
//     index: '/progress',
//     icon: 'DArrowRight'
//   }, {
//     name: '日历',
//     index: '/calendar',
//     icon: 'ScaleToOriginal'
//   }, {
//     name: '表单',
//     index: '/form',
//     icon: 'Setting'
//   }, {
//     name: '表格',
//     index: '/table',
//     icon: 'ShoppingBag'
//   }, {
//     name: '文件预览',
//     index: '/preview',
//     icon: 'ShoppingBag'
//   }
// ]
</script>

<style lang="scss" scoped>
.el-aside {
  display: flex;
}

.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
svg {
  width: 1em;
  height: 1em;
}
</style>
