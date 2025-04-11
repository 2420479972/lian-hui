<template>
  <Main>
    <div class="grid grid-cols-1 gap-4">
        <div class="h-[180px] relative rounded-xl">
          <div class="absolute inset-0 bg-[url('https://ai-public.mastergo.com/ai/img_res/d978cbd30e236a79dad65b15a68e4a4c.jpg')] bg-cover bg-center"></div>
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div class="text-[60px] font-bold neon-text glitch-effect" style="animation-duration: 5s">100,000 {{ $t('mainAirdrop.piece') }}</div>
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
            <span class="text-[#666668]">{{ $t('mainAirdrop.progress') }} 75%</span>
            <span class="text-primary">{{ $t('mainAirdrop.remaining') }} 2 {{$t('mainAirdrop.days')}} 8 {{$t('mainAirdrop.hours')}} 45 {{$t('mainAirdrop.minutes')}}</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="flex items-center gap-1">
              <span>合约地址：</span>
              <span class="text-[#666668]">0x8f3...a12b</span>
              <i class="fas fa-copy text-primary cursor-pointer"></i>
            </div>
            <div>{{ $t('mainAirdrop.airdrop_amount') }}：<span class="text-primary">100000 {{ $t('mainAirdrop.piece') }}</span></div>
            <div>{{ $t('mainAirdrop.market_cap') }}：<span class="text-primary">30000</span><span class="text-[#FFFF00]"> USDT</span></div>
            <div>{{ $t('mainAirdrop.seed_member') }}：<span class="text-primary">10 {{ $t('mainAirdrop.piece') }}</span></div>
            <div>{{ $t('mainAirdrop.sprout_member') }}：<span class="text-primary">50 {{ $t('mainAirdrop.piece') }}</span></div>
            <div>{{ $t('mainAirdrop.node_member') }}：<span class="text-primary">100 {{ $t('mainAirdrop.piece') }}</span></div>
            <div>{{ $t('mainAirdrop.genesis_member') }}：<span class="text-primary">200 {{ $t('mainAirdrop.piece') }}</span></div>
            <div class="flex items-center gap-1">
              <span>{{ $t('mainAirdrop.current_price') }}：<span class="text-primary">＄15.26</span></span>
              <div class="ml-[15px]">
                <button class="w-6 h-6 text-secondary" @click="showTip = true">
                  <i class="fas fa-question-circle text-base"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="flex gap-3 mt-4">
            <button id="claimBtn" class="w-full bg-secondary hover:bg-opacity-90 text-white py-2 rounded-button flex items-center justify-center gap-2">
              <i class="fas fa-gift"></i>{{ $t('mainAirdrop.claim_airdrop') }}
            </button>
          </div>
    </div>
    <section class="rounded-xl relative  mt-4">
      <div class="absolute inset-0 bg-[url('https://ai-public.mastergo.com/ai/img_res/3a73050b9722588201e6e56aee19fd81.jpg')] opacity-10"></div>
      <div class="relative">
        <h2 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{{ $t('mainAirdrop.airdrop_records') }}</span>
          <i class="fas fa-history text-secondary text-xs"></i>
        </h2>
        <div class="h-[250px] overflow-hidden relative">
          <Table custom-class="overflow-hidden">
            <template #header>
              <div>{{ $t('mainAirdrop.contract_address') }}</div>
              <div class="text-center">{{ $t('mainAirdrop.airdrop_amount') }}</div>
              <div class="text-center">{{ $t('mainAirdrop.market_cap') }}</div>
              <div class="text-right">{{ $t('mainAirdrop.claim_time') }}</div>
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
                      <span class="text-center">100 <span class="text-primary">{{ $t('mainAirdrop.piece') }}</span></span>
                      <span class="text-center text-secondary">{{ $t('mainAirdrop.market_cap') }}</span>
                      <span class="text-right"><span class="text-primary">03.15</span> <span class="text-secondary">10:00</span></span>
                    </TableRows>
                  </template>

                </vue3ScrollSeamless>
              </div>

            </template>
          </Table>
        </div>
        <button @click="showMore = true" class="w-full mt-4 py-2 border border-solid border-secondary !rounded-button hover:bg-secondary hover:bg-opacity-10 flex items-center justify-center gap-2 text-sm">
          <span class="text-secondary">{{ $t('mainAirdrop.expand_records') }}</span>
          <i class="fas fa-chevron-down text-secondary text-xs"></i>
        </button>
      </div>
    </section>
  </Main>
  <Modal :title="$t('mainAirdrop.day_records')" v-model="showMore">
    <Table>
      <template #header>
          <div>{{ $t('mainAirdrop.contract_address') }}</div>
          <div class="text-center">{{ $t('mainAirdrop.airdrop_amount') }}</div>
          <div class="text-center">{{ $t('mainAirdrop.market_cap') }}</div>
          <div class="text-right">{{ $t('mainAirdrop.claim_time') }}</div>
      </template>
      <template #body>
        <template v-for="item in 10">
          <TableRows>
            <span class="truncate">0x8f3...a12b</span>
            <span class="text-center">100 <span class="text-primary">{{ $t('mainAirdrop.piece') }}</span></span>
            <span class="text-center text-secondary">{{ $t('mainAirdrop.market_cap') }}</span>
            <span class="text-right"><span class="text-primary">03.15</span> <span class="text-secondary">10:00</span></span>
          </TableRows>
        </template>
      </template>
    </Table>
  </Modal>
  <Modal :title="$t('mainAirdrop.rule_title')" v-model="showTip">
      <div class="text-sm space-y-2">
        <p>{{ $t('mainAirdrop.rules.rule1') }}</p>
        <p>{{ $t('mainAirdrop.rules.rule2') }}</p>
        <p>{{ $t('mainAirdrop.rules.rule3') }}</p>
        <p>{{ $t('mainAirdrop.rules.rule4') }}</p>
      </div>
      <button @click="showTip = false" class="w-full mt-4 py-2 bg-primary !rounded-button text-white">
        {{ $t('mainAirdrop.got_it') }}
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
