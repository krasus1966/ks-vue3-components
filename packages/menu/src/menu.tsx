import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './type'
import * as Icons from '@element-plus/icons'
import './style/index.scss'

export default defineComponent({
  props: {
    // 导航菜单数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    // 默认选中菜单
    defaultActive: {
      type: String,
      default: ''
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false
    },
    // 菜单名称键名
    name: {
      type: String,
      default: 'name'
    },
    // 菜单标识键名
    index: {
      type: String,
      default: 'index'
    },
    // 菜单图标键名
    icon: {
      type: String,
      default: 'icon'
    },
    // 菜单子菜单键名
    children: {
      type: String,
      default: 'children'
    }
  },
  setup (props, ctx) {
    // 封装一个渲染无限层级菜单的方法
    const renderMenu = (data: any[]) => {
      return data.map((item: any) => {
        // 每个菜单的图标
        // item.i = (Icons as any)[item[props.icon]!]
        const slots = {
          title: () => {
            return <>
              <ks-svg-icon icon={item[props.icon]}/>
              {/*<item.i/>*/}
              <span>{item[props.name]}</span>
            </>
          }
        }
        if (item[props.children] && item[props.children].length) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children])}
            </el-sub-menu>
          )
        }
        return (
          <el-menu-item index={item[props.index]}>
            <ks-svg-icon icon={item[props.icon]}/>
            {/*<item.i/>*/}
            <span>{item[props.name]}</span>
          </el-menu-item>
        )
      })
    }

    return () => {
      return (
        <el-menu
          class="menu-icon-svg"
          default-active={props.defaultActive}
          router={props.router}
          {...useAttrs()}>
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})
