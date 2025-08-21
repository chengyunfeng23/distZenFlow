<template>
  <div style="background-color: #f1f1f1; height: 100%; width: 100%">
    <CflowEditorLoader
      :isRightConfig="true"
      ref="CflowEditorLoaderRef"
      @handleDragMove="handleDragMove"
      @editNode="editNode"
      @getcanvasSize="getcanvasSize"
      @getConnectionsValue="getConnectionsValue"
      @saveNodes="saveNodes"
      @getNodesValue="getNodesValue"
      :nodeTypes="nodeTypes"
      :bg="logo"
      isConnectionType
    >
  
     
      <template #right-config="{ selectNode }">
        <p>节点名称 ：<el-input type="text" v-model="selectNode.label" /></p>
        <p>节点位置 ：<el-input type="text" v-model="selectNode.x" /></p>
      </template>
    </CflowEditorLoader>
  </div>
</template>
<script lang="ts" setup>
import logo from "./logo.png";
import { ref } from "vue";
const CdialogRef = ref();
const ishow = ref(true);
const boxRef = ref();
const nodeTypes = ref([
  { type: "start", label: "节点", width: 50, height: 50, color: "green" },
]);
const CflowEditorLoaderRef = ref();

const isId = ref();
const click = (node) => {
  const obj = CflowEditorLoaderRef.value.setNodesConfig(node.id, "a", 2);
};
const handleDragMove = (node) => {
  if (node.id === isId) {
    editNode(node);
  }
};
const isShow = ref(false);
const editNode = (node) => {
  isId.value = node.id;
  isShow.value = false;
  boxRef.value.style.left = "50%";
  boxRef.value.style.top = "100%";
  boxRef.value.style.transform = "translateX(-50%)";
  CflowEditorLoaderRef.value.setNodesConfig(node.id, "color", "pink");
};


const nodes = ref([]);
const connections = ref([]);
const canvasSize = ref();
// 获取所有节点
function getNodesValue(value: any) {
  console.log(value);

  nodes.value = value;
}
// 获取所有连线
const getConnectionsValue = (value: any) => {
  connections.value = value;
};
// 获取画布大小
const getcanvasSize = (e) => {
  canvasSize.value = e;
};

</script>

<style lang="scss" scoped>

</style>
