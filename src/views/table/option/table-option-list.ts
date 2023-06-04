import {TableOptions} from "../../../components/table/src/type/types";

export const tableOptionList = [
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名',
    labelWidth: 'auto'
  }
]

export const searchMoreOptions = [
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },{
    label: '姓名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入姓名'
  },
]

export const tableOptions: TableOptions[] = [
  {
    disabled: false,
    isShow: true,
    disableDraggable: true,
    align: 'center',
    id: 'checkbox',
    type: 'selection',
    width: 75,
    label: '',
    extra: {
      fixed: true,
    },
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    align: 'center',
    id: 'index2',
    type: 'index',
    label: '序号',
    width: 75,
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    label: '姓名',
    id: 'name',
    prop: 'name',
    width: 300,
    align: 'center',
    extra: {
      // fixed: true,
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: true,
    disableDraggable: false,
    id: 'date',
    label: '日期',
    prop: 'date',
    width: 300,
    align: 'center',
    extra: {
      sortable: true,
    }
  },
  {
    disabled: false,
    isShow: false,
    disableDraggable: false,
    id: 'address',
    label: '地址',
    prop: 'address',
    width: 300,
    align: 'center',
    extra: {
      fixed: 'right',
      showOverflowTooltip: true
    },
  }
]

export const actionOptionConst : TableOptions = {
  disabled: false,
  isShow: true,
  disableDraggable: true,
  id: 'action',
  label: '操作',
  align: 'center',
  extra: {
    fixed: 'right',
    width: 200,
    sortable: true,
  }
}
