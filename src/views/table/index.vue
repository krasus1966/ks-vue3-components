<template>
  <ks-table
      ref="singleTableRef"
      :data="tableData2"
      :options="options2"
      :action-option="actionOption"
      :tableConfig="tableConfig"
      :load="loadConfig"
      :loading="loading"
  >

    <!--
        自定义插槽 参数：scope(作为表头插槽时：column, $index, 作为单元格插槽时：row, column, $index), prop, label，
        需要注意，表头插槽乱改可能会导致页面崩溃
    -->
    <template #header="{scope,label,prop}">
      <el-input v-model="search" size="small" placeholder="Type to search"/>
    </template>

    <template #date="{scope,label,prop}">
      <span>{{ dateformat(scope, label, prop) }}</span>
    </template>

    <!--  以下为固定插槽，自定义表头和单元格插槽命名就不能是下边这几个了  -->
    <!--  action 为操作列插槽  -->
    <template #action="{scope}">
      <el-button type="primary" @click="edit(scope)">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </template>
    <!--  append 为表格最后一列插槽 官网说无限滚动组件可能用到这个插槽  -->
    <template #append>
      <div style="margin-top: 20px">
        <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
        <el-button @click="setCurrent()">Clear selection</el-button>
      </div>
    </template>
    <!--  无数据时插槽  -->
    <template #empty>
      <div style="align-items: center;justify-content: center">
        暂无数据
      </div>
    </template>
  </ks-table>
</template>

<script lang="ts" setup>

import {computed, provide, ref} from "vue";
import {ElTable} from "element-plus";

// 计算加载框是否显示
const loading = computed(() => {
  return !tableData2.value
})
const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data: { name: string; }) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
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
  stripe: true,
  border: true,
  height: '100%',
  maxHeight: '100%',
  highlightCurrentRow: true,
  currentChange: (currentRow: any, oldCurrentRow: any) => handleCurrentChange(currentRow, oldCurrentRow),
  rowStyle: ({row, rowIndex}: { row: any, rowIndex: number }) => tableRowStyle({row, rowIndex})
}
// 加载框配置
const loadConfig = {
  fullscreen: true,
  text: '加载中...',
}

const currentRow = ref()
const singleTableRef = ref()

const setCurrent = (row?: object) => {
  console.log('row', row)
  console.log('singleTableRef', singleTableRef.value)
  singleTableRef.value.tableRef.setCurrentRow(row)
}
const handleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
  currentRow.value = currentRow
}
const options2 = [
  {
    align: 'center',
    type: 'index',
    label: '序号',
    width: 200,
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    width: 200,
    headerSlot: 'header',
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    width: 200,
    extra: {
      // fixed: true,
      sortable: true,
    }
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center',
    extra: {
      // fixed: true,
      minWidth: 200,
      // sortable: true,
    }
  }
]
const options = [
  {
    align: 'center',
    label: '序号',
    type: 'index',
    extra: {
      fixed: true,
      width: 200,
      sortable: true
    }
  },
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    extra: {
      fixed: true,
      width: 200,
      sortable: true,
    }
  }, {
    label: '姓名',
    prop: 'name',
    align: 'center',
    headerSlot: 'date',
    children: [
      {
        label: '地址',
        prop: 'address',
        align: 'center',
        headerSlot: 'header',
        children: [
          {
            label: '头像',
            prop: 'address',
            align: 'center',
            headerSlot: 'header',
            children: [
              {
                label: '头像',
                prop: 'address',
                width: 200,
                align: 'center',
                headerSlot: 'header',
              },
              {
                label: '日期',
                prop: 'date',
                align: 'center',
                headerSlot: 'header',
                extra: {
                  width: 200,
                  sortable: true,
                }
              }
            ]
          },
          {
            label: '头像',
            prop: 'address',
            width: 200,
            align: 'center'
          }
        ]
      },
      {
        label: '头像',
        prop: 'address',
        align: 'center'
      }
    ]
  }, {
    label: '地址',
    prop: 'address',
    width: 300,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    minWidth: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }, {
    label: '地址',
    prop: 'address',
    width: 200,
    align: 'center'
  }
]
const actionOption = {
  label: '操作',
  align: 'center',
  extra: {
    fixed: 'right',
    width: 200,
    sortable: true,
  }
}
const tableData2 = ref()

setTimeout(() => {
  tableData2.value = tableData
}, 3000)

const tableData: any = [
  {
    date: '2016-05-03',
    name: 'Text',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

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
