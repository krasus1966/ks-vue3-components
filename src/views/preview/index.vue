<template>
  <ks-table-page
      ref="singleTableRef"
      :data="tableData"
      :options="options"
      :action-option="actionOption"
      :tableConfig="tableConfig"
      :pageConfig="pageConfig"
      :load="loadConfig"
      :operatorConfig="operatorConfig"
  >
    <template #action="{scope}">
      <el-button type="primary" @click="edit(scope)">预览</el-button>
    </template>

    <!--  无数据时插槽  -->
    <template #empty>
      <div style="align-items: center;justify-content: center">
        暂无数据
      </div>
    </template>
  </ks-table-page>
  <!--  <el-dialog
        v-model="props.dialogVisible"
        title="预览"
        width="80%"
        align-center
        :before-close="handleClose"
    >
      <template #header="{ close, titleId, titleClass }">
          <template v-for="(item,index) in props.types">
            <el-button type="danger" @click="fetchPreviewUrl(props.fileId,item)">
            {{item}}
            </el-button>
          </template>
      </template>
      <ks-preview :type="props.selectType" :urls="props.urls"></ks-preview>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
        </span>
      </template>
    </el-dialog>-->
  <ks-preview-dialog :types="props.types"
                     :urls="props.urls"
                     :default-type="props.selectType"
                     :dialog-visible="props.dialogVisible"
                     :on-change-preview-type="fetchPreviewUrl"
                     :on-close-dialog="handleClose"
                     :ext="props.fileId"
  ></ks-preview-dialog>
</template>

<script lang="ts" setup>

import {onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import {PageConfig} from "../../components/table/src/type/pagination";
import {SearchOption} from "../../components/table/src/type/search-config";
import {actionOptionConst, searchMoreOptions, tableOptionList, tableOptions} from "../table/option/table-option-list";
import {TableOptions} from "../../components/table/src/type/types";

onMounted(() => {
  getData()
})

const props = reactive({
  types: [],
  urls: [],
  dialogVisible: false,
  selectType: '',
  resourceUrl: 'http://127.0.0.1:8002/',
  fileId: ''
})

const handleClose = () => {
  props.types = []
  props.urls = []
  props.selectType = ''
  props.dialogVisible = false
  props.fileId = ''
}

const tableData = ref<any[]>([])
const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const singleTableRef = ref()
const loading = ref<boolean>(false)

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
  axios.post(props.resourceUrl + `file/download/queryPage?page=${currentPage.value - 1}&pageSize=${pageSize.value}`, data).then((res: any) => {
    console.log('res', res.data.data)
    tableData.value = res.data.data.rows
    total.value = res.data.data.total
    loading.value = false
  })
}

const edit = (scope: any) => {
  props.fileId = scope.row.fileId
  axios.post(props.resourceUrl + `file/preview/` + scope.row.fileId).then((res: any) => {
    if (res.data.data) {
      props.selectType = res.data.data.previewTypes[0]
      props.types = res.data.data.previewTypes
      props.urls = res.data.data.fileList.map((item: { fileId: string; }) => props.resourceUrl + 'file/download/' + item.fileId)
      props.dialogVisible = true
    }
  })
}

function fetchPreviewUrl(previewType: string,ext:any) {
  axios.post(props.resourceUrl + `file/preview/${ext}?previewType=${previewType}`).then((res: any) => {
    if (res.data.data) {
      props.selectType = previewType
      props.types = res.data.data.previewTypes
      props.urls = res.data.data.fileList.map((item: { fileId: string; }) => props.resourceUrl + 'file/download/' + item.fileId)
      props.dialogVisible = true
    }
  })
}

const multipleSelection = ref<string>()
// 表格配置
const tableConfig = {
  key: 2,
  stripe: true,
  border: true,
  highlightCurrentRow: true,
  tableLayout: 'auto',
  maxHeight: '73.5vh',
  extraAction: {
    selectionChange: (val: []) => {
      var tempItem = []
      for (var item of val) {
        tempItem.push(item.name)
      }
      multipleSelection.value = tempItem.join(',')
    }
  }
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
      console.log('currentChange', value)
      currentPage.value = value
      getData()
    },
    prevClick: (value: number) => {
      console.log('prevClick', value)
    },
    nextClick: (value: number) => {
      console.log('nextClick', value)
    },
  }
}

// action条 搜索框下边的操作栏
const operatorConfig = {
  showActions: true
}
// 加载框配置
const loadConfig = {
  isLoad: loading,
  lock: true,
  fullscreen: true,
  text: '加载中...'
}

const options: TableOptions[] = [
  {
    disabled: false,
    isShow: true,
    disableDraggable: true,
    align: 'center',
    id: 'checkbox',
    type: 'selection',
    label: '复选框',
    extra: {
      fixed: true,
    },
  },
  {
    disabled: true,
    isShow: false,
    disableDraggable: true,
    align: 'center',
    id: 'fileId',
    prop: 'fileId',
    label: 'fileId',
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    label: '文件名',
    id: 'fileName',
    prop: 'fileName',
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
    id: 'crtTime',
    label: '创建日期',
    prop: 'crtTime',
    align: 'center',
    extra: {
      sortable: true,
    }
  }
]
const actionOption: TableOptions = actionOptionConst
</script>

<style lang="scss" scoped>
.flex {
  display: flex;

  div {
    margin-right: 10px;
  }
}
</style>
