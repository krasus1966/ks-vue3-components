<template>
  <div class="header">
    <span @click="toggle">
      <ks-svg-icon icon="expand" v-if="collapse" style="margin-right: 10px;"/>
      <ks-svg-icon icon="fold" v-else/>
<!--      <el-icon-expand v-if="collapse" style="margin-right: 10px;"/>-->
<!--      <el-icon-fold v-else/>-->
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
  collapse: boolean
}>()
const emits = defineEmits(['update:collapse'])

const toggle = () => {
  // 需要修改父组件数据
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
svg {
  width: 1em;
  height: 1em;
}
</style>
