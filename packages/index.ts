import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseDate from './chooseDate'
import chooseTime from './chooseTime'
import chooseCity from './chooseCity'
import notification from './notification'
import kList from './list'
import trend from './trend'
import kMenu from './menu'
import preview from './preview'
import progress from './progress'
import calendar from './calendar'
import layout from './container'
import svgIcon from './svgIcon'
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
  layout,
  svgIcon
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
  progress,
  calendar,
  layout,
  svgIcon
}

export default {
  install
}
