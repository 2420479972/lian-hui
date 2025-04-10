<template>
  <main class="p-4">
    <div class="mb-6 rounded-lg overflow-hidden">
      <img src="https://ai-public.mastergo.com/ai/img_res/6b333193e8a9859a366f045f0f9b83ba.jpg" class="w-full h-[200px] object-cover" alt="Banner">
    </div>
    <div class="w-full">
      <div class="text-center mb-4 relative">
        <div class="text-2xl font-bold text-primary animate-pulse" id="tradingAmount">￥5,000</div>
        <div class="text-sm text-gray-400 mb-2">24小时交易金额</div>
        <div class="h-2 rounded-full overflow-hidden relative">
          <div class="absolute top-0 left-0 h-full w-full animate-[progress_3s_ease-in-out_infinite]" style="background: linear-gradient(90deg, #00F0FF 0%, #FF3366 100%);"></div>
        </div>
      </div>
      <div class="glass-effect rounded-lg p-4 mb-6">
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-400">质押金额 (USDT)</span>
            <span class="text-xs text-secondary">质押≥100USDT领取空投</span>
          </div>
          <div class="relative flex items-center">
            <input type="text" value="80" class="w-full bg-transparent border border-primary/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="输入质押金额 (USDT)">
            <button @click="showTip = true" class="absolute right-3 text-primary">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
        <button class="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium !rounded-button relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/30">
          <span class="relative z-10">立即质押</span>
        </button>
      </div>
    </div>
    <div class="w-full">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium">质押记录</h2>
        <button class="text-primary text-sm" @click="showAll = true">查看全部</button>
      </div>
      <div class="relative max-h-[300px] overflow-hidden">
          <vue3ScrollSeamless :classOptions="{
            step:0.5,
            limitMoveNum:10
          }" :dataList="list">
            <template v-for="item in list">
              <div class="flex items-center justify-between py-2 border-b border-primary/20">
                <div class="text-sm">
                  <span class="text-primary">质押</span>
                  <div class="text-gray-400">0x8F...2E1B</div>
                </div>
                <div class="text-right">
                  <div class="text-white">500 USDT</div>
                  <div class="text-xs text-gray-400">2025.03.24 08:16</div>
                </div>
              </div>
              <div class="flex items-center justify-between py-2 border-b border-primary/20">
                <div class="text-sm">
                  <span class="text-secondary">取现</span>
                  <div class="text-gray-400">0x3A...9C4D</div>
                </div>
                <div class="text-right">
                  <div class="text-white">300 USDT</div>
                  <div class="text-xs text-gray-400">2025.03.24 07:45</div>
                </div>
              </div>
            </template>
          </vue3ScrollSeamless>

      </div>
    </div>
  </main>
  <Modal title="质押规则说明" v-model="showTip">
        <ol class="list-decimal pl-5 space-y-2 text-sm">
          <li class="text-gray-300">所有等级会员质押与取现为固定的数量</li>
          <li class="text-gray-300">参与质押才能领取空投</li>
          <li class="text-gray-300">取现之后不再享有奖励佣金与空投权益</li>
          <li class="text-gray-300">质押数值有固定周期</li>
          <li class="text-gray-300">周期是循环执行7天开放24小时，不到期无法取现</li>
        </ol>
      <div class="text-xs text-secondary mt-4">
        <p>请关注，选择好以免误操作。</p>
      </div>
  </Modal>
  <Modal title="全部质押记录" v-model="showAll">
    <template v-for="item in 20">
      <div class="flex items-center justify-between py-2 border-b border-primary/20">
        <div class="text-sm">
          <span class="text-primary">质押</span>
          <div class="text-gray-400">0x8F...2E1B</div>
        </div>
        <div class="text-right">
          <div class="text-white">500 USDT</div>
          <div class="text-xs text-gray-400">2025.03.24 08:16</div>
        </div>
      </div>
    </template>
    <div class="flex items-center justify-between py-2 border-b border-primary/20">
      <div class="text-sm">
        <span class="text-secondary">取现</span>
        <div class="text-gray-400">0x3A...9C4D</div>
      </div>
      <div class="text-right">
        <div class="text-white">300 USDT</div>
        <div class="text-xs text-gray-400">2025.03.24 07:45</div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
const showTip = ref(false);
const showAll = ref(false);


const list = Array.from({ length: 20 }, (_, i) => ({
  id: Date.now() + i + 1,
  title: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));
</script>

<style lang="scss" scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.neon-border {
  border: 1px solid rgba(0, 240, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}
.cyber-grid {
  background-image: linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% + 200px));
  }
}
@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
}
@keyframes sparkle {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
