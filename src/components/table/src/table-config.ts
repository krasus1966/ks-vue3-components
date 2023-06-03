export interface TableConfig {
  appendSlot?:string,
  emptySlot?:string,
  // 额外函数配置 可以传入el-table-column的函数
  extraAction?: Function[]
}
