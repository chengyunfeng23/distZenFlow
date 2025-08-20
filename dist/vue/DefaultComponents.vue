<template>
  <div style="width: 100%;height: 100%;">
    <CflowEditorLoader :isShowConfig="true" @editNode="editNode" @getcanvasSize="getcanvasSize" @getConnectionsValue="getConnectionsValue" @saveNodes='saveNodes'
      @getNodesValue="getNodesValue" :node-types="nodeTypes" :bg="logo" isConnectionType>
      <template #content="{node}">
        <div class="label">
          {{ node.label }}：我这里可以自定义
        </div>
      </template>
    </CflowEditorLoader>
  </div>

</template>
<script setup lang="ts">
import logo from './logo.png'
import { ref } from 'vue'
const dialogTableVisible = ref(true)
const nodeTypes = ref([
  { type: 'start', label: '', width: 50, height: 50, color: 'green' },
  { type: 'rect', label: '', width: 50, height: 50, color: '#f0f0f0' }
])
const nodes = ref([])
const connections = ref([])
const canvasSize = ref()
// 获取所有节点
function getNodesValue(value: any) {
  nodes.value = value

}
// 获取所有连线
const getConnectionsValue = (value: any) => {
  connections.value = value

}
// 获取画布大小
const getcanvasSize = (e) => {
  canvasSize.value = e
}
// 双击节点
const editNode = (e)=>{
  console.log(e);
  
}
</script>
<style lang="scss" scoped>
  .label {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    color: #333;
    background-color: pink;
    font-size: 12px;
    // 强制一行
    white-space: nowrap;
}
</style>