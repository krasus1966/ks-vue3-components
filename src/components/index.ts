import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import notification from './notification'
import kList from './list'
import trend from './trend'
import kMenu from './menu'
import progress from './progress'
import calendar from './calendar'
import { App } from 'vue'

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  kList,
  kMenu,
  progress,
  calendar
]

export default {
  install (app:App) {
    components.map(item => {
      app.use(item)
    })
  }
}
