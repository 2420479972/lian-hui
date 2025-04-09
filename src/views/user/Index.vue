<template>
  <main class="p-4">
    <!-- 用户信息卡片 -->
    <div class="bg-gray-900 rounded-lg p-4 mb-4">
      <div class="flex items-start mb-3">
        <div class="relative mr-3">
          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <i class="fas fa-seedling text-white text-2xl"></i>
          </div>
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            当前等级: 种子会员
          </div>
          <div class="flex items-center text-xs text-gray-400 mt-1">
            <i class="fas fa-users mr-1"></i>
            团队人数: 15个
          </div>
        </div>
      </div>
      <div class="space-y-2 text-xs">
        <div class="flex items-center justify-between bg-gray-800 rounded px-3 py-2">
          <div class="text-gray-300 truncate">推广地址: https://mastergo.com/file/15595327721968</div>
          <button class="text-primary">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="flex items-center justify-between bg-gray-800 rounded px-3 py-2">
          <div class="text-gray-300">上级地址: 0x7a3...d4f</div>
          <button class="text-primary">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="flex items-center justify-between bg-gray-800 rounded px-3 py-2">
          <div class="text-gray-300">下级地址: 0x9b2...e5c</div>
          <button class="text-primary">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- 功能跳转模块 -->
    <div class="grid grid-cols-4 gap-3 mb-4">
      <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF69B4] flex items-center justify-center mb-1">
          <i class="fas fa-handshake text-white"></i>
        </div>
        <div class="text-xs text-white">合作申请</div>
      </button>
      <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-1">
          <i class="fas fa-users text-white"></i>
        </div>
        <div class="text-xs text-white">社区申请</div>
      </button>
      <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-1">
          <i class="fas fa-coins text-white"></i>
        </div>
        <div class="text-xs text-white">质押取现</div>
      </button>
      <div class="relative">
        <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center w-full">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-1">
            <i class="fas fa-globe text-white"></i>
          </div>
          <div class="text-xs text-white">创世中心</div>
        </button>
        <button class="absolute top-0 right-0 p-1 text-gray-400" onclick="document.getElementById('genesis-notice').classList.remove('hidden')">
          <i class="fas fa-bell"></i>
        </button>
      </div>
      <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-1">
          <i class="fas fa-parachute-box text-white"></i>
        </div>
        <div class="text-xs text-white">空投赎回</div>
      </button>

      <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-1">
          <i class="fab fa-telegram text-white"></i>
        </div>
        <div class="text-xs text-white">电报</div>
      </button>
      <button class="bg-gray-900 rounded-lg p-3 flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-1">
          <i class="fab fa-twitter text-white"></i>
        </div>
        <div class="text-xs text-white">推特</div>
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">


import MakeTip from "views/user/MakeTip.vue";
</script>

<style lang="scss" scoped>
body {
  background-color: #000;
  color: #fff;
  font-family: 'Inter', sans-serif;
}
.menu-icon, .action-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab-item {
  padding: 8px 12px;
}
.tab-item.active {
  color: #00FFFF;
  border-bottom: 2px solid #00FFFF;
}
.progress-bar {
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
}
.progress-fill {
  height: 100%;
  background-color: #00FFFF;
  width: 65%;
}
.record-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

