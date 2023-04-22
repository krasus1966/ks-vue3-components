<template>
  日期选择器
  <ks-choose-date
    @startChange="dateStartChange"
    @endChange="dateEndChange"
  />
  时间选择器
    <ks-choose-time
            @startChange="startChange"
            @endChange="endChange"
            :startOptions="startOptions"
            :endOptions="endOptions"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface TimeEndValue {
  startTime: string,
  endTime: string,
}

interface DateEndValue {
  startTime: Date,
  endTime: Date,
}

const startChange = (val: string) => {
  console.log(val)
}
const endChange = (val: TimeEndValue) => {
  console.log(val)
}
const dateStartChange = (val: Date) => {
  console.log(val)
}
const dateEndChange = (val: DateEndValue) => {
  console.log(val)
}
const startOptions = {
  size: 'mini'
}
const endOptions = {
  size: 'mini'
}
</script>

<style lang="scss" scoped>

</style>
