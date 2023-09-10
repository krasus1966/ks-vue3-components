<template>
  <div ref="flowContainersRef" v-loading="isView" class="flow-containers" :class="{ 'view-mode': isView }">
    <el-container style="height: 100%">
      <el-header style="border-bottom: 1px solid rgb(218 218 218);height: auto;">
        <div style="display: flex; padding: 10px 0px; justify-content: space-between;">
          <div>
            <el-upload action="" :before-upload="openBpmn" style="margin-right: 10px; display:inline-block;">
              <el-tooltip effect="dark" content="加载xml" placement="bottom">
                <el-button size="small" icon="el-icon-folderopened" />
              </el-tooltip>
            </el-upload>
            <el-tooltip effect="dark" content="新建" placement="bottom">
                <el-button size="small" icon="el-icon-circleplus" @click="newDiagram" />
            </el-tooltip>
            <el-tooltip effect="dark" content="自适应屏幕" placement="bottom">
              <el-button size="small" icon="el-icon-rank" @click="fitViewport" />
            </el-tooltip>
            <el-tooltip effect="dark" content="放大" placement="bottom">
              <el-button size="small" icon="el-icon-zoomin" @click="zoomViewport(true)" />
            </el-tooltip>
            <el-tooltip effect="dark" content="缩小" placement="bottom">
              <el-button size="small" icon="el-icon-zoomout" @click="zoomViewport(false)" />
            </el-tooltip>
            <el-tooltip effect="dark" content="后退" placement="bottom">
              <el-button size="small" icon="el-icon-back" @click="modeler.get<CommandManager>('commandStack').undo()" />
            </el-tooltip>
            <el-tooltip effect="dark" content="前进" placement="bottom">
              <el-button size="small" icon="el-icon-right" @click="modeler.get('commandStack').redo()" />
            </el-tooltip>
          </div>
          <div>
            <el-button size="small" icon="el-icon-download" @click="saveXML(true)">下载xml</el-button>
            <el-button size="small" icon="el-icon-picture" @click="saveImg('svg', true)">下载svg</el-button>
            <el-button size="small" type="primary" @click="save">保存模型</el-button>
          </div>
        </div>
      </el-header>
      <el-container style="align-items: stretch">
        <el-main style="padding: 0;height: 75vh">
          <div ref="canvasRef" class="canvas" />
        </el-main>
        <el-aside style="width: 400px; min-height: 650px; background-color: #f0f2f5">
<!--          <panel v-if="modeler" :modeler="modeler" :users="users" :groups="groups" :categorys="categorys" />-->
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import {ref, watch, defineEmits, defineProps, reactive, onMounted} from "vue";
import Modeler from "bpmn-js/lib/Modeler";
import customTranslate from './util/customTranslate'
import flowableModeler from './flowable/flowable.json'
import getInitStr from './flowable/init'
import BpmData from './BpmData'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import {ElMessage} from "element-plus";
import {Canvas} from "bpmn-js/lib/features/context-pad/ContextPadProvider";
import {CommandManager} from "pdfjs-dist/types/src/display/editor/tools";


const props = defineProps({
  xml: {
    type: String,
    default: ''
  },
  users: {
    type: Array,
    default: () => []
  },
  groups: {
    type: Array,
    default: () => []
  },
  categorys: {
    type: Array,
    default: () => []
  },
  isView: {
    type: Boolean,
    default: false
  }
})

const flowContainersRef = ref()
const canvasRef = ref()
let modeler = reactive<Modeler>(new Modeler())

const xmlRef = ref<string>('')
const zoom = ref<number>()
const xml = watch(()=> xmlRef,(xml)=>{
  if (xml.value) {
    createNewDiagram(xml.value)
  }
})
const newDiagram = ()=> {
  createNewDiagram(getInitStr())
}

const createNewDiagram = async (data:string) =>{
  // 将字符串转换成图显示出来
  data = data.replace(/<!\[CDATA\[(.+?)]]>/g, function(match, str) {
    return str.replace(/</g, '&lt;')
  })
  try {
    await modeler.importXML(data)
    adjustPalette()
    fitViewport()
  } catch (err : any) {
    console.error(err.message, err.warnings)
    ElMessage.error('导入的文件不正确！')
  }
}

// 让图能自适应屏幕
const fitViewport = () => {
  zoom.value = modeler.get<Canvas>('canvas').zoom('fit-viewport')
  const bbox = flowContainersRef.value.querySelector('.flow-containers .viewport').getBBox()
  const currentViewbox = modeler.get<Canvas>('canvas').viewbox()
  const elementMid = {
    x: bbox.x + bbox.width / 2 - 65,
    y: bbox.y + bbox.height / 2
  }
  modeler.get<Canvas>('canvas').viewbox({
    x: elementMid.x - currentViewbox.width / 2,
    y: elementMid.y - currentViewbox.height / 2,
    width: currentViewbox.width,
    height: currentViewbox.height
  })
  zoom.value = bbox.width / currentViewbox.width * 1.8
}

