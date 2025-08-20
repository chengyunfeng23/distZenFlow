<template>
  <div style="background-color: #f1f1f1; height: 100%; width: 100%">
    <CflowEditorLoader
      @getNodesValue="getNodesValue"
      @getConnectionsValue="getConnections"
      ref="CflowEditorLoaderRef"
      :bg="logo"
      isConnectionType
      :nodeTypes="nodeTypes"
    >
      <template #slotName="{ node }">
        <div
          @click="click(node)"
          class="hover"
          :class="node.a === 1 ? 'a' : 'b'"
        ></div>
      </template>
    </CflowEditorLoader>
  </div>
</template>
<script lang="ts" setup>
import logo from "./logo.png";
import { ref } from "vue";
const boxRef = ref();
const nodeTypes = ref([
  {
    type: "start",
    label: "节点",
    width: 50,
    height: 50,
    color: "green",
  },
  {
    type: "slot",
    label: "自定义",
    width: 50,
    height: 50,
    color: "#000",
    slotName: "slotName",
  },
  {
    type: "html",
    label: "html",
    width: 50,
    height: 50,
    color: "",
    target: `<h1>HTML</h1>`,
  },
]);
const CflowEditorLoaderRef = ref();

const isId = ref();
const click = (node) => {
  const obj = CflowEditorLoaderRef.value.setNodesConfig(node.id, "a", 2);
};
const getNodesValue = (node) => {
  console.log(JSON.stringify(node));
};
const getConnections = (node) => {
  console.log(JSON.stringify(node));
};
</script>

<style lang="scss" scoped>
.box {
  display: none;
  width: 100px;
  height: 100px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 9999999999999999999;
}

.hover {
  width: 100%;
  height: 100%;
  color: bisque;
}

// 添加动画字体0%的时候颜色是红色 100%的时候颜色是绿色
.b {
  animation: colorchange 2s infinite;
}

@keyframes colorchange {
  0% {
    background-color: red;
  }

  50% {
    background-color: yellow;
  }

  100% {
    background-color: red;
  }
}
</style>
