<template>
<div>
  <ks-form :options="options" label-width="100px">
    <template #uploadArea>
      <el-button size="small" type="primary">点击上传</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </ks-form>
</div>
</template>

<script lang="ts" setup>
import {FormOptions} from "../../components/form/src/types/types";
import {ref} from "vue";
import {Awaitable} from "element-plus/lib/utils";
const username = ref()
const options: FormOptions[] = [
  {
    type: 'el-input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger:'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger:'blur'
      },
    ]
  },
  {
    type: 'el-input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger:'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger:'blur'
      },
    ],
    attrs: {
      showPassword: true
    }
  },
  {
    type: 'el-select',
    value: '',
    label: '职位',
    prop: 'rank',
    placeholder: '请选择职位',
    attrs: {
      style:{
        width: '100%'
      },
    },
    children:[
      {
        type: 'el-option',
        value: '1',
        label: '职位1',
      },
      {
        type: 'el-option',
        value: '2',
        label: '职位2',
      },{
        type: 'el-option',
        value: '3',
        label: '职位3',
      }
    ]
  },
  {
    type: 'el-checkbox-group',
    value: [],
    label: '职位2',
    prop: 'rank2',

    attrs: {
      style:{
        width: '100%'
      },
    },
    children:[
      {
        type: 'el-checkbox',
        value: '1',
        label: '职位1',
      },
      {
        type: 'el-checkbox',
        value: '2',
        label: '职位2',
      },{
        type: 'el-checkbox',
        value: '3',
        label: '职位3',
      }
    ]
  },
  {
    type: 'el-radio-group',
    value: '',
    label: '职位3',
    prop: 'rank3',
    rules: [{
      required:true,
      trigger: 'blur',
    }],
    attrs: {
      style:{
        width: '100%'
      },
    },
    children:[
      {
        type: 'el-radio',
        value: '1',
        label: '职位1',
      },
      {
        type: 'el-radio',
        value: '2',
        label: '职位2',
      },{
        type: 'el-radio',
        value: '3',
        label: '职位3',
      }
    ]
  },
  {
    type: 'el-rate',
    value: 5,
    label: '评分',
    prop: 'rank4',
    rules: [{
      required:true,
      trigger: 'blur',
    }],
    attrs: {
      style:{
        width: '100%'
      },
    },
  },
  {
    type: 'el-upload',
    value: 5,
    label: '上传附件',
    prop: 'upload',
    rules: [{
      required:true,
      trigger: 'blur',
    }],
    uploadAttrs: {
      action: 'http://127.0.0.1:8080/api/upload',
      accept: 'image/png',
      //multiple: true,
      onPreview: uploadFile => {
        console.log('upload onPreview',uploadFile)
      },
      onRemove: uploadFile => {
        console.log('upload onRemove',uploadFile)
      },
      onSuccess: response => {
        console.log('upload success',response)
      },
      onError: error => {
        console.log('upload error',error)
      },
      onProgress: evt => {
        console.log('upload onProgress',evt)
      },
      onChange: uploadFile => {
        console.log('upload onChange',uploadFile)
      },
      onExceed: files => {
        console.log('upload onExceed',files)
      },
      beforeUpload: rawFile => {
        console.log('beforeUpload',rawFile)
      },
      beforeRemove: uploadFile => {
        console.log('beforeRemove',uploadFile)
        return true;
      },
      httpRequest: options1 => {
         console.log('upload httpRequest',options1)
        return new Promise(resolve => {
          console.log('upload httpRequest Promise',resolve)
        });
      }
    },
  }
]
</script>

<style lang="scss" scoped>

</style>
