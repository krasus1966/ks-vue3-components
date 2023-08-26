import {RuleItem} from "./rule";
import {CSSProperties} from "vue";
import {
  FormInstance,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile
} from "element-plus";
import {Awaitable} from "element-plus/lib/utils";
import type {UploadInstance} from 'element-plus'
import {IEditorConfig, IToolbarConfig} from "@wangeditor/editor";
import {IDomEditor} from "@wangeditor/core/dist/core/src/editor/interface";

export type FormScope = {
  form: FormInstance,
  upload: UploadInstance,
  editor: IDomEditor,
  model: any
}

export interface FormOptions {

  // 表单组件元素
  type: 'el-autocomplete' | 'el-cascader' | 'el-checkbox' |
    'el-checkbox-group' | 'el-color-picker' | 'el-radio-button' | 'el-radio' |
    'el-radio-group' | 'el-date-picker' | 'el-input' | 'el-input-number' |
    'el-rate' | 'el-select' | 'el-option' | 'el-select-v2' | 'el-slider' |
    'el-switch' | 'el-tooltip' | 'el-time-picker' | 'el-time-select' |
    'el-transfer' | 'el-upload' | 'wang-editor',
  // 表单项的指值
  value?: any,
  // 表单项的label
  label?: string,
  // 表单的标识
  prop?: string,
  // 表单校验规则
  rules?: RuleItem[],
  // 占位符
  placeholder?: string,
  // 表单特有属性
  attrs?: {
    // css
    style?: CSSProperties,
  },
  // 子元素
  children?: FormOptions[],
  // 上传组件
  uploadAttrs?: UploadOptions,
  // wang-editor
  editorAttrs?: EditorAttrs,
}

type UploadOptions = {
  action: string;
  headers?: object;
  method?: 'post' | 'put' | 'patch';
  multiple?: boolean;
  data?: Record<string, any>;
  name?: string;
  withCredentials?: boolean;
  showFileList?: boolean;
  drag?: boolean;
  accept?: string;
  fileList?: UploadFile[],
  listType?: 'text' | 'picture' | 'picture-card',
  autoUpload?: boolean,
  disabled?: boolean,
  limit?: number,
  onPreview?: (uploadFile: UploadFile) => void,
  onRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onError?: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onProgress?: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void,
  beforeUpload?: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>,
  beforeRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>,
  httpRequest?: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>,
};

type EditorAttrs = {
  containerStyle?: CSSProperties,
  toolbarStyle?: CSSProperties,
  editorStyle?: CSSProperties,

  toolbarConfig?: Partial<IToolbarConfig>,
  editorConfig?: Partial<IEditorConfig>,
  menuConfig?: Partial<IEditorConfig>,
  getConfig?: () => void,
  handleTab?: () => void,

  // 生命周期方法 onCreated会在其自身onCreated执行完毕后再执行
  onCreated?: (editor: any) => void,
  onChange?: (editor: any) => void,
  onDestroyed?: (editor: any) => void,
  onFocus?: (editor: any) => void,
  onBlur?: (editor: any) => void,
  customAlert?: (info: any, type: any) => void,
  customPaste?: (editor: any, event: any, callback: any) => void,
};
