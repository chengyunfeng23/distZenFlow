# 联系作者:qq1476466395(MEISNULL) 
![图片描述](/vue/wx2.jpg)

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
//node里面的x y width height 一定要是数字 number类型
type Props = {
  bg: string //背景图片
  isConnectionType: boolean //是否开启连线
  nodeTypes: NodeType[] //节点类型
  canvasSize: {
    width: number
    height: number
  }//画布的宽高
  connections: any[] //连接线数据
  isShowConfig:boolean //是否显示配置面板
  isCzsm: boolean//是否显示操作说明
  isRightConfig: boolean//是否显示右侧配置面板（自定义--选择单独节点后显示自定义配置面板）
  nodesValue: {//节点数据
    type: Array
    default: () => []
  }
}
type Emit = {
    delNodes:()=>void//删除节点触发
    editNode:()=>void// 双击节点
    handleDragMove:()=>void//节点移动的时候触发
    getcanvasSize:()=>void//获取画布大小
    getConnectionsValue:()=>void//获取连线数据
    getNodesValue:()=>void//获取nodes节点数据
    copyNode:()=>void//复制节点触发
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


