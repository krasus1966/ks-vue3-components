<template>
  <el-container direction="vertical">
    <el-main>
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
    </el-main>
    <el-pagination
        v-if="!pageConfig.disabled"
        :style="pageConfig.direction ? { 'flex-direction': pageConfig.direction } : {}"
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
