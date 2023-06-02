<template>
  <el-table-column
      v-if="option.children?.length > 0"
      :label="option.label"
      :align="option.align"
      :type="option.type"
      v-bind="option.extra"
  >
    <template #header="scope" v-if="option.headerSlot">
      <slot :name="option.headerSlot" :scope="scope" :label="option.label" :prop="option.prop"></slot>
    </template>
    <template #default="scope" v-if="option.slot">
      <slot :name="option.slot" :scope="scope" :label="option.label" :prop="option.prop"></slot>
    </template>
    <template v-if="option.children?.length > 0">
      <table-column
          v-for="(item,index) in option.children"
          :key="index"
          :option="item">
        <template v-for="slot in Object.keys(customSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"/>
        </template>
      </table-column>
    </template>
  </el-table-column>
  <el-table-column
      v-else
      :prop="option.prop"
      :label="option.label"
      :type="option.type"
      :align="option.align"
      :width="option.width"
      v-bind="option.extra"
  >
    <template #header="scope" v-if="option.headerSlot">
      <slot :name="option.headerSlot" :scope="scope" :label="option.label" :prop="option.prop"></slot>
    </template>
    <template #default="scope" v-if="option.slot">
      <slot :name="option.slot" :scope="scope" :label="option.label" :prop="option.prop"></slot>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import {getCurrentInstance, PropType, reactive} from "vue";
import {TableOptions} from "./types";
import {Slots} from "@vue/runtime-core";

// 获取代理对象内的插槽，循环传递给table-column
const proxy = getCurrentInstance()?.proxy

const customSlots: Slots = reactive({
  ...proxy?.$slots
})
const props = defineProps({
  // 表格 列信息
  option: {
    type: Object as PropType<TableOptions>,
    required: true
  }
})
</script>
<style scoped lang="scss">

</style>
