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
        @onChange="handleChange"
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

import {onBeforeUnmount, shallowRef, computed, CSSProperties, ref} from 'vue'
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
const valueHtml = ref(props.modelValue)

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editorRef?.value?.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  props.onCreated?.(editor)
}

const handleChange = (editor: any) => {
  emits('update:modelValue', editor.getHtml())
  props.onChange?.(editor)
}
defineExpose({
  editorRef
})
</script>

<style lang="scss" scoped>
.w-e-full-screen-container {
  bottom: 0!important;
  display: flex!important;
  flex-direction: column!important;
  height: 100%!important;
  left: 0!important;
  margin: 0!important;
  padding: 0!important;
  position: fixed;
  right: 0!important;
  top: 0!important;
  width: 100%!important;
  z-index: 1;
}
</style>
