<template>
  <div>
    <ks-form ref="formRef" :options="options" label-width="100px">
      <template #uploadArea>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">保存</el-button>
        <el-button @click="resetForm(scope)">重置</el-button>
      </template>
    </ks-form>
  </div>
</template>

<script lang="ts" setup>
import {FormOptions, FormScope } from "../../components/form/src/types/types";
import {ref, shallowRef} from "vue";
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";
import {ValidateFieldsError} from "async-validator";
import {FormValidateCallback} from "element-plus/es/components/form/src/types";

const formRef = ref()
const editorRef = shallowRef()

const options: FormOptions[] = [
  {
    type: 'el-input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    /*rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      },
    ]*/
  },
  {
    type: 'el-input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    /*rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur'
      },
    ],*/
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
      style: {
        width: '100%'
      },
    },
    children: [
      {
        type: 'el-option',
        value: '1',
        label: '职位1',
      },
      {
        type: 'el-option',
        value: '2',
        label: '职位2',
      }, {
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
      style: {
        width: '100%'
      },
    },
    children: [
      {
        type: 'el-checkbox',
        value: '1',
        label: '职位1',
      },
      {
        type: 'el-checkbox',
        value: '2',
        label: '职位2',
      }, {
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
 /*   rules: [{
      required: true,
      trigger: 'blur',
      message: '请选择职级3',
    }],*/
    attrs: {
      style: {
        width: '100%'
      },
    },
    children: [
      {
        type: 'el-radio',
        value: '1',
        label: '职位1',
      },
      {
        type: 'el-radio',
        value: '2',
        label: '职位2',
      }, {
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
 /*   rules: [{
      required: true,
      trigger: 'blur',
      message: '请选择评分',
    }],*/
    attrs: {
      style: {
        width: '100%'
      },
    },
  },
  {
    type: 'wang-editor',
    prop: 'editor',
    value: '<h2>123412312341234</h2>',
    label: '富文本编辑器',
    rules: [{
      required: true,
      trigger: 'blur',
      message: '富文本编辑器内容为空',
      validator: () => !editorRef?.value.isEmpty()
    }],
    editorAttrs:{
      editorConfig:{
        placeholder: '请输入默认值',
        readOnly: false,
        autoFocus: true,
        scroll:false,
        MENU_CONF: {
          ['uploadImage']: {
            server: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
          }
        }
      },
      onCreated: editor => {
        editorRef.value = editor
      }
    }
  },
  {
    type: 'el-upload',
    value: '',
    label: '上传附件',
    prop: 'upload222',
   /* rules: [{
      required: true,
      trigger: 'blur',
      message: '请上传文件',
    }],*/
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      //accept: 'image/png',
      multiple: true,
      limit: 6,
      onPreview: uploadFile => {
        ElMessage.success('点击预览文件！')
      },
      onRemove: uploadFile => {
        ElMessage.success('文件已删除！')
      },
      onSuccess: response => {
        // 子组件的model中赋值
        formRef.value.model.upload222 = response
        ElMessage.success('文件上传成功！')
      },
      onError: error => {
        ElMessage.error('上传文件失败！')
      },
      onProgress: evt => {
      },
      onChange: uploadFile => {
      },
      onExceed: files => {
        ElMessage.warning('上传文件超过数量限制！')
      },
      beforeUpload: rawFile => {
      },
      beforeRemove: uploadFile => {
        return ElMessageBox.confirm(
            '此操作将会删除选中文件. 是否确认?',
            '警告',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
        )
            .then(() => {
              return true;
            })
            .catch(() => {
              ElMessage.info('取消删除文件')
              return false;
            })
      },
      /*httpRequest: options1 => {
         console.log('upload httpRequest',options1)
        return new Promise(resolve => {
          console.log('upload httpRequest Promise',resolve)
        });
      }*/
    },
  }
]

const submitForm = (scope: FormScope) => {
  scope.form.validate((valid,invalidFields) => {
    if (valid) {
      ElMessage.success(JSON.stringify(scope.model))
    } else {
      console.log('invalidFields',invalidFields)
      Object.keys(invalidFields!!).forEach((key,i) => {
        const propName=invalidFields!![key][0]
        setTimeout(()=>{
          ElMessage.error(propName)
        })
      })
      return false
    }
  })
}

const resetForm = (scope: FormScope) => {
  scope?.form.resetFields()
  if (scope?.upload) {
    scope.upload[0]?.clearFiles()
  }
  editorRef?.value.clear()
  editorRef?.value.setHtml('<p><br></p>')
  ElMessage.success('表单项重置！')
}
</script>

<style lang="scss" scoped>

</style>
