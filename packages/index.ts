import { App } from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import notification from './notification'
import kList from './list'
import trend from './trend'
import kMenu from './menu'
import progress from './progress'
import calendar from './calendar'

import './styles/base.scss'
import './styles/ui.scss'
import * as Icons from '@element-plus/icons'
import { toLine } from './util'
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
    for (const i in Icons) {
      // 注册全部组件
      app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
    }
    components.map(item => {
      app.use(item)
    })
  }
}
