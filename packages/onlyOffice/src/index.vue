<template>
  <DocumentEditor
      id="docEditor"
      documentServerUrl="http://docker.for.mac.localhost:11104/"
      :config="props.config"
      :events_onDocumentReady="onDocumentReady"
  />
</template>

<script lang="ts" setup>

import {DocumentEditor} from "@onlyoffice/document-editor-vue";
import {PropType} from "vue";
import {OnlyOfficeConfig} from "./type/config";

const props = defineProps({
  config: {
    type: Object as PropType<OnlyOfficeConfig>,
    required: true
  },
})
const onDocumentReady = () => {
  console.log("Document is loaded");
}
</script>

<style lang="scss" scoped>

</style>
