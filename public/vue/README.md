## 使用cyf-flow

## 1.安装

```js
npm i cyf-flow
```

## 2.在vue中引入

```js

import cyfFlow from 'cyf-flow'
import 'cyf-flow/dist/index.css'
const app = createApp(App)
app.use(cyfFlow)
```

## 3.api介绍

```ts
type Props = {
  bg: string //背景图片
  isConnectionType: boolean //是否开启连线
  nodeTypes: NodeType[] //节点类型
  width: number//画布宽度
  height: number//画布高度
  connections: any[] //连接线数据
  isShowConfig:boolean //是否显示配置面板
  nodesValue: {//节点数据
    type: Array
    default: () => []
  }
}
type Emit = {
    editNode:()=>void// 双击节点
    handleDragMove:()=>void//节点移动的时候触发
    getcanvasSize:()=>void//获取画布大小
    getConnectionsValue:()=>void//获取连线数据
    getNodesValue:()=>void//获取nodes节点数据
}
//通过ref调用比如 CflowEditorLoaderRef.value.setNodesConfig(id,key,value)
type DefineExpose = {
    startDrag:(event,node)=>void, //将节点放置在画布上
    setNodesConfig:(id,key,value)=>void//设置节点的里面的值
    getNodesConfig:(id)=>Node //根据id获取节点
}

```

## 4.api使用示例

```ts
const nodeTypes =[
     {
        type: "start",
        label: "节点",
        width: 50,
        height: 50,
        color: "green"
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
]
//这里主要是通过回显节点
const nodesValue = [
    {
      id: "node-1755669869169",
      type: "slot",
      label: "自定义",
      width: 50,
      height: 50,
      color: "#000",
      slotName: "slotName",
      x: 221.828125,
      y: 172.796875,
      obj: {},
    },
  ];
//这里主要是通过回显连线
const connections = [
    {
      id: "conn-1755670065311",
      source: "node-1755670062977",
      target: "node-1755670063769",
    },
  ];
```

