<template>
  <div style="flex-direction: row;min-height: 84.5vh">
    <el-form v-if="searchConfig.isSearch" :model="form" :inline="true">
      <template v-if="!showMoreSearchOptions" v-for="(item,index) in searchConfig.options">
        <el-form-item label-width="auto" :label="item.label" :prop="form[item.prop]">
          <el-input v-if="item.type === 'input'" v-model="form[item.prop]" :placeholder="item.placeholder"/>
        </el-form-item>
      </template>
      <template v-else v-for="(item,index) in searchConfig.moreOptions">
        <el-form-item label-width="auto" :label="item.label" :prop="form[item.prop]">
          <el-input v-if="item.type === 'input'" v-model="form[item.prop]" :placeholder="item.placeholder"/>
        </el-form-item>
      </template>
      <el-form-item label-width="auto" style="justify-content: right">
        <el-button type="primary" plain @click="searchConfig.action?.submit(<Object>form)">搜索</el-button>
        <el-button plain @click="reset">重置</el-button>
        <el-button v-if="searchConfig.options?.length > 0 && searchConfig.moreOptions?.length > 0"
                   @click="showMoreSearchOptions = !showMoreSearchOptions">
          {{ showMoreSearchOptions ? '精简' : '更多' }}筛选条件
        </el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="actionConfig.showActions" style="display: flex;justify-content: right">
      <el-form-item>
        <el-button type="primary" plain @click="searchConfig.action?.submit(<Object>form)">添加</el-button>
        <el-button plain @click="searchConfig.action?.reset(<Object>form)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-container style="justify-content: right">
      <el-dropdown ref="dropdown" :hide-on-click="false" trigger="contextmenu">
        <span class="el-dropdown-link" @click="showClick">
          标题<ks-svg-icon icon="arrowdown" style="color: #1a252f"/>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-checkbox-group v-model="checkBox">
              <el-tooltip class="item" effect="dark" content="鼠标点击标题拖动可以调整标题显示顺序" placement="left">
                <el-scrollbar class="dropdown-scrollbar">
                  <draggable :list="realOptions"
                             :animation="340"
                             group="options"
                             @end="onEnd"
                             item-key="label">
                    <template #item="{element}">
                      <div>
                        <el-dropdown-item>
                          <el-checkbox :label="element.id">{{ element.label }}</el-checkbox>
                        </el-dropdown-item>
                      </div>
                    </template>
                    <template #footer>
                      <el-dropdown-item style="text-align:center;">
                        <el-button size="small" @click="saveOption">保存</el-button>
                      </el-dropdown-item>
                    </template>
                  </draggable>
                </el-scrollbar>
              </el-tooltip>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-container>
    <el-table
        :key="tableKey"
        ref="tableRef"
        :data="data"
        style="width: 100%;min-height: 70vh"
        v-loading.lock="load?.isLoad.value"
        :element-loading-text="load?.text"
        :element-loading-background="load?.background"
        v-bind="tableConfig"
        v-on="tableConfig">
      <table-column v-for="(item,index) in showOptions" :key="index" :option="item">
        <template v-for="slot in Object.keys(customSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"/>
        </template>
      </table-column>
      <el-table-column
          v-if="actionOption && !actionOption.disabled"
          key="actionOption"
          :prop="actionOption!.prop"
          :label="actionOption!.label"
          :align="actionOption!.align"
          :width="actionOption!.width"
          v-bind="actionOption.extra"
      >
        <template #default="scope">
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>

      <template #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-table>
    <el-pagination
        v-if="!pageConfig.disabled"
        :style=" {
            justifyContent: pageConfig.position === 'center' ? 'center' : (pageConfig.position === 'right' ? 'flex-end' : 'flex-start')
          }"
        v-bind="pageConfig"
        :total="pageConfig.total.value"
        :page-size="pageConfig.pageSize.value"
        :current-page="pageConfig.currentPage.value"
        v-on="pageConfig.actions"
    />
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, PropType, reactive, ref} from "vue";
import {TableOptions} from "./type/types";
import TableColumn from "./table-column.vue";
import {ElTable} from "element-plus/es";
import {Slots} from "@vue/runtime-core";
import {TableConfig} from "./type/table-config";
import {LoadConfig} from "./type/load";
import {PageConfig} from "./type/pagination";
import {SearchOption} from "./type/search-config";
import draggable from "vuedraggable";

const props = defineProps({
  // 表格配置
  tableConfig: {
    type: Object as PropType<TableConfig>,
    required: false
  },
  // 分页配置
  pageConfig: {
    type: Object as PropType<PageConfig>,
    required: true
  },
  // 搜索配置
  searchConfig: {
    type: Object as PropType<SearchOption>,
    required: true
  },
  // 操作栏配置
  actionConfig: {
    type: Object,
    required: true
  },
  // 表格 列信息
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  // 操作列 列信息
  actionOption: {
    type: Object as PropType<TableOptions>
  },
  // 数据
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  // 是否正在加载
  loading: {
    type: Boolean,
    default: false
  },
  // 加载样式
  load: {
    type: Object as PropType<LoadConfig>,
    required: false
  },
  drag: {
    type: Boolean,
    default: false
  },
})
const tableKey = ref<number>(1)
// 可以显示的表头
const realOptions = ref<TableOptions[]>(props.options.filter((i)=> !i.disabled))
// 当前显示的表头
const showOptions = ref<TableOptions[]>([])
const dropdown = ref()
const showDropdown = ref(false)
const checkBox = ref<string[]>([])

onMounted(()=>{
  if (props.tableConfig?.key) {
    tableKey.value = props.tableConfig?.key
  }
  for (var item of realOptions.value) {
    if (item.isShow) {
      checkBox.value.push(item.id)
    }
  }
  showOptions.value = props.options.filter((i)=> checkBox.value.indexOf(i.id) >= 0)
})
// 暴露el-table的方法
const tableRef = ref<InstanceType<typeof ElTable>>()

const showClick = () => {
  if (showDropdown.value) {
    dropdown.value.handleClose()
  } else {
    dropdown.value.handleOpen()
  }
  showDropdown.value = !showDropdown.value
}


// 获取代理对象内的插槽，循环传递给table-column
const proxy = getCurrentInstance()?.proxy
const customSlots: Slots = reactive({
  ...proxy?.$slots
})

const form = reactive<object>({
  ...props.searchConfig?.form
})
const reset = (value: object) => {
  var options = props.searchConfig?.options
  if (options) {
    for (const item of options) {
      form[item.prop] = ''
    }
  }
  props.searchConfig.action?.reset(<Object>form)
}
const showMoreSearchOptions = ref<boolean>(props.searchConfig?.options?.length <= 0)

const onEnd = ()=> {
  showOptions.value = realOptions.value.filter((i) => checkBox.value.indexOf(i.id) >= 0)
  tableKey.value++
  tableRef.value!.doLayout()
}

const saveOption = () =>{
  onEnd()
  // 调用外部保存逻辑
}

defineExpose({
  tableRef
});
</script>

<style lang="scss" scoped>

</style>
