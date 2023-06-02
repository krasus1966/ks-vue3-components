import {PropType} from "vue";

export interface TableOptions {
  // 表头名称
  label: string,
  // 字段
  prop?: string,
  // 类型，可以设置单选/多选
  type?: string,
  // 开启单行显示
  showOverflowTooltip?: boolean,
  // 宽度
  width?: string | number,
  // 对齐方式
  align?: 'left' | 'center' | 'right',
  // 单元格插槽
  slot?: string,
  headerSlot?: string,
  // 多级表头
  children?: TableOptions[],
  // 额外配置 可以传入el-table-column的属性
  extra?: object,
  // 额外函数配置 可以传入el-table-column的函数
  extraAction?: object
}
