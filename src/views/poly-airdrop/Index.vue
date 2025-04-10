<template>
  <Main>
    <div class="grid grid-cols-2 gap-4 mb-8">
      <!-- FCH 卡片 -->
      <div class="bg-darkBlue rounded-xl p-4 card-glow glass-effect">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 rounded-full bg-darkBlue flex items-center justify-center neon-icon">
            <i class="fas fa-coins text-xl text-neonPurple"></i>
          </div>
          <span class="ml-2 font-bold">FCH</span>
        </div>
        <div class="mb-4">
          <div class="flex justify-between text-xs mb-1">
            <span>领取进度</span>
            <span>65%</span>
          </div>
          <div class="h-2 bg-darkBlue rounded-full overflow-hidden">
            <div class="progress-bar h-full rounded-full" style="width: 65%"></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-xs text-gray-400">可领取数量</div>
          <div class="text-lg font-bold">1,245.78 FCH</div>
          <div class="text-sm text-gray-400">≈ $1,023.45</div>
        </div>
        <button class="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-button mb-3 hover:opacity-90 transition">
          领取空投
        </button>
        <div class="text-xs text-gray-400 mb-1">
          <span>创建时间: 2023-08-15</span>
        </div>
        <div class="flex items-center text-xs">
          <span class="text-gray-400 truncate">合约地址: 0x1a2...3b4c</span>
          <button class="ml-2 text-neonBlue">
            <i class="far fa-copy w-4 h-4"></i>
          </button>
        </div>
        <div class="flex items-center text-xs mt-1">
          <span class="text-gray-400 truncate">空投地址: 0x5f6...7g8h</span>
          <button class="ml-2 text-neonBlue">
            <i class="far fa-copy w-4 h-4"></i>
          </button>
        </div>
        <button class="mt-2 text-xs text-neonBlue flex items-center ml-auto" onclick="document.getElementById('airdrop-details').classList.remove('hidden')">
          <span>更多详情</span>
          <i class="fas fa-chevron-down w-3 h-3 ml-1"></i>
        </button>
      </div>
      <!-- DMH 卡片 -->
      <div class="bg-darkBlue rounded-xl p-4 card-glow glass-effect">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 rounded-full bg-darkBlue flex items-center justify-center neon-icon">
            <i class="fas fa-coins text-xl text-neonBlue"></i>
          </div>
          <span class="ml-2 font-bold">DMH</span>
        </div>
        <div class="mb-4">
          <div class="flex justify-between text-xs mb-1">
            <span>领取进度</span>
            <span>100%</span>
          </div>
          <div class="h-2 bg-darkBlue rounded-full overflow-hidden">
            <div class="progress-bar h-full rounded-full" style="width: 100%"></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-xs text-gray-400">已领取数量</div>
          <div class="text-lg font-bold">3,456.12 DMH</div>
          <div class="text-sm text-gray-400">≈ $2,789.01</div>
        </div>
        <button class="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white py-2 rounded-button mb-3 cursor-not-allowed" disabled>
          已领取
        </button>
        <div class="text-xs text-gray-400 mb-1">
          <span>创建时间: 2023-07-22</span>
        </div>
        <div class="flex items-center text-xs">
          <span class="text-gray-400 truncate">合约地址: 0x5d6...7e8f</span>
          <button class="ml-2 text-neonBlue">
            <i class="far fa-copy w-4 h-4"></i>
          </button>
        </div>
        <div class="flex items-center text-xs mt-1">
          <span class="text-gray-400 truncate">空投地址: 0x9a0...1b2c</span>
          <button class="ml-2 text-neonBlue">
            <i class="far fa-copy w-4 h-4"></i>
          </button>
        </div>
        <button class="mt-2 text-xs text-neonBlue flex items-center ml-auto" @click="showDetail = true">
          <span>更多详情</span>
          <i class="fas fa-chevron-down w-3 h-3 ml-1"></i>
        </button>
      </div>
    </div>
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">聚合记录</h2>
      </div>
      <div class="rounded-xl overflow-hidden">
        <Table :cols="12"  custom-class="overflow-y-hidden max-h-[300px]">
          <template #header>
            <div class="col-span-2">身份</div>
            <div class="col-span-4">领取地址</div>
            <div class="col-span-3 text-center">数量</div>
            <div class="col-span-3 text-right">时间</div>
          </template>
          <template #body>
            <div class="space-y-3">
              <vue3ScrollSeamless :classOptions="{
            step:0.5,
            limitMoveNum:10
          }" :dataList="list">
                <template v-for="item in 20">
                  <TableRows :cols="12">
                    <div class="col-span-2 text-xs text-neonPurple">种子会员</div>
                    <div class="col-span-4 truncate text-neonBlue">0x3a4...5c6d</div>
                    <div class="col-span-3 justify-center flex items-center space-x-1">
                      <div>1,245</div>
                      <div class="text-xs text-gray-400">FCH</div>
                    </div>
                    <div class="col-span-3 text-right text-xs text-gray-400">08-15 14:30</div>
                  </TableRows>
                </template>
              </vue3ScrollSeamless>
            </div>

          </template>
        </Table>
        <button class="w-full  text-neonBlue py-3 rounded-b-xl text-sm flex items-center justify-center hover:bg-opacity-80 transition" @click="showMore = true">
          <span>加载更多记录</span>
          <i class="fas fa-chevron-down w-4 h-4 ml-2"></i>
        </button>
      </div>
    </div>
  </Main>
  <Modal v-model="showDetail" height="auto" title="空投详情">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <div>
          <p class="text-xs text-gray-400">空投总量</p>
          <p class="text-base">9,899,999 枚</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">空投1份</p>
          <p class="text-base">100 枚</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">流动性池</p>
          <p class="text-base">50,000 USDT</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">当前价格</p>
          <p class="text-base text-neonBlue">$65.988</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">开放时间</p>
          <p class="text-base">2025.03.01 14:26</p>
        </div>
        <div>
          <p class="text-xs text-gray-400">结束时间</p>
          <p class="text-base">2025.03.25 23:12</p>
        </div>
      </div>
      <div>
        <h4 class="text-base font-bold mb-2 text-neonPurple">空投项目简介</h4>
        <p class="text-xs text-gray-300 leading-tight">
          XToken是总量10亿枚的去中心化加密货币，50%代币通过全球社区空投分发，30%用于生态建设，20%预留团队运营。项目依托多语言社区节点共建，通过DAO治理模式凝聚共识，计划6个月内完成主流CEX交易所上线，同步部署DEX流动性池。采用流动性挖矿激励机制，结合社区提案投票系统，致力于打造全球用户自治的数字资产交易生态，实现代币价值与社区规模的协同增长。
        </p>
      </div>
    </div>
  </Modal>
  <Modal v-model="showMore" title="更多记录">
    <Table :cols="12">
      <template #header>
        <div class="col-span-2">身份</div>
        <div class="col-span-4">领取地址</div>
        <div class="col-span-3">数量</div>
        <div class="col-span-3 text-right">时间</div>
      </template>
      <template #body>
        <template v-for="item in 20">
          <TableRows :cols="12">
            <div class="col-span-2">123</div>
            <div class="col-span-4 truncate text-neonBlue">0x3u4...5v6w</div>
            <div class="col-span-3">1,500</div>
            <div class="col-span-3 text-right text-xs text-gray-400">2025.03.24</div>
          </TableRows>
        </template>
      </template>
    </Table>
  </Modal>
</template>

<script setup lang="ts">
import Main from "@/layout/Main.vue";
import Modal from "@/components/Modal.vue";
import Table from "@/components/Table.vue";
import TableRows from "@/components/TableRows.vue";

const showDetail = ref(false);
const showMore = ref(false);

const list = Array.from({ length: 20 }, (_, i) => ({
  id: Date.now() + i + 1,
  title: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));

</script>

<style lang="scss" scoped>
.neon-text {
  text-shadow: 0 0 5px #00F0FF, 0 0 10px #FF3366;
}
.neon-icon {
  filter: drop-shadow(0 0 5px #00F0FF) drop-shadow(0 0 10px #FF3366);
}
.card-glow {
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
}
.progress-bar {
  background: linear-gradient(90deg, #FF3366 0%, #00F0FF 100%);
}
.dark-gradient {
  background: linear-gradient(135deg, #1A1A1D 0%, #121214 100%);
}
.glass-effect {
  background: rgba(26, 26, 29, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.grid-pattern {
  background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}
i {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
