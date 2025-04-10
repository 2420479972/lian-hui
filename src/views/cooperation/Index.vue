<template>
  <main class="p-4">
    <div class="rounded-lg overflow-hidden mb-6 relative">
      <img src="https://ai-public.mastergo.com/ai/img_res/39b73e8b230b03ec7209e8f6dcb71035.jpg"
           class="w-full h-[200px] object-cover" alt="banner">
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h1 class="text-2xl font-bold mb-2">共享共创共赢</h1>
        <p class="text-sm text-gray-200">加入我们的数字社区，开启未来之旅</p>
      </div>
    </div>
    <div class="w-full">
      <div class="flex items-center gap-2 mb-6">
        <i class="fas fa-rocket text-primary"></i>
        <h2 class="text-xl font-bold gradient-text">申请合作</h2>
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3 mb-4">
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="exchange">
            <i class="fas fa-exchange-alt text-gray-400"></i>
            <span>交易类</span>
          </button>
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="tools">
            <i class="fas fa-tools text-gray-400"></i>
            <span>工具类</span>
          </button>
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="game">
            <i class="fas fa-gamepad text-gray-400"></i>
            <span>游戏类</span>
          </button>
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="store">
            <i class="fas fa-store text-gray-400"></i>
            <span>商城类</span>
          </button>
        </div>
        <div class="space-y-4">
          <div class="relative">
            <input type="text" placeholder="应用名称" class="neon-input w-full rounded p-3 pl-10">
            <i class="fas fa-cube absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" placeholder="联系方式" class="neon-input w-full rounded p-3 pl-10">
            <i class="fab fa-telegram absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" placeholder="注册地址 (https://...)" class="neon-input w-full rounded p-3 pl-10">
            <i class="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" placeholder="连接地址" class="neon-input w-full rounded p-3 pl-10">
            <i class="fas fa-globe absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" placeholder="支付赏金 (USDT)" class="neon-input w-full rounded p-3 pl-10 pr-10">
            <i class="fas fa-coins absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-primary" @click="showModal = true">
              <i class="fas fa-calculator"></i>
            </button>
          </div>
          <div class="relative">
            <input type="file" class="hidden" id="logo-upload">
            <label for="logo-upload" class="neon-input w-full rounded p-3 pl-10 block cursor-pointer">
              <i class="fas fa-image absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <span class="text-gray-400">上传应用 Logo</span>
            </label>
          </div>
          <div class="flex justify-between items-center neon-input rounded p-3">
            <span>合作支付</span>
            <span class="text-primary font-bold">$12.00</span>
          </div>
          <div class="mt-4 neon-input rounded p-4 cursor-pointer" @click="showTip = !showTip">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <i class="fas fa-exclamation-circle text-primary"></i>
                <span class="text-sm">申请合作注意事项</span>
              </div>
              <i class="fas fa-chevron-down text-primary transition-transform duration-200" id="notice-icon"></i>
            </div>
            <div class="mt-3" v-show="showTip">
              <ul class="list-disc pl-5 space-y-1 text-xs text-gray-300">
                <li>上传应用必须正规合法</li>
                <li>需在社区提供相关证件及合法性证明</li>
                <li>审核不通过费用不予退还</li>
                <li>官方社区见主页官方推特群与TG群</li>
                <li>审核问题请联系客服</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="w-full mt-6 py-4 rounded-button bg-gradient-to-r from-primary via-secondary to-primary text-white font-bold animate-gradient-x">
        提交申请
      </button>
    </div>
  </main>
  <Modal title="赏金猎人" v-model="showModal">
    <div class="space-y-4">
      <div class="relative">
        <input type="number" placeholder="地址数量" class="neon-input w-full rounded p-3" id="address-count">
      </div>
      <div class="relative">
        <input type="number" placeholder="单个赏金 (USDT)" class="neon-input w-full rounded p-3" id="single-bounty">
      </div>
      <button id="calculate-bounty" class="w-full py-3 rounded-button bg-gradient-to-r from-primary via-secondary to-primary text-white font-bold">
        确认计算
      </button>
      <p class="text-xs text-gray-400 text-center">注意：赏金不予退还</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";


const showTip = ref(false);
const showModal = ref(false);
</script>

<style lang="scss" scoped>
.neon-card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}
.neon-input {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 229, 255, 0.3);
  color: white;
}
.gradient-text {
  background: linear-gradient(90deg, #00E5FF, #FF1493);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
