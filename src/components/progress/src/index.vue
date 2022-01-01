<template>
  <el-progress v-bind="$attrs" :percentage="percentageNum"></el-progress>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  // 进度
  percentage: {
    type: Number,
    default: 0
  },
  // 进度条是否有动画效果
  isAnimation: {
    type: Boolean,
    default: false
  },
  // 动画时长(毫秒)
  time: {
    type: Number,
    default: 3000
  }
})

const percentageNum = ref(0)

onMounted(() => {
  if (props.isAnimation) {
    // 规定时间内加载完成
    const time = Math.ceil(props.time / props.percentage)
    const timer = setInterval(() => {
      percentageNum.value += 1
      if (percentageNum.value >= props.percentage) {
        percentageNum.value = props.percentage
        clearInterval(timer)
      }
    }, time)
  } else {
    percentageNum.value = props.percentage
  }
})
</script>

<style lang="scss" scoped>

</style>
