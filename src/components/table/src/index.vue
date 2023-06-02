<template>
  <el-table ref="tableRef" :data="data" style="width: 100%" v-loading="loading" :element-loading-text="load?.text" v-bind="tableConfig" v-on="tableConfig">
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
</template>

<script lang="ts" setup>
import {computed, getCurrentInstance, PropType, reactive, ref, useAttrs} from "vue";
import {TableOptions} from "./types";
import TableColumn from "./table-column.vue";
import {ElTable} from "element-plus/es";
import {Slots} from "@vue/runtime-core";
import {TableConfig} from "./table-config";
import {LoadConfig} from "./load";

// 获取代理对象内的插槽，循环传递给table-column
const proxy = getCurrentInstance()?.proxy
const customSlots : Slots = reactive({
  ...proxy?.$slots
})

// 暴露el-table的方法
const tableRef = ref<InstanceType<typeof ElTable>>()
defineExpose({
  tableRef
});

const props = defineProps({
  tableConfig: {
    type: Object as PropType<TableConfig>,
    required: false
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
  loading: {
    type: Boolean,
    default: false
  },
  load: {
    type: Object as PropType<LoadConfig>,
    required: false
  }
})
</script>

<style lang="scss" scoped>

</style>
