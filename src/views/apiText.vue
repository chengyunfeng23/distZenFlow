<template>
  <div class="markdown-container">
    <!-- 侧边栏目录 -->
    <div class="sidebar">
      <div class="toc-header">目录</div>
      <div class="toc-content">
        <div
          v-for="(item, index) in tocItems"
          :key="index"
          class="toc-item"
          :class="{
            'toc-h1': item.level === 1,
            'toc-h2': item.level === 2,
            'toc-h3': item.level === 3,
            'toc-h4': item.level === 4,
            'toc-h5': item.level === 5,
            'toc-h6': item.level === 6,
          }"
          @click="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="markdown-preview">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading">加载中...</div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="error">{{ error }}</div>

      <!-- Markdown 渲染结果 -->
      <div
        v-else
        class="content"
        v-html="renderedMarkdown"
        ref="contentRef"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
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
  if (
    trimmedBase &&
    trimmedBase !== "." &&
    trimmedBase !== "/" &&
    trimmedBase.startsWith("/")
  ) {
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
// 配置 marked 使用 highlight.js 高亮代码
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

// 接收外部传入的 Markdown 文件路径
const props = defineProps<{
  mdFilePath: string;
}>();

const loading = ref(true);
const error = ref("");
const renderedMarkdown = ref("");
const contentRef = ref<HTMLElement>();
const tocItems = ref<Array<{ id: string; text: string; level: number }>>([]);

// 提取目录项
const extractToc = (htmlContent: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const toc: Array<{ id: string; text: string; level: number }> = [];

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent || "";
    const id = `heading-${index}`;

    // 为标题添加 id 属性
    heading.id = id;

    toc.push({ id, text, level });
  });

  // 更新 HTML 内容（包含 id）
  renderedMarkdown.value = tempDiv.innerHTML;
  tocItems.value = toc;

  // 等待 DOM 更新后重新应用代码高亮
  nextTick(() => {
    if (contentRef.value) {
      const codeBlocks = contentRef.value.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        if (block.textContent) {
          hljs.highlightElement(block as HTMLElement);
        }
      });
    }
  });
};

// 滚动到指定标题
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// 加载并渲染 Markdown 文件
const loadAndRenderMarkdown = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await fetch(`${props.mdFilePath}?raw`);

    if (!response.ok) {
      throw new Error(`无法加载文件: ${response.statusText}`);
    }

    const mdContent = await response.text();
    const htmlContent = marked.parse(mdContent);

    // 等待 DOM 更新后提取目录
    await nextTick();
    extractToc(htmlContent);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "加载失败";
    console.error("Markdown 加载错误:", err);
  } finally {
    loading.value = false;
  }
};

// 组件挂载时加载
onMounted(() => {
  loadAndRenderMarkdown();
});
</script>

<style>
.markdown-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  height: fit-content;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.toc-header {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.toc-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-item {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  line-height: 1.4;
}

.toc-item:hover {
  background: #e9ecef;
  color: #007bff;
}

.toc-h1 {
  font-weight: 600;
  color: #333;
  padding-left: 12px;
}

.toc-h2 {
  font-weight: 500;
  color: #555;
  padding-left: 24px;
}

.toc-h3 {
  font-weight: 400;
  color: #666;
  padding-left: 36px;
}

.toc-h4 {
  font-weight: 400;
  color: #777;
  padding-left: 48px;
}

.toc-h5 {
  font-weight: 400;
  color: #888;
  padding-left: 60px;
}

.toc-h6 {
  font-weight: 400;
  color: #999;
  padding-left: 72px;
}

.markdown-preview {
  flex: 1;
  min-width: 0;
}

.loading,
.error {
  text-align: center;
  padding: 40px 0;
}

.error {
  color: #ff4d4f;
}

.content {
  line-height: 1.8;
}

/* 为 Markdown 内容添加基础样式 */
.content h1,
.content h2,
.content h3 {
  margin: 1.5em 0 1em;
  font-weight: 600;
  scroll-margin-top: 20px;
}

.content p {
  margin-bottom: 1em;
}

.content ul,
.content ol {
  margin: 1em 0;
  padding-left: 2em;
}

/* 代码块样式 */
.content pre {
  background: #1e1e1e;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1em 0;
  border: 1px solid #333;
}

.content pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: #d4d4d4;
  font-family: "Fira Code", "Consolas", "Monaco", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* 行内代码样式 */
.content code:not(pre code) {
  background: #f1f3f4;
  color: #d73a49;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: "Fira Code", "Consolas", "Monaco", "Courier New", monospace;
  font-size: 0.9em;
  border: 1px solid #e1e4e8;
}

/* Highlight.js 语法高亮样式增强 */
.content pre code.hljs {
  background: transparent !important;
  padding: 0 !important;
}

.content pre .hljs-keyword {
  color: #569cd6 !important;
}

.content pre .hljs-string {
  color: #ce9178 !important;
}

.content pre .hljs-comment {
  color: #6a9955 !important;
  font-style: italic;
}

.content pre .hljs-number {
  color: #b5cea8 !important;
}

.content pre .hljs-function {
  color: #dcdcaa !important;
}

.content pre .hljs-class {
  color: #4ec9b0 !important;
}

.content pre .hljs-variable {
  color: #9cdcfe !important;
}

.content pre .hljs-operator {
  color: #d4d4d4 !important;
}

.content pre .hljs-punctuation {
  color: #d4d4d4 !important;
}

.content pre .hljs-property {
  color: #9cdcfe !important;
}

.content pre .hljs-title {
  color: #dcdcaa !important;
}

.content pre .hljs-params {
  color: #9cdcfe !important;
}

.content pre .hljs-built_in {
  color: #4ec9b0 !important;
}

.content pre .hljs-literal {
  color: #569cd6 !important;
}

.content pre .hljs-type {
  color: #4ec9b0 !important;
}

.content pre .hljs-tag {
  color: #569cd6 !important;
}

.content pre .hljs-attr {
  color: #9cdcfe !important;
}

.content pre .hljs-selector {
  color: #d7ba7d !important;
}

.content pre .hljs-selector-id {
  color: #d7ba7d !important;
}

.content pre .hljs-selector-class {
  color: #d7ba7d !important;
}

.content blockquote {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin: 1em 0;
  color: #666;
  background: #f8f9fa;
  padding: 1em;
  border-radius: 0 6px 6px 0;
}

.content img {
  max-width: 100%;
  border-radius: 4px;
}

/* 表格样式 */
.content table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.content th,
.content td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

.content th {
  background: #f8f9fa;
  font-weight: 600;
}

.content tr:nth-child(even) {
  background: #f8f9fa;
}

/* 链接样式 */
.content a {
  color: #0366d6;
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

/* 水平线样式 */
.content hr {
  border: none;
  border-top: 1px solid #e1e4e8;
  margin: 2em 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-container {
    flex-direction: column;
    padding: 10px;
  }

  .sidebar {
    width: 100%;
    position: static;
    max-height: none;
  }

  .toc-h1 {
    padding-left: 8px;
  }
  .toc-h2 {
    padding-left: 16px;
  }
  .toc-h3 {
    padding-left: 24px;
  }
  .toc-h4 {
    padding-left: 32px;
  }
  .toc-h5 {
    padding-left: 40px;
  }
  .toc-h6 {
    padding-left: 48px;
  }
}
</style>
