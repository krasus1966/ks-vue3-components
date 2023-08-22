<template>
  <el-form v-if="model"
           :validate-on-rule-change="false"
           v-bind="$attrs"
           :model="model"
           :rules="rules">
    <template
        v-for="(item,index) in options"
        :key="index">
      <el-form-item
          v-if="!item.children || !item.children!.length"
          :prop="item.prop"
          :label="item.label">
        <component
            v-if="item.type !== 'el-upload'"
            :placeholder="item.placeholder"
            v-bind="item.attrs"
            :is="item.type"
            v-model="model[item.prop!]">
        </component>
        <el-upload v-else v-bind="item.uploadAttrs">
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
      </el-form-item>
      <el-form-item
          v-if="item.children && item.children.length"
          :prop="item.prop"
          :label="item.label">
        <component
            :placeholder="item.placeholder"
            v-bind="item.attrs"
            :is="`${item.type}`"
            v-model="model[item.prop!]"
        >
          <component
            v-for="(child,i) in item.children"
            :key="i"
            :is="child.type"
            :label="child.label"
            :value="child.value">

          </component>
        </component>
      </el-form-item>
    </template>

  </el-form>
</template>

<script lang="ts" setup>

import {onBeforeMount, PropType, ref,watch} from "vue";
import {FormOptions} from "./types/types";
import cloneDeep from "lodash/cloneDeep";

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})

const model = ref<any>()
const rules = ref<any>()

function initForm() {
  const m: any = {}
  const r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

onBeforeMount(() => {
  initForm();
})

watch(()=>props.options,()=>{
  initForm()
},{deep:true})
</script>

<style lang="scss" scoped>

</style>
