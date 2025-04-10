<template>
  <Main>
    <div class="grid grid-cols-1 gap-4">
        <div class="h-[180px] relative rounded-xl">
          <div class="absolute inset-0 bg-[url('https://ai-public.mastergo.com/ai/img_res/d978cbd30e236a79dad65b15a68e4a4c.jpg')] bg-cover bg-center"></div>
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div class="text-5xl font-bold neon-text glitch-effect" style="animation-duration: 5s">100,000 枚</div>
          </div>
        </div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <i class="fas fa-coins mr-2"></i>MGK
            </h3>
            <span class="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-2 py-1">BSC</span>
          </div>
          <div class="relative h-3 bg-[#222224] rounded-full mb-3">
            <div class="progress-bar h-full w-[75%] rounded-full animate-pulse"></div>
            <div class="absolute -top-1 left-0 w-5 h-5 animate-[bounce_3s_infinite]">
              <div class="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-[0_0_5px_0_rgba(0,240,255,0.8)]">
                <i class="fas fa-running text-white text-xs"></i>
              </div>
            </div>
          </div>
          <div class="flex justify-between text-xs mb-4">
            <span class="text-[#666668]">进度 75%</span>
            <span class="text-primary">剩余 2 天 8 小时 45 分</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="flex items-center gap-1">
              <span>合约地址：</span>
              <span class="text-[#666668]">0x8f3...a12b</span>
              <i class="fas fa-copy text-primary cursor-pointer"></i>
            </div>
            <div>空投数量：<span class="text-primary">100000 枚</span></div>
            <div>流动市值：<span class="text-primary">30000</span><span class="text-[#FFFF00]"> USDT</span></div>
            <div>种子会员：<span class="text-primary">10 枚</span></div>
            <div>萌芽会员：<span class="text-primary">50 枚</span></div>
            <div>节点会员：<span class="text-primary">100 枚</span></div>
            <div>创世会员：<span class="text-primary">200 枚</span></div>
            <div class="flex items-center gap-1">
              <span>当前价格：<span class="text-primary">＄15.26</span></span>
              <div class="ml-[15px]">
                <button class="w-6 h-6 text-secondary" @click="showTip = true">
                  <i class="fas fa-question-circle text-base"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="flex gap-3 mt-4">
            <button id="claimBtn" class="w-full bg-secondary hover:bg-opacity-90 text-white py-2 rounded-button flex items-center justify-center gap-2">
              <i class="fas fa-gift"></i>领取空投
            </button>
          </div>
    </div>
    <section class="rounded-xl relative  mt-4">
      <div class="absolute inset-0 bg-[url('https://ai-public.mastergo.com/ai/img_res/3a73050b9722588201e6e56aee19fd81.jpg')] opacity-10"></div>
      <div class="relative">
        <h2 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">空投记录</span>
          <i class="fas fa-history text-secondary text-xs"></i>
        </h2>
        <div class="h-[250px] overflow-hidden relative">
          <Table custom-class="overflow-hidden">
            <template #header>
              <div>空投地址</div>
              <div class="text-center">数量</div>
              <div class="text-center">身份</div>
              <div class="text-right">时间</div>
            </template>
            <template #body>
              <div class="space-y-3">
                <vue3ScrollSeamless :classOptions="{
            step:0.5,
            limitMoveNum:10
          }" :dataList="list">
                  <template v-for="item in list">
                    <TableRows>
                      <span class="truncate">0x8f3...a12b</span>
                      <span class="text-center">100 <span class="text-primary">枚</span></span>
                      <span class="text-center text-secondary">会员</span>
                      <span class="text-right"><span class="text-primary">03.15</span> <span class="text-secondary">10:00</span></span>
                    </TableRows>
                  </template>

                </vue3ScrollSeamless>
              </div>

            </template>
          </Table>
        </div>
        <button @click="showMore = true" class="w-full mt-4 py-2 border border-solid border-secondary !rounded-button hover:bg-secondary hover:bg-opacity-10 flex items-center justify-center gap-2 text-sm">
          <span class="text-secondary">展开记录</span>
          <i class="fas fa-chevron-down text-secondary text-xs"></i>
        </button>
      </div>
    </section>
  </Main>
  <Modal title="15 天空投记录" v-model="showMore">
    <Table>
      <template #header>
        <div>空投地址</div>
        <div class="text-center">数量</div>
        <div class="text-center">身份</div>
        <div class="text-right">时间</div>
      </template>
      <template #body>
        <template v-for="item in 10">
          <TableRows>
            <span class="truncate">0x8f3...a12b</span>
            <span class="text-center">100 <span class="text-primary">枚</span></span>
            <span class="text-center text-secondary">会员</span>
            <span class="text-right"><span class="text-primary">03.15</span> <span class="text-secondary">10:00</span></span>
          </TableRows>
        </template>
      </template>
    </Table>
  </Modal>
  <Modal title="空投规则说明" v-model="showTip">
      <div class="text-sm space-y-2">
        <p>1. 参与节点可以多次领取空投</p>
        <p>2. 推荐的会员越多，领取的空投数量越多</p>
        <p>3. 普通会员只能领取一次空投</p>
        <p>4. 推荐新会员后可再次领取空投</p>
      </div>
      <button @click="showTip = false" class="w-full mt-4 py-2 bg-primary !rounded-button text-white">
        我知道了
      </button>
  </Modal>
</template>

<script setup lang="ts">
import Main from "@/layout/Main.vue";
import Table from "@/components/Table.vue";
import TableRows from "@/components/TableRows.vue";
import Modal from "@/components/Modal.vue";


const showMore = ref(false);
const showTip= ref(false);

const list = Array.from({ length: 20 }, (_, i) => ({
  id: Date.now() + i + 1,
  title: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));
</script>

<style lang="scss" scoped>
@keyframes bounce {
  0%, 100% { transform: translateX(0) scale(1); }
  25% { transform: translateX(280px) scale(1.1); }
  50% { transform: translateX(0) scale(1); }
  75% { transform: translateX(280px) scale(1.1); }
}
@keyframes scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}
.neon-text {
  text-shadow: 0 0 5px #00F0FF, 0 0 10px #00F0FF, 0 0 15px #00F0FF;
}
.glass-card {
  background: rgba(34, 34, 36, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.2);
}
.progress-bar {
  background: linear-gradient(90deg, #00F0FF 0%, #FF3366 100%);
}
@keyframes glitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}
.glitch-effect {
  animation: glitch 0.3s infinite;
}
@keyframes marquee {
  0% { transform: translateX(100%) }
  100% { transform: translateX(-100%) }
}
</style>
