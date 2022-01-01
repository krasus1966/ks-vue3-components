<template>
  <div>
    <div class="flex">
      <ks-trend text="营业额" upTextColor="red"></ks-trend>
      <ks-trend text="销售额" type="down" downTextColor="yellow"></ks-trend>
    </div>
    <br>
    <div class="flex">
      <ks-trend text="营业额" upIconColor="blue" upIcon="CaretTop"></ks-trend>
      <ks-trend text="销售额" type="down" downIconColor="brown"></ks-trend>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  div{
    margin-right: 10px;
  }
}
</style>
