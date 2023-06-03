<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="collapse" :data="data"></nav-side>
    </el-aside>
    <el-container style="height: calc(100vh - 70px)">
      <el-header>
        <nav-header v-model:collapse="collapse"></nav-header>
      </el-header>
      <el-scrollbar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, ref, watch} from 'vue'
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'
import {MenuItem} from '../../menu/src/type'

const props = defineProps<{
  isCollapse: boolean,
  data: MenuItem[]
}>()

const collapse = ref(props.isCollapse)

const emits = defineEmits(['update:isCollapse'])

watch(() => collapse, (val) => {
  // 需要修改父组件数据
  emits('update:isCollapse', collapse)
})
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
