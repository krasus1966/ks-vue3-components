<template>
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
                           :move="checkCanMove"
                           item-key="id">
                  <template #item="{element}">
                    <div :class="[(element?.disableDraggable || element?.extra?.fixed) ? 'undraggable' : '']">
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
        v-if="actionOption"
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
</template>

<script lang="ts" setup>
import {getCurrentInstance, PropType, reactive, ref} from "vue";
import {ElTable} from "element-plus/es";
import draggable from "vuedraggable";
import {Slots} from "@vue/runtime-core";
import {TableOptions} from "./type/types";
import TableColumn from "./table-column.vue";
import {TableConfig} from "./type/table-config";
import {LoadConfig} from "./type/load";
import {PageConfig} from "./type/pagination";


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
  }
})

// 获取代理对象内的插槽，循环传递给table-column
const proxy = getCurrentInstance()?.proxy
const customSlots: Slots = reactive({
  ...proxy?.$slots
})

const tableKey = ref<number>(1)
// 可以显示的表头
const realOptions = ref<TableOptions[]>(props.options.filter((i)=> !i.disabled))
// 当前显示的表头
const showOptions = ref<TableOptions[]>([])
const dropdown = ref()
const showDropdown = ref(false)
const checkBox = ref<string[]>([])

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

const checkCanMove = (e) => {
  if (e.relatedContext.element?.disableDraggable || e.relatedContext.element?.extra?.fixed) {
    return false
  }
}

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
