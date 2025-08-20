<template>
  <div class="top">
    <div class="top-nav">
      <div @click="setApi">api文档</div>
    </div>
  </div>
  <div class="home">
    <div class="left">
      <div
        @click="handleClick(item)"
        v-for="(item, index) in HomeList"
        class="left_list"
        :class="item.id === id ? 'active' : ''"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content">
      <!-- 渲染组件 -->
      <component v-if="codeValue" :is="component"></component>
    </div>
    <div class="right">
      <Code v-if="codeValue" :codeValue="codeValue"></Code>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Code from "../components/Code.vue";
import {useRouter} from 'vue-router'
import Home, { HomeViewItem } from "../views/home.ts";
import apiText from './apiTextMd.vue'
const HomeList: HomeViewItem[] = Home;
const router = useRouter()
const component = ref(HomeList[0].component);
const codeValue = ref(HomeList[0].code);
const id = ref(HomeList[0].id);
const handleClick = (item: HomeViewItem) => {
  component.value = item.component;
  id.value = item.id;
  codeValue.value = "";
  setTimeout(() => {
    codeValue.value = item.code;
  });
};
const setApi = ()=>{
    window.open(router.resolve({name: 'apiTextMd'}).href)
}

</script>

<style scoped lang="scss">
.top {
  height: 5vh;
  padding: 0 10px;
  padding-top: 10px;
  background-color: #dbdbdb;
  .top-nav {
    color: #000;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    >div {
        padding: 0 30px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
    }
    >div:hover {
        color: #51BDFC;

    }
  }
}
.home {
  width: 100vw;
  height: 95vh;
  display: flex;
  padding: 10px;
  align-items: center;
  background-color: #dbdbdb;
  .left {
    flex: 1.4;
    height: 99%;
    overflow: auto;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    .left_list {
      //   width: 200px;
      //   height: 200px;
      background-color: rgb(70, 240, 189);
      text-align: center;
      padding: 10px 0;
      color: #fff;
      border-radius: 5px;
      margin: 10px 30px;
      cursor: pointer;
    }
    // 优化滚动条
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 100px;
    }
  }
  .content {
    flex: 5;
    height: 99%;
    overflow: hidden;
    margin: 0 10px;
    display: flex;
  }
  .right {
    flex: 2;
    height: 99%;
    overflow: auto;
    // 去掉滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.active {
  background-color: #51bdfc !important;
}
::v-deep(.node-palette),
::v-deep(.config-panel),
::v-deep(.flow-canvas-container),
::v-deep(pre) {
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 0 !important;
}
::v-deep(.flow-canvas-container) {
  margin: 0 0px !important;
}
::v-deep(pre) {
  padding: 2em !important;
}
::v-deep(.config-panel) {
  padding: 10px !important;
}
</style>
