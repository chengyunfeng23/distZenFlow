<template>
  <div style="width: 100%;height: 100%;">
    <CflowEditorLoader ref="CflowEditorLoaderRef"  :bg="logo"
      isConnectionType>
      <template #left>
        <!-- 在这里自定义节点直接for循环就好了 -->
        <div style="cursor: pointer;" v-for="item in nodeTypes" draggable="true" @dragstart="startDrag($event, item)">{{ item.label }}</div>
      </template>
    </CflowEditorLoader>
  </div>

</template>
<script setup lang="ts">
import logo from './logo.png'
import { ref } from 'vue'

const nodeTypes = ref([
  { type: 'start', label: '节点', width: 50, height: 50, color: 'green' },
])
const CflowEditorLoaderRef = ref()
// 在这里使用
const startDrag = (event, nodeData) => {
  const node = {
    type: 'start',
    label: nodeData.label,
    width: nodeData.width,
    height: nodeData.height,
    color: 'green',
  }
  // 通过ref将节点数据传递给编辑器
  CflowEditorLoaderRef.value.startDrag(event, node)
}

</script>
<style lang="scss" scoped></style>
