<template>
  <main class="p-4">
    <!-- 社区中心轮播图 -->
    <div class="relative mb-8 rounded-xl overflow-hidden h-48 neon-border">
      <img src="https://ai-public.mastergo.com/ai/img_res/2b778a8699dffb737c3aae21eca7eedf.jpg"
           alt="社区中心"
           class="w-full h-full object-cover object-center">
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h2 class="text-xl font-bold neon-text">共享·共创·共赢</h2>
        <p class="text-sm text-gray-300">加入我们的数字社区，开启未来之旅</p>
      </div>
    </div>
    <!-- 发布项目表单 -->
    <div class="glass-effect rounded-xl p-6 mb-6 neon-border">
      <h2 class="text-lg font-semibold mb-6 flex items-center text-white">
        <i class="fas fa-rocket text-primary mr-2"></i>
        <span>发布项目</span>
      </h2>
      <div class="space-y-4">
        <!-- 项目logo -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-image"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="项目logo"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 项目简介 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="项目简介"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 空投总量 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-coins"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="空投总量"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 空投地址 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-wallet"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="空投地址"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 空投合约 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-file-contract"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="空投合约"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 代币名称 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-tag"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="代币名称"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 发布时间 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div class="flex-1 flex items-center">
            <input type="text"
                   placeholder="发布时间"
                   class="flex-1 bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
            <button @click="showStartDataPiker = true" class="ml-2 bg-darkLight px-3 py-2 rounded-md text-sm text-white hover:bg-opacity-80 transition">
              <i class="fas fa-calendar-day"></i>
            </button>
          </div>
        </div>
        <!-- 结束时间 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-clock"></i>
          </div>
          <div class="flex-1 flex items-center">
            <input type="text"
                   placeholder="结束时间"
                   class="flex-1 bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
            <button @click="showEndDataPiker = true" class="ml-2 bg-darkLight px-3 py-2 rounded-md text-sm text-white hover:bg-opacity-80 transition">
              <i class="fas fa-calendar-day"></i>
            </button>
          </div>
        </div>
        <!-- 空投1份 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-gift"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="空投1份"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 流动性池 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="流动性池 (USDT)"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 预估价格 -->
        <div class="flex items-center">
          <div class="input-icon text-primary mr-3">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="flex-1">
            <input type="text"
                   placeholder="预估价格 ($)"
                   class="w-full bg-dark border border-primary/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm">
          </div>
        </div>
        <!-- 发布价格 -->
        <div class="flex items-center justify-between bg-darkLight rounded-md px-4 py-3 neon-border">
          <div class="flex items-center">
            <div class="input-icon text-primary mr-3">
              <i class="fas fa-money-bill-wave"></i>
            </div>
            <span class="text-white">发布价格</span>
          </div>
          <div class="text-xl font-bold neon-text">$50.98</div>
        </div>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="glass-effect rounded-xl p-6 shadow-md">
      <button class="w-full gradient-bg text-white font-bold py-3 rounded-md hover:opacity-90 transition duration-200 !rounded-button neon-border">
        提交项目
      </button>
    </div>
  </main>
  <DatePiker v-model:show="showStartDataPiker" v-model="startTime"></DatePiker>
  <DatePiker v-model:show="showEndDataPiker"></DatePiker>
</template>

<script setup lang="ts">
import DatePiker from "views/release-airdrop/DatePiker.vue";

const showStartDataPiker = ref(false);
const showEndDataPiker = ref(false);


const startTime = ref('2025-04-15')

</script>

<style lang="scss" scoped>
.glass-effect {
  background: rgba(18, 18, 20, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.1);
}
.neon-text {
  text-shadow: 0 0 5px #00F0FF, 0 0 10px #00F0FF;
}
.neon-border {
  box-shadow: 0 0 10px #00F0FF, 0 0 20px rgba(0, 240, 255, 0.3);
}
.gradient-bg {
  background: linear-gradient(135deg, #00F0FF 0%, #FF3366 100%);
}
.input-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
}
</style>
