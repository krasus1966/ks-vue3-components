import { App } from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseDate from './chooseDate'
import chooseTime from './chooseTime'
import chooseCity from './chooseCity'
import notification from './notification'
import kList from './list'
import trend from './trend'
import table from './table'
import kMenu from './menu'
import preview from './preview'
import progress from './progress'
import calendar from './calendar'
import form from './form'
import container from './container'
import svgIcon from './svgIcon'
import process from './bpmn'
import wangEditor from './wang-editor'
import onlyOffice from './onlyOffice'

import '../styles/base.scss'
import '../styles/ui.scss'

const components = [
  chooseArea,
  chooseIcon,
  chooseDate,
  chooseTime,
  chooseCity,
  trend,
  notification,
  kList,
  kMenu,
  preview,
  progress,
  calendar,
  table,
  svgIcon,
  container,
  process,
  form,
  wangEditor,
  onlyOffice
]

const install = (app:App) => {
  components.map(item => {
    app.use(item)
  })
}

export {
  install,
  chooseArea,
  chooseIcon,
  chooseDate,
  chooseTime,
  chooseCity,
  trend,
  notification,
  kList,
  kMenu,
  table,
  preview,
  progress,
  calendar,
  svgIcon,
  container,
  process,
  form,
  wangEditor,
  onlyOffice
}

export default {
  install
}
