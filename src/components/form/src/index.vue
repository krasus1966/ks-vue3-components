<template>
  <el-form
      v-if="model"
      :validate-on-rule-change="false"
      v-bind="$attrs"
      ref="form"
      :model="model"
      :rules="rules">
    <template
        v-for="(item,index) in options"
        :key="index">
      <el-form-item
          v-if="!item.children || !item.children!.length"
          :prop="item.prop!"
          :label="item.label">
        <component
            :placeholder="item.placeholder"
            v-bind="bindAttrs(item)"
            :is="item.type"
            v-model="model[item.prop!]">
          <slot v-if="item.type === 'el-upload'" name="uploadArea"></slot>
          <slot v-if="item.type === 'el-upload'" name="uploadTip"></slot>
        </component>
      </el-form-item>
      <el-form-item
          v-if="item.children && item.children.length"
          :prop="item.prop!"
          :label="item.label">
        <component
            :placeholder="item.placeholder"
            v-bind="bindAttrs(item)"
            :is="item.type"
            v-model="model[item.prop!]"
        >
          <component
              v-for="(child,i) in item.children"
              v-bind="bindAttrs(child)"
              :key="i"
              :is="child.type"
              :label="child.label"
              :value="child.value">
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model" :upload="upload" :editor="editor"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>

import {computed, onBeforeMount, PropType, ref, shallowRef, watch} from "vue";
import {FormOptions} from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import {FormInstance, UploadInstance} from "element-plus";
// import {IDomEditor} from "@wangeditor/core/dist/core/src/editor/interface";

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
})


const form = ref<FormInstance | null>()
const upload = ref<UploadInstance>()
const editor = ref()
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

watch(() => props.options, () => {
  initForm()
}, {deep: true})

/**
 * 绑定属性
 */
const bindAttrs = computed(() => (item: FormOptions) => {
  switch (item.type) {
    case 'el-upload':
      return item.uploadAttrs
    case 'wang-editor':
      return item.editorAttrs
    default:
      return item.attrs
  }
})

defineExpose({
  form,
  upload,
  editor,
  model
})
</script>

<style lang="scss" scoped>

</style>
