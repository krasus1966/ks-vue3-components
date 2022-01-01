<template>
  <ks-menu
      :data="data1"
      style="width: 200px"
      defaultActive="2"
      :router="false"/>

  <ks-infinite-menu
      :data="data2"
      style="width: 200px"
      defaultActive="2"
      :router="false"/>
</template>

<script lang="ts" setup>
const data1 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document'
  }, {
    name: '导航2',
    index: '2',
    icon: 'Document'
  }, {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document'
      }
    ]
  }
]

const data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document'
  }, {
    name: '导航2',
    index: '2',
    icon: 'Document'
  }, {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'Document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'Document',
                children: [
                  {
                    name: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    icon: 'Document'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style lang="scss" scoped>

</style>
