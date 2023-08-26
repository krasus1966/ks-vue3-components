<template>
  <div :style="props.containerStyle">
    <Toolbar
        :style="props.toolbarStyle"
        :editor="editorRef"
        :defaultConfig="props.toolbarConfig"
        :mode="props.mode"
    />
    <Editor
        :style="props.editorStyle"
        v-model="valueHtml"
        :defaultConfig="props.editorConfig"
        :mode="props.mode"
        @onCreated="handleCreated"
        @onChange="props.onChange"
        @onDestroyed="props.onDestroyed"
        @onFocus="props.onFocus"
        @onBlur="props.onBlur"
        @customAlert="props.customAlert"
        @customPaste="props.customPaste"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted, computed, CSSProperties} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {IEditorConfig, IToolbarConfig} from "@wangeditor/editor";

interface EditorOptions {
  modelValue: string,
  mode?: 'default' | 'simple',
  containerStyle?: CSSProperties,
  toolbarStyle?: CSSProperties,
  editorStyle?: CSSProperties,
  toolbarConfig?: Partial<IToolbarConfig>,
  editorConfig?: Partial<IEditorConfig>,
  menuConfig?: Partial<IEditorConfig>,
  onCreated?: (editor: any) => void,
  onChange?: (editor: any) => void,
  onDestroyed?: (editor: any) => void,
  onFocus?: (editor: any) => void,
  onBlur?: (editor: any) => void,
  customAlert?: (info: any, type: any) => void,
  customPaste?: (editor: any, event: any, callback: any) => void,
}

interface EmitEvent {
  (e: 'update:modelValue', params: string): void
}
const emits = defineEmits<EmitEvent>()
// 内容 HTML
const valueHtml = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emits('update:modelValue', value)
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const props = withDefaults(defineProps<EditorOptions>(), {
  mode: 'default',
  containerStyle:{
    border: '1px solid #ccc'
  },
  toolbarStyle: {
    borderBottom: '1px solid #ccc',
  },
  editorStyle: {
    height: '300px',
    overflowY: 'hidden',
  }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  props.onCreated?.(editor)
}

defineExpose({
  editorRef
})
</script>

<style lang="scss" scoped>

</style>
