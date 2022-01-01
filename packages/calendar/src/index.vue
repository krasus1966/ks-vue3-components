<template>
  <div id="calendar">

  </div>
</template>

<script lang="ts" setup>
import '@fullcalendar/core/vdom'
import { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction, { DateClickArg } from '@fullcalendar/interaction'
import { defineEmits, defineProps, onMounted, PropType, ref, watch } from 'vue'
import { EventItem } from './types'

const calendar = ref<Calendar>()

// 分发事件
const emits = defineEmits(['dateClick', 'eventClick'])

// 渲染日历的方法
const props = defineProps({
  // 语言
  local: {
    type: String,
    default: 'zh-cn'
  },
  initalView: {
    type: String,
    default: 'dayGridMonth'
  },
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月'
      }
    }
  },
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  footerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => []
  },
  // 日历显示结束时间
  displayEventEnd: {
    type: Boolean,
    default: false
  },
  // 自定义渲染日历内容
  eventContent: {
    type: Function
  }
})

const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initalView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          events (e, callback) {
            if (props.events?.length) {
              callback(props.events)
            } else {
              callback([])
            }
          }
        }
      ],
      // 点击日历某一天
      dateClick (info: DateClickArg) {
        emits('dateClick', info)
      },
      eventClick (info: EventClickArg) {
        emits('eventClick', info)
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent
    })
    calendar.value.render()
  }
}
onMounted(() => {
  renderCalendar()
})

// 监听父组件传递的事件源
watch(() => props.events, () => {
  renderCalendar()
}, { deep: true })
</script>

<style lang="scss" scoped>

</style>
