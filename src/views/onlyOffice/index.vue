<template>
  <div style="height: 85vh">
    <ks-only-office :config="config"/>
  </div>
</template>

<script lang="ts" setup>
const config = {
  document: {
    fileType: "docx",
    key: "645690e909079c6cc5a21e41",
    title: "工会在线.docx",
    url: "http://docker.for.mac.localhost:8002/file/download/645690e909079c6cc5a21e41"
  },
  token: "krasus1966",
  documentType: "word",
  width: '100%',
  type: 'desktop',
  editorConfig: {
    lang: 'zh',
    region: 'zh',
    callbackUrl: "http://docker.for.mac.localhost:8002/file/download/test2"
  }
}
</script>

<style lang="scss" scoped>

</style>
