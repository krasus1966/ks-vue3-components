<template>
    <div style="display: flex">
        <div style="margin-right: 20px">
            <el-time-select
                    v-model="startTime"
                    :start="startTimeStart"
                    :step="startStep"
                    :end="startTimeEnd"
                    :placeholder="startPlaceholder"
                    v-bind="$attrs.startOptions"
            />
        </div>
        <div>
            <el-time-select
                    v-model="endTime"
                    :min-time="startTime"
                    :start="endTimeStart"
                    :step="endStep"
                    :end="endTimeEnd"
                    :placeholder="endPlaceholder"
                    :disabled="endTimeDisable"
                    v-bind="$attrs.endOptions"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue'

const props = defineProps({
  // 开始时间的占位符
  startPlaceholder: {
    type: String,
    default: '请选择开始时间'
  },
  // 开始时间的初始化选择
  startTimeStart: {
    type: String,
    default: '00:00'
  },
  // 开始时间的步进
  startStep: {
    type: String,
    default: '00:15'
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: '23:45'
  },
  // 结束时间的占位符
  endPlaceholder: {
    type: String,
    default: '请选择结束时间'
  },
  // 结束时间的初始化选择
  endTimeStart: {
    type: String,
    default: '00:00'
  },
  // 结束时间的步进
  endStep: {
    type: String,
    default: '00:15'
  },
  // 结束时间的结束选择
  endTimeEnd: {
    type: String,
    default: '23:45'
  }
})
const startTime = ref<string>()
const endTime = ref<string>()
// 是否禁用结束时间
const endTimeDisable = ref<boolean>(true)

const emits = defineEmits(['startChange', 'endChange'])

// 监听开始时间的变化
watch(() => startTime.value, val => {
  if (val === '') {
    endTime.value = ''
    endTimeDisable.value = true
  } else {
    endTimeDisable.value = false
    // 给父组件分发事件
    emits('startChange', val)
  }
})

// 监听结束时间的变化
watch(() => endTime.value, val => {
  if (val !== '') {
    // 给父组件分发事件
    emits('endChange', {
      startTime: startTime.value,
      endTime: val
    })
  }
})
</script>

<style lang="scss" scoped>
.example-basic .el-date-editor {
  margin: 8px;
}
</style>
