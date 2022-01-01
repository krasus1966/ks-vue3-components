<template>
  <el-container>
    <el-aside width="auto">
      <nav-side v-model:collapse="collapse"></nav-side>
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
import { ref } from 'vue'
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'

const collapse = ref(false)

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
