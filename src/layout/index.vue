<template>
  <ks-layout :data="data" v-model:isCollapse="collapse"/>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const collapse = ref(false)

const data = [
  {
    name: '首页',
    index: '/',
    icon: 'HomeFilled'
  }, {
    name: '图标选择器',
    index: '/chooseIcon',
    icon: 'Check'
  }, {
    name: '省市区选择',
    index: '/chooseArea',
    icon: 'Location'
  }, {
    name: '趋势标记',
    index: '/trend',
    icon: 'Sort'
  }, {
    name: '时间选择',
    index: '/chooseTime',
    icon: 'Timer'
  }, {
    name: '通知菜单',
    index: '/notification',
    icon: 'Bell'
  }, {
    name: '导航菜单',
    index: '/menu',
    icon: 'Menu'
  }, {
    name: '城市选择',
    index: '/chooseCity',
    icon: 'Guide'
  }, {
    name: '进度条',
    index: '/progress',
    icon: 'DArrowRight'
  }, {
    name: '日历',
    index: '/calendar',
    icon: 'ScaleToOriginal'
  }, {
    name: '表单',
    index: '/form',
    icon: 'Setting'
  }, {
    name: '表格',
    index: '/table',
    icon: 'ShoppingBag'
  }, {
    name: '文件预览',
    index: '/preview',
    icon: 'ShoppingBag'
  }, {
    name: '流程管理',
    index: '/bpmn',
    icon: 'darrowright'
  }, {
    name: 'only-office',
    index: '/only-office',
    icon: 'darrowright'
  }
]
</script>
<style scoped lang="scss">

</style>
