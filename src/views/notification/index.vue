<template>
  <ks-notification>
    <template #default>
      <ks-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></ks-list>
    </template>
  </ks-notification>
</template>

<script lang="ts" setup>
import { list, actions } from './data'
const clickItem = (val:any) => {
  console.log(val)
}
const clickAction = (val:any) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>

</style>
