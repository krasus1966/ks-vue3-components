<template>
  <div
    v-if="source === 'network'"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <el-icon v-else-if="source === 'element'" :class="className" :style="iconStyle">
    <component :is="iconName" :style="iconStyle"/>
  </el-icon>
  <svg
    v-else-if="source === 'self'"
    :class="className"
    class="svg-icon"
    aria-hidden="true"
  >
    <use :href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { defineProps, computed, withDefaults } from 'vue'
import { toLine } from '../../../util'

const props = withDefaults(defineProps<{
  icon: string,
  className?: string,
  iconStyle?: string,
  source?: 'network' | 'element'| 'self'
}>(), {
  iconStyle: 'width: 1em;height: 1em',
  source: 'element'
})
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => {
  if (props.source === 'network') {
    return {
      mask: `url(${props.icon}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
    }
  }
  return {}
})
/**
 * 内部图标
 */
const iconName = computed(() => {
  if (props.source === 'element') {
    return `el-icon-${toLine(props.icon)}`
  } else {
    return `#icon-${props.icon}`
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  //width: 1em;
  //height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
