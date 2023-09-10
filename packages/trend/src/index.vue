<template>
  <div class="trend">
    <div class="text" :style="{ color : textColor}">
      <slot v-if="slots.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <ks-svg-icon
          :icon="upIcon"
          :style="{color: !reverseColor ? upIconColor : '#52c41a' }"
          v-if="type === 'up'"/>
      <ks-svg-icon
          :icon="downIcon"
          :style="{color: !reverseColor ? downIconColor : '#f5222d' }"
          v-else/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, useSlots} from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'up'
  },
  text: {
    type: String,
    default: '文字'
  },
  // 上升趋势图标
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  // 下降趋势图标
  downIcon: {
    type: String,
    default: 'ArrowDown'
  },
  // 上升趋势图标颜色
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  // 下降趋势图标颜色
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  // 上升趋势文字颜色
  upTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
  // 下降趋势文字颜色
  downTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
  // 颜色翻转，只在默认的颜色下生效，如果使用了自定义颜色，这个属性就不会生效
  reverseColor: {
    type: Boolean,
    default: false
  }
})
// 获取插槽内容
const slots = useSlots()

// 文字颜色
const textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})

</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;

  .text {
    font-size: 12px;
    margin-right: 4px;
  }

  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
