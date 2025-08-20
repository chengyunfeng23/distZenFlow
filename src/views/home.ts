
import DefaultComponents from './DefaultComponents.vue'
import CustomizeDragAndDropNodesOnTheRight from './CustomizeDragAndDropNodesOnTheRight.vue'
import Html from './Html.vue'
export type HomeViewItem = {
    name:string,
    id:string,
    code:string,
    component:()=>any
}
const gitName = 'distZenFlow'

export default [
    {
        id:'DefaultComponents',
        name:'默认组件',
        code:`vue/DefaultComponents.vue`,
        component:DefaultComponents
    },
    {
        id:'CustomizeDragAndDropNodesOnTheRight',
        name:'自定义右边拖拽节点',
        code:`vue/CustomizeDragAndDropNodesOnTheRight.vue`,
        component:CustomizeDragAndDropNodesOnTheRight
    },
    {
        id:'Html',
        name:'自定义画布的节点样式',
        code:`vue/Html.vue`,
        component:Html
    }
]