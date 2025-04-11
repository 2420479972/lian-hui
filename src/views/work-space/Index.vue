<template>
  <Main>
    <div class="space-y-4">
      <div class="w-full">
        <h2 class="text-lg font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent text-left mb-2">{{ $t('dashboard.title') }}</h2>
        <div style="width: 100%; height: 240px;">
          <LineCharts></LineCharts>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-4">
          <div class="bg-[#121212] rounded-lg p-2 text-center border border-[#252525]">
            <p class="text-xs text-gray-400">{{ $t('dashboard.seed') }}</p>
            <p class="text-primary font-medium">2,148</p>
          </div>
          <div class="bg-[#121212] rounded-lg p-2 text-center border border-[#252525]">
            <p class="text-xs text-gray-400">{{ $t('dashboard.sprout') }}</p>
            <p class="text-primary font-medium">1,526</p>
          </div>
          <div class="bg-[#121212] rounded-lg p-2 text-center border border-[#252525]">
            <p class="text-xs text-gray-400">{{ $t('dashboard.node') }}</p>
            <p class="text-primary font-medium">856</p>
          </div>
          <div class="bg-[#121212] rounded-lg p-2 text-center border border-[#252525]">
            <p class="text-xs text-gray-400">{{ $t('dashboard.genesis') }}</p>
            <p class="text-primary font-medium">324</p>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">{{ $t('dashboard.membership') }}</h3>
          <button id="toggleCardsBtn" class="text-primary text-sm flex items-center" @click="showMoreMember = !showMoreMember">
            <span>{{ $t('common.more') }}</span>
            <i class="fas fa-chevron-down ml-1" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" >
          <div class="bg-[#121212] rounded-lg p-4 flex flex-col items-center border border-[#252525]">
            <div class="w-20 h-20 rounded-full overflow-hidden mb-3">
              <img src="/images/seedMembership.png" class="w-full h-full object-cover" />
            </div>
            <h4 class="font-medium text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{{ $t('dashboard.seed') }}</h4>
            <p class="text-primary font-medium text-sm my-1">$50</p>
            <p class="text-xs text-gray-400 mb-2">2025.03.29 14:25</p>
            <p class="text-xs text-yellow-400 mb-3">{{ $t('status.waiting') }}</p>
            <button class="bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-1.5 rounded-button text-sm w-full transition-all duration-300 hover:from-blue-500 hover:to-primary">{{ $t('common.buy') }}</button>
          </div>
          <div class="rounded-lg p-4 flex flex-col items-center border border-[#252525]">
            <div class="w-20 h-20 rounded-full overflow-hidden mb-3">
              <img src="/images/berryMembership.png" class="w-full h-full object-cover" />
            </div>
            <h4 class="font-medium text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{{ $t('dashboard.sprout') }}</h4>
            <p class="text-primary font-medium text-sm my-1">$100</p>
            <p class="text-xs text-gray-400 mb-2">2025.03.29 14:25</p>
            <p class="text-xs text-green-400 mb-3">{{ $t('status.open') }}</p>
            <button class="bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-1.5 rounded-button text-sm w-full transition-all duration-300 hover:from-blue-500 hover:to-primary">{{ $t('common.buy') }}</button>
          </div>
          <div v-show="showMoreMember" class="col-span-2 grid grid-cols-2 gap-3">
            <div class="rounded-lg p-4 flex flex-col items-center border border-[#252525]">
              <div class="w-20 h-20 rounded-full overflow-hidden mb-3">
                <img src="/images/nodeMembership.png" class="w-full h-full object-cover" />
              </div>
              <h4 class="font-medium text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{{ $t('dashboard.node') }}</h4>
              <p class="text-primary font-medium text-sm my-1">$300</p>
              <p class="text-xs text-gray-400 mb-2">2025.03.29 14:25</p>
              <p class="text-xs text-yellow-400 mb-3">{{ $t('status.waiting') }}</p>
              <button class="bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-1.5 rounded-button text-sm w-full transition-all duration-300 hover:from-blue-500 hover:to-primary">{{ $t('common.buy') }}</button>
            </div>
            <div class="rounded-lg p-4 flex flex-col items-center border border-[#252525]">
              <div class="w-20 h-20 rounded-full overflow-hidden mb-3">
                <img src="/images/creationMember.png" class="w-full h-full object-cover" />
              </div>
              <h4 class="font-medium text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{{ $t('dashboard.genesis') }}</h4>
              <p class="text-primary font-medium text-sm my-1">$800</p>
              <p class="text-xs text-gray-400 mb-2">2025.03.29 14:25</p>
              <p class="text-xs text-green-400 mb-3">{{ $t('status.open') }}</p>
              <button class="bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-1.5 rounded-button text-sm w-full transition-all duration-300 hover:from-blue-500 hover:to-primary">{{ $t('common.buy') }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex items-center space-x-2 mb-2">
          <h3 class="text-lg font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">{{ $t('dashboard.presale') }}</h3>
        </div>
        <div class="mb-4" style="width: 100%; height: 240px;">
          <BarCharts></BarCharts>
        </div>
        <div class="mt-4">
          <div class="flex items-center justify-between mb-2 cursor-pointer" @click="showDataHistory = true">
            <h4 class="text-sm font-medium">{{ $t('dashboard.history') }}</h4>
            <i id="dataToggleIcon" class="fas fa-chevron-down text-gray-400 transition-transform duration-200" style="width: 16px; height: 16px;"></i>
          </div>
        </div>
        <div class="rounded-lg p-4 mt-4">
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p class="text-gray-400">{{ $t('dashboard.amount') }}</p>
              <p class="font-medium">200枚</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.price') }}</p>
              <p class="font-medium">$50</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.total') }}</p>
              <p class="font-medium">1,000,000,000</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.listing') }}</p>
              <p class="font-medium">$0.01</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.address') }}</p>
              <div class="flex items-center justify-between">
                <p class="font-medium">0x8B...2E4C</p>
                <button onclick="copyToClipboard('0x8B...2E4C')" class="text-primary">
                  <i class="fas fa-copy" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.start') }}</p>
              <p class="font-medium text-primary">2025.03.29 14:12</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.end') }}</p>
              <p class="font-medium text-primary">2025.03.29 12:12</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.sold') }}</p>
              <p class="font-medium">285,000</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.orders') }}</p>
              <p class="font-medium">1,526</p>
            </div>
            <div>
              <p class="text-gray-400">{{ $t('dashboard.participate') }}</p>
              <p class="text-2xl font-bold text-primary">5次</p>
            </div>
          </div>
        </div>
        <button class="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-button mt-4 hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-primary/30">
          {{ $t('common.subscribe') }}
        </button>
      </div>
    </div>
  </Main>
  <Modal :title="$t('dashboard.history')" v-model="showDataHistory">
    <Table :cols="12">
      <template #header>
        <div class="col-span-4">{{ $t('common.date') }}</div>
        <div class="col-span-4 text-center">{{ $t('dashboard.volume') }}</div>
        <div class="col-span-4 text-right">{{ $t('dashboard.amount') }}</div>
      </template>
      <template #body>
        <TableRows :cols="12">
          <div class="col-span-4 text-xs text-neonPurple">2023.01.02</div>
          <div class="col-span-4 truncate text-center text-neonBlue">20000</div>
          <div class="col-span-4 text-right truncate text-neonBlue">3000</div>
        </TableRows>
      </template>
    </Table>
  </Modal>
</template>

<script setup lang="ts">
import Main from "@/layout/Main.vue";
import Modal from "@/components/Modal.vue";
import Table from "@/components/Table.vue";
import TableRows from "@/components/TableRows.vue";
import LineCharts from "@/components/LineCharts.vue";
import BarCharts from "@/components/BarCharts.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const showDataHistory = ref(false)
const showMoreMember = ref(false);
</script>

<style lang="scss" scoped>

</style>
