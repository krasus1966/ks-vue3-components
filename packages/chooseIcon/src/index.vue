<template>
  <el-button @click="handleClick" :type="buttonType">
    <slot></slot>
  </el-button>
  <div class="choose-icon-dialog-body-height">
    <el-dialog
        :title="title"
        v-model="dialogVisible">
      <div class="container">
        <div
            class="item"
            v-for="(item,index) in Object.keys(ElIcons)"
            :key="index"
            @click="clickItem(item)"
        >
          <div>
            <ks-svg-icon :icon="item" :iconStyle="`width: 2em;height: 2em`"/>
<!--            <component :is="`el-icon-${toLine(item)}`"></component>-->
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import * as ElIcons from '@element-plus/icons'
import { toLine } from '../../util'
import { useCopy } from '../../hooks/useCopy'

const props = defineProps<{
  // 弹出框的标题
  title: string,
  // 控制弹出框的显示与隐藏
  visible: boolean,
  // 按钮类型
  buttonType: string
}>()

const emits = defineEmits(['update:visible'])

// 拷贝一份父组件传递过来的visible
const dialogVisible = ref<boolean>(props.visible)
const handleClick = () => {
  emits('update:visible', !props.visible)
}

// 点击图标
const clickItem = (item: string) => {
  const text = `<el-icon-${toLine(item)} />`
  // 复制文本
  useCopy(text)
  // 关闭弹窗
  dialogVisible.value = false
}

// 监听visible变化
watch(() => props.visible, val => {
  dialogVisible.value = val
})

// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}

.text {
  font-size: 14px;
}

.icon {
  flex: 1;
}

svg {
  width: 2em;
  height: 2em;
}
</style>
