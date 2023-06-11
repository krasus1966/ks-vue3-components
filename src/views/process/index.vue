<template>
  <ks-table-page
      ref="tableRef"
      :data="tableData"
      :options="tableOptions"
      :action-option="actionOption"
      :tableConfig="tableConfig"
      :pageConfig="pageConfig"
      :load="loadConfig"
      :search-option="searchOption"
      :operator-config="operatorConfig"

  >
    <template #action="{scope}">
      <el-button type="primary" @click="toProcessDesignPage">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </template>
    <!--    -->
    <template #operator>
      <el-button type="primary" @click="toProcessDesignPage">新增</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="danger">批量删除</el-button>
    </template>
    <!--  无数据时插槽  -->
    <template #empty>
      <div style="align-items: center;justify-content: center">
        暂无数据
      </div>
    </template>
  </ks-table-page>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {TableOptions} from "../../components/table/src/type/types";
import {PageConfig} from "../../components/table/src/type/pagination";
import axios from "axios";
import {SearchOption} from "../../components/table/src/type/search-config";
import router from "../../router";

const tableData = ref<any[]>([])
const tableRef = ref()
const loading = ref<boolean>(false)
const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const tableConfig = {
  key: 2,
  stripe: true,
  border: true,
  highlightCurrentRow: true,
  tableLayout: 'auto',
  maxHeight: '73.5vh'
}
// 分页配置
const pageConfig: PageConfig = {
  disabled: false,
  position: 'right',
  layout: 'total,sizes,prev,pager,next,jumper',
  total: total,
  currentPage: currentPage,
  pageSize: pageSize,
  pageSizes: [1, 10, 20, 30, 40, 50, 100],
  actions: {
    sizeChange: (value: number) => {
      console.log('sizeChange', value)
      currentPage.value = 1
      pageSize.value = value
      getData()
    },
    currentChange: (value: number) => {
      currentPage.value = value
      getData()
    },
    prevClick: (value: number) => {

    },
    nextClick: (value: number) => {

    },
  }
}
// action条 搜索框下边的操作栏
const operatorConfig = {
  showActions: true
}
// 操作列配置
const actionOption : TableOptions = {
  disabled: false,
  isShow: true,
  disableDraggable: true,
  id: 'action',
  label: '操作',
  align: 'center',
  extra: {
    fixed: 'right',
    width: 200
  }
}
// 加载框配置
const loadConfig = {
  isLoad: loading,
  lock: true,
  fullscreen: true,
  text: '加载中...'
}
const tableOptions: TableOptions[] = [
  {
    disabled: false,
    isShow: true,
    disableDraggable: true,
    align: 'center',
    id: 'checkbox',
    type: 'selection',
    width: 75,
    label: '',
    extra: {
      fixed: true,
    },
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    align: 'center',
    id: 'index',
    type: 'index',
    label: '序号',
    width: 75,
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    label: '姓名',
    id: 'name',
    prop: 'name',
    width: 300,
    align: 'center',
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    id: 'date',
    label: '日期',
    prop: 'date',
    width: 300,
    align: 'center',
    extra: {
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    id: 'address',
    label: '地址',
    prop: 'address',
    width: 300,
    align: 'center',
    extra: {
      showOverflowTooltip: true
    },
  }
]
// 搜索框设置
const searchOption: SearchOption = {
  isSearch: false
}
const getData = (form?: object) => {
  loading.value = true
  let data = {
    current: currentPage.value - 1,
    pageSize: pageSize.value
  }
  if (form) {
    for (var i in form) {
      data[i] = form[i]
    }
  }
  axios.post('/api/list', data).then((res: any) => {
    tableData.value = res.data.data.rows
    total.value = res.data.data.total
    loading.value = false
  })
}

const toProcessDesignPage = ()=> {
  router.push('design')
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>

</style>
