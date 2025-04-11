<template>
  <div class="h-full w-full flex flex-col">
    <nav class="w-full bg-[#121214] border-b border-[#333335] flex items-center justify-between px-4 py-2 z-40">
      <div class="flex items-center gap-4">
        <i class="fas fa-bars text-primary cursor-pointer hover:text-[#00F5FF] transition-colors" @click="showMenu = true"></i>
        <span class="text-[#666668] text-sm">{{formatAddress(address)}}</span>
      </div>
      <div class="flex items-center gap-4">
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
import Menu from "@/components/Menu.vue";
import { useAccount } from '@wagmi/vue'
import {formatAddress} from "utils/format-address.ts";

const { address } = useAccount();

// 控制菜单显示状态
const showMenu = ref(false);
</script>

<style lang="scss" scoped>

</style>
