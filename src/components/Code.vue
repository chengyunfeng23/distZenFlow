<template>
  <prism v-if="code" style="height: 99%" language="javascript">{{
    code
  }}</prism>
</template>

<script setup lang="ts">
import Prism from "vue-prism-component";
import resolveCodePath from '../ulits/app'
import "prismjs/themes/prism-tomorrow.css";
import { ref, watch } from "vue";
type Props = {
  codeValue: string;
};
const props = defineProps<Props>();
const code = ref(``);



//props.codeValue返回的是整个vue组件文件，我现在想要解析这个组件直接赋值给code
//这样就可以直接显示代码了
const initCode = async () => {
  try {
    const resolved =resolveCodePath(props.codeValue)
    console.log(resolved);
    
    const response = await fetch(resolved + "?raw");
    if (!response.ok) throw new Error("文件不存在");
    const componentSource = await response.text(); // 直接获取文件内容字符串
    const formattedBasic = componentSource
      .replace(/\\n/g, "\n") // 替换换行符转义
      .replace(/\\"/g, '"'); // 处理可能的引号转义（如果有的话）

    let processed = formattedBasic // 移除开头的 export default "
      // 第一步：先移除所有转义的\r（\\r）
      .replace(/\\r/g, "")
      // 第二步：移除所有实际的\r字符
      .replace(/\r/g, "")
      .replace(/^export default "/, '')
      // 第三步：处理其他转义符和包装
      .replace(/^export default "["“]/, "") // 处理开头的包装（包含全角引号）
      .replace(/["”]$/, "") // 处理结尾的引号（包含全角引号）
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"');

    const styleEndIndex = processed.indexOf("</style>");

    // 如果找到</style>标签，只保留到标签结束
    if (styleEndIndex !== -1) {
      code.value = processed.substring(0, styleEndIndex + "</style>".length);
      
    }
  } catch (error) {
    console.error("获取失败:", error);
  }
};
initCode();
watch(
  () => props.codeValue,
  () => {
    initCode();
  }
);
</script>
