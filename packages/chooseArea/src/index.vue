<template>
  <div>
    <el-select clearable v-model="province" placeholder="请选择省份">
      <el-option
          v-for="item in areas"
          :key="item.code"
          :label="item.name"
          :value="item.code">
      </el-option>
    </el-select>

    <el-select clearable :disabled="!province" style="margin: 0 10px;" v-model="city" placeholder="请选择城市">
      <el-option
          v-for="item in selectCity"
          :key="item.code"
          :label="item.name"
          :value="item.code">
      </el-option>
    </el-select>

    <el-select clearable :disabled="!province || !city" v-model="area" placeholder="请选择区域">
      <el-option
          v-for="item in selectArea"
          :key="item.code"
          :label="item.name"
          :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

export interface AreaItem {
  name:string,
  code:string,
  children?: AreaItem[]
}

export interface Data{
  name:string,
  code:string
}

// 下拉框选择省份的值
const province = ref<string>('')
// 下拉框选择城市的值
const city = ref<string>('')
// 下拉框选择区域的值
const area = ref<string>('')
// 所有的省市区数据
const areas = ref(allAreas)

// 城市下拉框的所有的值
const selectCity = ref<AreaItem[]>([])

// 区域下拉框的所有的值
const selectArea = ref<AreaItem[]>([])

const emits = defineEmits(['change'])

// 监听选择省份
watch(() => province.value, val => {
  if (val) {
    selectCity.value = areas.value.find(item => item.code === province.value)!.children
  }
  city.value = ''
  area.value = ''
})

// 监听选择城市
watch(() => city.value, val => {
  if (val) {
    selectArea.value = selectCity.value.find(item => item.code === city.value)!.children!
  }
  area.value = ''
})

// 监听区域选择
watch(() => area.value, val => {
  if (val) {
    const provinceData:Data = {
      code: province.value,
      name: allAreas.find(item => item.code === province.value)!.name
    }
    const cityData:Data = {
      code: city.value,
      name: selectCity.value.find(item => item.code === city.value)!.name
    }
    const areaData:Data = {
      code: val,
      name: selectArea.value.find(item => item.code === val)!.name
    }

    emits('change', {
      province: provinceData,
      city: cityData,
      area: areaData
    })
  }
})

</script>

<style lang="scss" scoped>

</style>
