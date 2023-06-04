import {PropType} from "vue";

export interface TableOptions {
  // 是否展示 true则在列表和筛选列表均不显示 对多级表头无效
  disabled: boolean
  // 是否默认显示，true则在列表显示，false可以在筛选列表勾选成true，对操作列无效 对多级表头无效
  isShow: boolean
  // 唯一标识
  id: string
  // 表头名称
  label: string
  // 字段
  prop?: string
  // 类型，可以设置单选/多选
  type?: string
  // 开启单行显示
  showOverflowTooltip?: boolean
  // 宽度
  width?: string | number
  // 最小宽度，会平分，不是真的最小
  minWidth?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 单元格插槽
  slot?: string
  headerSlot?: string
  // 多级表头
  children?: TableOptions[],
  // 额外配置 可以传入el-table-column的属性
  extra?: object
  // 额外函数配置 可以传入el-table-column的函数
  extraAction?: object
}
