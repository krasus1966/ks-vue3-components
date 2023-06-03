import {Ref} from "vue";

export interface PageConfig {
  disabled: boolean
  total: Ref<number>
  currentPage: Ref<number>
  pageSize: Ref<number>
  layout?: string
  pageSizes?: number[]
  direction?: 'row'|'row-reverse'
  actions?:{
    sizeChange?: (value: number) => void
    currentChange?: (value: number) => void
    prevClick?: (value: number) => void
    nextClick?: (value: number) => void
  }
}
