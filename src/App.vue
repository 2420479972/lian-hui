<template>
  <var-style-provider class="h-full w-full">
    <router-view></router-view>
  </var-style-provider>
</template>

<script setup lang="tsx">
import {ThemeManager} from "store/theme.ts";
const themeStore = ThemeManager()
themeStore.toggleTheme('darkTheme')
</script>

<style scoped lang="scss">
.content {
  height: calc(100% - 54px);
}
</style>
