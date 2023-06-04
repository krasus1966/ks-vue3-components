<template>
<!--  <ks-table-->
<!--      ref="singleTableRef"-->
<!--      :data="tableData"-->
<!--      :options="options"-->
<!--      :action-option="actionOption"-->
<!--      :tableConfig="tableConfig"-->
<!--      :pageConfig="pageConfig"-->
<!--      :load="loadConfig"-->
<!--  >-->
<!--    &lt;!&ndash;-->
<!--        自定义插槽 参数：scope(作为表头插槽时：column, $index, 作为单元格插槽时：row, column, $index), prop, label，-->
<!--        需要注意，表头插槽乱改可能会导致页面崩溃-->
<!--    &ndash;&gt;-->
<!--    <template #header="{scope,label,prop}">-->
<!--    </template>-->

<!--    <template #date="{scope,label,prop}">-->
<!--    </template>-->

<!--    &lt;!&ndash;  以下为固定插槽，自定义表头和单元格插槽命名就不能是下边这几个了  &ndash;&gt;-->
<!--    &lt;!&ndash;  action 为操作列插槽  &ndash;&gt;-->
<!--    <template #action="{scope}">-->
<!--      <el-button type="primary" @click="edit(scope)">编辑</el-button>-->
<!--      <el-button type="danger">删除</el-button>-->
<!--    </template>-->
<!--    &lt;!&ndash;  append 为表格最后一列插槽 官网说无限滚动组件可能用到这个插槽  &ndash;&gt;-->
<!--    <template #append>-->
<!--&lt;!&ndash;      <div style="margin-top: 20px">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button @click="setCurrent(tableData[1])">Select second row</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button @click="setCurrent()">Clear selection</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </template>-->
<!--    &lt;!&ndash;  无数据时插槽  &ndash;&gt;-->
<!--    <template #empty>-->
<!--      <div style="align-items: center;justify-content: center">-->
<!--        暂无数据-->
<!--      </div>-->
<!--    </template>-->
<!--  </ks-table>-->



  <ks-table-page
      ref="singleTableRef"
      :data="tableData"
      :options="options"
      :action-option="actionOption"
      :tableConfig="tableConfig"
      :pageConfig="pageConfig"
      :load="loadConfig"
      :searchConfig="searchOption"
      :actionConfig="actionConfig"
  >
    <!--
        自定义插槽 参数：scope(作为表头插槽时：column, $index, 作为单元格插槽时：row, column, $index), prop, label，
        需要注意，表头插槽乱改可能会导致页面崩溃
    -->
    <template #header="{scope,label,prop}">
    </template>

    <template #date="{scope,label,prop}">
    </template>

    <!--  以下为固定插槽，自定义表头和单元格插槽命名就不能是下边这几个了  -->
    <!--  action 为操作列插槽  -->
    <template #action="{scope}">
      <el-button type="primary" @click="edit(scope)">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </template>
    <!--  append 为表格最后一列插槽 官网说无限滚动组件可能用到这个插槽  -->
    <template #append>
<!--      <div style="margin-top: 20px">-->
<!--        <el-button @click="setCurrent(tableData[1])">Select second row</el-button>-->
<!--        <el-button @click="setCurrent()">Clear selection</el-button>-->
<!--      </div>-->
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

import {computed, onMounted, provide, reactive, ref} from "vue";
import {ElTable} from "element-plus";
import {LoadConfig} from "../../components/table/src/type/load";
import {PageConfig} from "../../components/table/src/type/pagination";
import axios from "axios";
import {SearchOption} from "../../components/table/src/type/search-config";
import {TableOptions} from "../../components/table/src/type/types";
const tableData = ref<any[]>([])
const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const singleTableRef = ref()
const loading = ref<boolean>(false)

onMounted(()=>{
  getData()
})

const getData = ()=>{
  loading.value = true
  axios.post('/api/list',{
    current: currentPage.value - 1,
    pageSize: pageSize.value
  }).then((res:any)=>{
    console.log('res',res.data.data)
    tableData.value = res.data.data.rows
    total.value = res.data.data.total
    loading.value = false
  })
}

const edit = (scope: any) => {
  console.log("scope", scope)
}
const dateformat = (scope: any, label: string, prop: string) => {
  if (scope.row) {
    if (scope.$index === 0) {
      return scope.row[prop] + " 00:00:00"
    }
    return scope.row[prop]
  }
  return label
}
// 表格配置
const tableConfig = {
  key: 2,
  stripe: true,
  border: true,
  highlightCurrentRow: true,
  tableLayout: 'auto',
  maxHeight: '73.5vh',
  currentChange: (currentRow: any, oldCurrentRow: any) => handleCurrentChange(currentRow, oldCurrentRow),
  rowStyle: ({row, rowIndex}: { row: any, rowIndex: number }) => tableRowStyle({row, rowIndex})
}
// 分页配置
const pageConfig : PageConfig = {
  disabled: false,
  position: 'right',
  layout: 'total,sizes,prev,pager,next,jumper',
  total: total,
  currentPage:currentPage,
  pageSize: pageSize,
  pageSizes: [1,10, 20, 30, 40, 50, 100],
  actions: {
    sizeChange: (value: number) => {
      console.log('sizeChange',value)
      currentPage.value = 1
      pageSize.value = value
      getData()
    },
    currentChange: (value: number) => {
      console.log('currentChange',value)
      currentPage.value = value
      getData()
    },
    prevClick: (value: number) => {
      console.log('prevClick',value)
    },
    nextClick: (value: number) => {
      console.log('nextClick',value)
    },
  }
}
// 搜索框设置
const searchOption : SearchOption = {
  isSearch: true,
  form: {
    name: ''
  },
  options: [
    {
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    }
  ],
  moreOptions: [
    {
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },{
      label: '姓名',
      prop: 'name',
      type: 'input',
      placeholder: '请输入姓名'
    },
  ],
  action: {
    submit: (form:object)=> {
      console.log('submit search',form)
    },
    reset: (form:object)=> {
      console.log('reset search',form)
    }
  }
}
// action条 搜索框下边的操作栏
const actionConfig = {
  showActions: false
}
// 加载框配置
const loadConfig  = {
  isLoad: loading,
  lock: true,
  fullscreen: true,
  text: '加载中...'
}
const handleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
  // currentRow.value = currentRow
}
const options : TableOptions[] = [
  {
    disabled: false,
    isShow: true,
    align: 'center',
    id: 'index',
    label: '姓名',
    prop: 'name',
    width: 75,
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    align: 'center',
    id: 'index2',
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
    label: '姓名',
    id: 'name',
    prop: 'name',
    align: 'center',
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    id: 'date',
    label: '日期',
    prop: 'date',
    align: 'center',
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: false,
    id: 'address',
    label: '地址',
    prop: 'address',
    align: 'center',
    extra: {
      // fixed: true,
      // sortable: true,
      showOverflowTooltip: true
    }
  }
]
const actionOption:TableOptions = {
  disabled: false,
  isShow: true,
  id: 'action',
  label: '操作',
  align: 'center',
  extra: {
    fixed: 'right',
    width: 200,
    sortable: true,
  }
}

const tableRowStyle = ({
                         row,
                         rowIndex,
                       }: {
  row: object
  rowIndex: number
}): object => {
  if (rowIndex === 1) {
    return {
      "color": "red"
    }
  } else if (rowIndex === 3) {
    return {
      "color": "blue"
    }
  }
  return {
    "color": "green"
  }
}
</script>

<style lang="scss" scoped>

</style>
