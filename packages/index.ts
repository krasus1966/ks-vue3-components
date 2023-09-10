import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseDate from './chooseDate'
import chooseTime from './chooseTime'
import notification from './notification'
import kList from './list'
import trend from './trend'
import table from './table'
import kMenu from './menu'
import progress from './progress'
import calendar from './calendar'
import form from './form'
import svgIcon from './svgIcon'
import wangEditor from './wang-editor'
import container from './container'
import preview from './preview'
import './styles/base.scss'
import './styles/ui.scss'
import { App } from 'vue'

const components = [
  chooseArea,
  chooseIcon,
  chooseDate,
  chooseTime,
  trend,
  notification,
  kList,
  kMenu,
  progress,
  calendar,
  table,
  svgIcon,
  form,
  container,
  preview,
  wangEditor
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
  trend,
  notification,
  kList,
  kMenu,
  table,
  progress,
  calendar,
  svgIcon,
  form,
  container,
  preview,
  wangEditor
}

export default {
  install
}