// 放大缩小
const zoomViewport = (zoomIn = true) => {
  zoom.value = modeler.get<Canvas>('canvas').zoom()
  zoom.value! += (zoomIn ? 0.1 : -0.1)
  modeler.get<Canvas>('canvas').zoom(zoom.value)
}
// 调整左侧工具栏排版
const adjustPalette = () => {
  try {
    // 获取 bpmn 设计器实例
    const canvas = canvasRef.value
    const djsPalette = canvas.children[0].children[1].children[5]
    const djsPalStyle = {
      width: '130px',
      padding: '5px',
      background: 'white',
      left: '20px',
      borderRadius: 0
    }
    for (var key in djsPalStyle) {
      djsPalette.style[key] = djsPalStyle[key]
    }
    const palette = djsPalette.children[0]
    const allGroups = palette.children
    allGroups[0].style['display'] = 'none'
    // 修改控件样式
    for (const gKey in allGroups) {
      const group = allGroups[gKey]
      for (const cKey in group.children) {
        const control = group.children[cKey]
        const controlStyle = {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '150px',
          padding: '5px'
        }
        if (
            control.className &&
            control.dataset &&
            control.className.indexOf('entry') !== -1
        ) {
          const controlProps = new BpmData().getControl(
              control.dataset.action
          )
          control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
              controlProps['title']
          }</div>`
          for (var csKey in controlStyle) {
            control.style[csKey] = controlStyle[csKey]
          }
        }
      }
    }
  } catch (e) {
    console.log('error',e)
  }
}
// 对外 api
const getProcess = () => {
  const element = getProcessElement()
  return {
    id: element.id,
    name: element.name,
    category: element.$attrs['flowable:processCategory']
  }
}
const getProcessElement = () => {
  const rootElements = modeler.getDefinitions().rootElements
  for (let i = 0; i < rootElements.length; i++) {
    if (rootElements[i].$type === 'bpmn:Process') return rootElements[i]
  }
}
const saveXML = async (download = false) => {
  try {
    const { xml } = await modeler.saveXML({ format: true })
    if (download) {
      downloadFile(`${getProcessElement().name}.bpmn20.xml`, xml, 'application/xml')
    }
    return xml
  } catch (err) {
    console.log(err)
  }
}

const saveImg = async (type = 'svg', download = false) => {
  try {
    const { svg } = await modeler.saveSVG()
    if (download) {
      downloadFile(getProcessElement().name, svg, 'image/svg+xml')
    }
    return svg
  } catch (err) {
    console.log(err)
  }
}

const save = async ()=> {
  const process = getProcess()
  const xml = await saveXML()
  const svg = await saveImg()
  const result = { process, xml, svg }
  emits('save',result)
  window.parent.postMessage(result, '*')
}

const openBpmn = (file: Blob) => {
  const reader : FileReader = new FileReader()
  reader.readAsText(file, 'utf-8')
  reader.onload = () => {
    createNewDiagram(reader.result)
  }
  return false
}

const downloadFile = (filename: string, data: BlobPart, type: any) => {
  var a = document.createElement('a')
  var url = window.URL.createObjectURL(new Blob([data], { type: type }))
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

const emits = defineEmits(['save'])

onMounted(()=>{
  modeler = new Modeler({
    container: canvasRef.value,
    additionalModules: [
      {
        translate: ['value', customTranslate]
      }
    ],
    moddleExtensions: {
      flowable: flowableModeler
    }
  })
  // 新增流程定义
  if (!props.xml) {
    newDiagram()
  } else {
    createNewDiagram(props.xml)
  }
})
</script>

<style scoped lang="scss">
.view-mode {
  .el-header, .el-aside, .djs-palette, .bjs-powered-by {
    display: none;
  }
  .el-loading-mask {
    background-color: initial;
  }
  .el-loading-spinner {
    display: none;
  }
}
.flow-containers {
  width: 100%;
  height: 100%;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .panel {
    position: absolute;
    right: 0;
    top: 50px;
    width: 300px;
  }
  .load {
    margin-right: 10px;
  }
  .el-form-item__label{
    font-size: 13px;
  }

  .djs-palette{
    left: 0px!important;
    top: 0px;
    border-top: none;
  }

  .djs-container svg {
    min-height: 650px;
  }
}
</style>
