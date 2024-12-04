<template>
  <var-style-provider class="h-full w-full">
    <router-view></router-view>
  </var-style-provider>
</template>

<script setup lang="tsx">
import { ThemeManager } from "store/theme.ts";
const themeStore = ThemeManager()
themeStore.toggleTheme('darkTheme')
import { useChainId, useConnect } from '@wagmi/vue'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'
const chainId = useChainId()
const { connect, connectors, error, status } = useConnect()
connect({ connector: metaMask() });

</script>

<style scoped lang="scss">
.content {
  height: calc(100% - 54px);
}
:deep(.var-tabs__indicator){
  display: none;
}
:deep(.var-tabs__tab-wrap){
  @apply space-x-3;
}
:deep(.var-tabs){
  height: 48px;
  padding: 0;
  @apply space-x-2;
}
:deep(.var-tab){
  padding: 0;
}
</style>
