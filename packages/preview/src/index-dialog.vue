<template>
  <el-dialog
      v-model="dialogVisible"
      title="预览"
      width="80%"
      align-center
      destroy-on-close
      draggable
      top="0px"
      :before-close="onCloseDialog"
  >
    <template v-if="props.types.length > 1" v-for="(item,index) in props.types" style="padding-bottom: 115px">
      <el-button type="danger" @click="onChangePreviewType(item,props.ext)">
        {{item}}
      </el-button>
    </template>
    <ks-preview :type="props.defaultType" :urls="props.urls"></ks-preview>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue'

const props = defineProps<{
  types: [],
  urls: [],
  defaultType: '',
  dialogVisible: boolean,
  onChangePreviewType: (previewType:string,ext:any)=>void,
  onCloseDialog: ()=> void,
  ext: any
}>()

const dialogVisible = computed(()=> props.dialogVisible)
</script>

<style scoped lang="scss">

</style>
