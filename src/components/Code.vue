<template>
  <prism v-if="code" style="height: 99%" language="javascript">{{
    code
  }}</prism>
</template>

<script setup lang="ts">
import Prism from "vue-prism-component";

import "prismjs/themes/prism-tomorrow.css";
import { ref, watch } from "vue";
type Props = {
  codeValue: string;
};
const props = defineProps<Props>();
const code = ref(``);

// 根据环境解析路径：
// - 开发环境：保持传入的绝对路径（如 /src/views/DefaultComponents.vue）
// - 生产环境：自动在开头加上仓库路径（BASE_URL 或从 location.pathname 推断）
const resolveCodePath = (inputPath: string): string => {
  if (!inputPath) return inputPath;
  // 非以 / 开头的直接返回（相对路径）
  if (!inputPath.startsWith("/")) return inputPath;

  // 开发环境直接用原始路径
  if (import.meta.env.DEV) return inputPath;

  // 优先使用 Vite 的 BASE_URL（例如 /repoName/ 或 ./）
  const base = import.meta.env.BASE_URL || "/";
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base; // 去除末尾斜杠

  // 如果 BASE_URL 是有效的以 / 开头的路径（如 /repoName）则直接拼接
  if (trimmedBase && trimmedBase !== "." && trimmedBase !== "/" && trimmedBase.startsWith("/")) {
    return `${trimmedBase}${inputPath}`;
  }

  // 否则尝试从 GitHub Pages 的路径中推断仓库名：/repoName/xxx
  const segments = window.location.pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const repo = `/${segments[0]}`; // 取第一段作为仓库名
    return `${repo}${inputPath}`;
  }

  // 兜底：返回原始路径
  return inputPath;
};

//props.codeValue返回的是整个vue组件文件，我现在想要解析这个组件直接赋值给code
//这样就可以直接显示代码了
const initCode = async () => {
  try {
    const resolved = resolveCodePath(props.codeValue);
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
