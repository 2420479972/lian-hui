<template>
  <div class="h-full w-full flex flex-col">
    <nav class="w-full bg-[#121214] border-b border-[#333335] flex items-center justify-between px-4 py-2 z-40">
      <div class="flex items-center gap-4">
        <i class="fas fa-bars text-primary cursor-pointer hover:text-[#00F5FF] transition-colors" @click="showMenu = true"></i>
        <i class="fas fa-link text-primary"></i>
        <span class="text-[#666668] text-sm">0x7A...3F9B</span>
      </div>
      <div class="flex items-center gap-4">
        <LanguageSwitcher />
        <i class="fas fa-share-nodes text-primary"></i>
      </div>
    </nav>
    <main class="flex-1 w-full overflow-y-auto overflow-x-hidden">
      <RouterView></RouterView>
    </main>
  </div>
  <Menu v-model="showMenu" @close="showMenu = false"></Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import Tabs from '@/components/Tabs.vue';
import Menu from "@/components/Menu.vue";

// 控制菜单显示状态
const showMenu = ref(false);
</script>

<style lang="scss" scoped>

</style>
