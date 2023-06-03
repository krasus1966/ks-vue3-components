<template>
  <el-container direction="vertical" style="height: 100vh">
    <el-form :inline="true">
      <template v-for="(item,index) in searchConfig.options">
        <el-form-item :label="item.label" v-model="item.prop">
          <el-input v-if="item.type === 'input'" :placeholder="item.placeholder"/>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" size="small" plain @click="searchConfig.action?.submit()">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" plain @click="searchConfig.action?.reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        ref="tableRef"
        :data="data"
        style="width: 100%"
        v-loading.lock="load?.isLoad.value"
        :element-loading-text="load?.text"
        :element-loading-background="load?.background"
        v-bind="tableConfig"
        v-on="tableConfig">
      <table-column v-for="(item,index) in options" :key="index" :option="item">
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
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, PropType, reactive, ref} from "vue";
import {TableOptions} from "./types";
import TableColumn from "./table-column.vue";
import {ElTable} from "element-plus/es";
import {Slots} from "@vue/runtime-core";
import {TableConfig} from "./table-config";
import {LoadConfig} from "./load";
import {PageConfig} from "./pagination";
import {SearchOption} from "./search-config";

// 获取代理对象内的插槽，循环传递给table-column
const proxy = getCurrentInstance()?.proxy
const customSlots: Slots = reactive({
  ...proxy?.$slots
})

// 暴露el-table的方法
const tableRef = ref<InstanceType<typeof ElTable>>()
defineExpose({
  tableRef
});

const props = defineProps({
  // 表格设置
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
  // 操作列
  actionOption: {
    type: Object as PropType<TableOptions>
  },
  searchConfig: {
    type: Object as PropType<SearchOption>,
    required: true
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
</script>

<style lang="scss" scoped>

</style>
