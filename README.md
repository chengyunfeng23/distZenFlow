# Flowchart Editor / 流程图编辑器

A lightweight, high-performance flowchart editor implemented with just a few hundred lines of JavaScript code. Highly maintainable with zero dependencies - can be easily adapted to work in pure HTML environments.

一个轻量级、高性能的流程图编辑器，仅用几百行JavaScript代码实现。可维护性高，零依赖 - 可轻松修改后直接在原生HTML中使用。

## Key Advantages / 核心优势

- 🚀 **High Performance**: Optimized JavaScript implementation handles complex diagrams smoothly / 高性能：优化的JavaScript实现可流畅处理复杂图表
- 📦 **Zero Dependencies**: Pure vanilla JS implementation, no external packages required / 零依赖：纯原生JS实现，无需外部包
- 🛠️ **Easy Integration**: Can be directly used in plain HTML projects after simple modifications / 易于集成：简单修改后可直接在原生HTML项目中使用
- 🧩 **Maintainable**: Clean, well-structured code with clear separation of concerns / 可维护性高：代码结构清晰，关注点分离明确

## Technology Highlights / 技术亮点

- **Pure JavaScript**: No framework dependencies, just ~500 lines of core logic / 纯JavaScript：无框架依赖，核心逻辑仅约500行代码
- **Native DOM API**: Uses standard browser APIs for maximum compatibility / 原生DOM API：使用标准浏览器API实现最大兼容性
- **Modular Design**: Features are self-contained and easy to modify / 模块化设计：功能模块自包含，易于修改
- **HTML5 Ready**: Can be embedded in any HTML page with minimal setup / HTML5就绪：只需简单设置即可嵌入任何HTML页面

## Plain HTML Usage / 原生HTML用法

1. Copy the compiled JS file to your project / 将编译后的JS文件复制到项目
2. Include in HTML head / 在HTML头部引入:

```html
<script src="flowchart-editor.js"></script>
```

A modern flowchart editor built with Vue 3 and Element Plus, featuring drag-and-drop functionality, intelligent connections, and rich interactive features.

基于 Vue 3 和 Element Plus 构建的现代化流程图编辑器，提供拖拽式操作、智能连线和丰富的交互功能。

![Flowchart Editor Screenshot](screenshot.png) <!-- 替换为实际截图 -->

## Features / 功能特性

### Core Functionality / 核心功能

- 🖱️ **Drag-and-drop node creation** / 拖拽式节点创建
- ➰ **Smart connections** (right-click nodes to create links) / 智能连线（右键点击节点创建连接）
- 🎨 **Multiple connection styles** (curve and mindmap) / 多种连线样式（曲线和脑图折线）
- ☑️ **Multi-select operations** / 多选操作
- 📏 **Alignment guides** (automatically shown when moving nodes) / 对齐辅助线（移动节点时自动显示）

### Interactive Features / 交互功能

- 🖱️ **Canvas panning** (hold Space or middle mouse button) / 画布平移（按住空格键或鼠标中键）
- 🔍 **Zoom control** (mouse wheel or buttons) / 缩放控制（鼠标滚轮或按钮）
- ↕️ **Node resizing** (with aspect ratio locking) / 节点大小调整（支持锁定比例）
- 🗂️ **Layer management** (quick node selection) / 图层管理（快速选择节点）

### Editing Tools / 编辑工具

- ↩️ **Undo/Redo** (full operation history) / 撤销/重做（完整操作历史）
- ✂️ **Copy/Paste** nodes / 复制/粘贴节点
- 🗑️ **Delete** nodes and connections / 删除节点和连线
- ✏️ **Property editing** (node names and canvas dimensions) / 属性编辑（节点名称和画布尺寸）

## Technology Stack / 技术栈

- **Frontend Framework**: Vue 3 / 前端框架：Vue 3
- **UI Library**: Element Plus / UI组件库：Element Plus
- **State Management**: Vue Reactivity System / 状态管理：Vue响应式系统
- **Drag Interaction**: HTML5 Drag and Drop API / 拖拽交互：HTML5拖放API
- **Vector Graphics**: SVG / 矢量图形：SVG



### 组件使用方法

```vue
<template>
  <div style="background-color: #F1F1F1;height: 100vh;">
    <CflowEditorLoader @getcanvasSize="getcanvasSize" @getConnectionsValue="getConnectionsValue" @saveNodes='saveNodes'
      @getNodesValue="getNodesValue" :node-types="nodeTypes" :bg="logo" isConnectionType>

    </CflowEditorLoader>
    <Cdialog width="800" ref="CdialogRef">
      <div style="width: 100%;height: 100%;overflow: auto;">
        <FlowPview :bg="a" :connections="connections" :nodesValue="nodes"></FlowPview>
      </div>
    </Cdialog>
  </div>
</template>
<script lang="ts" setup>
import logo from './logo.png'
import CflowEditorLoader from '../components/CflowEditorLoader.vue'
import FlowPview from '../components/FlowPview.vue'
import Cdialog from '../components/Cdialog/Cdialog.vue'
import { ref } from 'vue'
const CdialogRef = ref()
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
// 开始预览
const saveNodes = (e) => {
  console.log(CdialogRef.value);

  CdialogRef.value.show('预览')
}

</script>

<style lang="scss" scoped></style>
```

### 有需要源码可以联系我，qq：1476466395



