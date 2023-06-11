<template>
  <ks-bpmn
    :is-view="false"
    @save=""
  />
</template>

<script setup lang="ts">

const save = (result)=>{
  console.log('save result',result)
}
</script>

<style scoped lang="scss">

</style>
