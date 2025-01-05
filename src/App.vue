<template>
  <var-style-provider class="h-full w-full">
    <router-view></router-view>
  </var-style-provider>
</template>

<script setup lang="tsx">
import {ThemeManager} from "store/theme.ts";
import {useChainId, useConnect} from '@wagmi/vue'
import {metaMask} from '@wagmi/vue/connectors'
const themeStore = ThemeManager()
themeStore.toggleTheme('darkTheme')

const chainId = useChainId()
const {connect, connectors, error, status} = useConnect()
connect({connector: metaMask()});

</script>

<style  lang="scss">
.content {
  height: calc(100% - 54px);
}

:deep(.var-tabs__indicator) {
  display: none;
}
input::placeholder{
  color: var(--member-pop-text) !important;
}
textarea::placeholder{
  color: var(--member-pop-text) !important;
}

:deep(.var-tabs__tab-wrap) {
  @apply space-x-3;
}

:deep(.var-tabs) {
  height: 48px;
  padding: 0;
  @apply space-x-2;
}

:deep(.var-tab) {
  padding: 0;
}

/* 滚动条轨道 */
*::-webkit-scrollbar-track {
  background: var(--scrollbar-color-track); /* 轨道背景色 */
  border-radius: 4px; /* 轨道圆角 */
}

/* 滚动条滑块 */
*::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color-thumb); /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
  border: 2px solid var(--scrollbar-color-track); /* 滑块边框，使其看起来更小 */
}

/* 整体滚动条 */
*::-webkit-scrollbar {
  width: 6px; /* 滚动条宽度 */
  height: 37px; /* 横向滚动条高度 */
  background: var(--scrollbar-color-track);
  opacity: 0.1;
}
</style>
