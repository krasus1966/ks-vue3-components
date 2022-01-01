<template>
  <ks-calendar
      :events="events"
      @dateClick="dateClick"
      @eventClick="eventClick"
      :displayEventEnd="true"
      :eventContent="eventContent"
  >

  </ks-calendar>
</template>

<script lang="ts" setup>
import { EventItem } from '../../components/calendar/src/types'
import { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import { ref } from 'vue'

const events = ref<EventItem[]>([
  {
    title: '北汽清理积分',
    start: '2021-12-31 23:50:50',
    end: '2021-12-31 23:59:59',
    editable: true
  },
  {
    title: '写代码',
    start: '2022-01-01 23:50:50',
    end: '2022-01-01 23:59:59',
    editable: true
  }
]
)

const dateClick = (info: DateClickArg) => {
  events.value.push({
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
    title: '学习'
  })
}
const eventClick = (info: EventClickArg) => {
  events.value.push({
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
    title: '学习'
  })
}

const eventContent = (arg:EventContentArg) => {
  const el = document.createElement('div')
  const timeTextArr = arg.timeText.split('-')
  const start = timeTextArr[0]
    .replace('上午', '')
    .replace('下午', '')
    .replace('时', '')
  const end = timeTextArr[1]
    .replace('上午', '')
    .replace('下午', '')
    .replace('时', '')
  el.innerHTML = `
          <div>开始时间: ${start}</div>
          <div>结束时间: ${end}</div>
          <div>标题: ${arg.event._def.title}</div>
        `
  return {
    domNodes: [el]
  }
}
</script>

<style lang="scss" scoped>

</style>
