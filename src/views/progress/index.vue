<template>
  <ks-progress :percentage="80" :isAnimation="true"></ks-progress>
  <ks-progress :percentage="100" :isAnimation="true" status="warning"/>
  <ks-progress :text-inside="true"
              :isAnimation="true"
              :stroke-width="24"
              :percentage="30"
              status="success"/>
  <ks-progress
      type="circle"
      :text-inside="false"
      :isAnimation="true"
      :stroke-width="24"
      :percentage="30"/>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>
