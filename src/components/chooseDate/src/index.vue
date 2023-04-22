<template>
    <div style="display: flex">
        <div style="margin-right: 20px">
            <el-date-picker
                    v-model="startDate"
                    type="date"
                    :placeholder="startPlaceholder"
                    :disabled-date="startDisableDateFunc"
                    v-bind="$attrs.startOptions"
            />
        </div>
        <div>
            <el-date-picker
                    v-model="endDate"
                    type="date"
                    :placeholder="endPlaceholder"
                    :disabled="endDateDisable"
                    :disabled-date="endDisableDateFunc"
                    v-bind="$attrs.endOptions"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
const props = defineProps({
  // 开始日期的占位符
  startPlaceholder: {
    type: String,
    default: '请选择开始日期'
  },
  // 结束日期的占位符
  endPlaceholder: {
    type: String,
    default: '请选择结束日期'
  },
  // 是否禁用选择今天之前的日期
  disableToday: {
    type: Boolean,
    default: true
  },
  // 禁用开始日期函数
  startDisableDate: {
    type: Function,
    default: null
  },
  // 禁用结束日期函数
  endDisableDate: {
    type: Function,
    default: null
  }
})

const startDate = ref<Date | null>()
const endDate = ref<Date | null>()
// 是否禁用结束日期
const endDateDisable = ref<boolean>(true)

const emits = defineEmits(['startChange', 'endChange'])

// 禁用开始日期的函数
const startDisableDateFunc = (time: Date) => {
  if (props.startDisableDate) {
    return props.startDisableDate
  }
  if (props.disableToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
  }
}

// 禁用结束日期的函数
const endDisableDateFunc = (time: Date) => {
  if (props.endDisableDate) {
    return props.endDisableDate
  }
  if (startDate.value) {
    return time.getTime() < startDate.value?.getTime() + 1000 * 60 * 60 * 24
  }
}

// 监听开始时间的变化
watch(() => startDate.value, val => {
  if (!val) {
    endDate.value = null
    endDateDisable.value = true
  } else {
    endDateDisable.value = false
    // 给父组件分发事件
    emits('startChange', val)
  }
})

// 监听结束时间的变化
watch(() => endDate.value, val => {
  if (val) {
    // 给父组件分发事件
    emits('endChange', {
      startTime: startDate.value,
      endTime: val
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
