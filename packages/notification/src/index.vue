<template>
  <el-popover
      popper-class="notification-popper-class"
      ref="popover1"
      placement="bottom"
      :width="350"
      trigger="click">
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge :value="value" :max="max" :is-dot="isDot" style="cursor: pointer">
<!--        <component :is="`el-icon-${toLine(icon)}`"></component>-->
        <ks-svg-icon :icon="icon"/>
      </el-badge>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { toLine } from '../../util'

const props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: 'Bell'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  // 最大值
  max: {
    type: Number
  },
  // 是否是小圆点
  isDot: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
