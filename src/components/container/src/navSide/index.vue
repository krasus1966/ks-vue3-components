<template>
  <ks-menu :collapse="collapse" :data="data" :router="true" :defaultActive="$route.path"/>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { MenuItem } from '../../../menu/src/type'

defineProps<{
  collapse: boolean,
  data: MenuItem[]
}>()

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
svg {
  width: 1em;
  height: 1em;
}
</style>
