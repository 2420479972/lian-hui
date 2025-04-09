<template>
  <Main>
      <div class="rounded-lg overflow-hidden mb-6">
        <img src="https://ai-public.mastergo.com/ai/img_res/0fcae4af0c5387bb29f8acb952086669.jpg" alt="banner" class="w-full h-[200px] object-cover">
      </div>
      <div class="bg-[#1A1A1A] rounded-lg p-4 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="gradient-text text-lg font-medium">{{ $t('asset.title') }}</h2>
          <button id="infoBtn" class="w-6 h-6 rounded-full bg-[#00F5FF] flex items-center justify-center" @click="showTip = true">
            <i class="fas fa-info text-white text-xs"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-300 block mb-2">{{ $t('asset.address') }}</label>
            <input type="text" class="w-full px-4 py-3 rounded-lg text-sm" :placeholder="$t('asset.input_address')">
          </div>
          <div>
            <label class="text-sm text-gray-300 block mb-2">{{ $t('asset.amount') }}</label>
            <div class="relative">
              <input type="text" class="w-full px-4 py-3 rounded-lg text-sm" :placeholder="$t('asset.input_amount')">
              <i id="statusIcon" class="fas fa-check absolute right-4 top-1/2 -translate-y-1/2 text-[#00F5FF] hidden"></i>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center">
              <input type="radio" name="applyType" id="typeA" class="mr-2" checked>
              <label for="typeA" class="text-sm text-gray-300">{{ $t('asset.free') }}</label>
            </div>
            <div class="flex items-center">
              <input type="radio" name="applyType" id="typeB" class="mr-2">
              <label for="typeB" class="text-sm text-gray-300">{{ $t('asset.paid') }} 50 USDT</label>
            </div>
          </div>
          <button class="w-full py-3 rounded-lg gradient-bg text-white font-medium">
            {{ $t('common.submit') }}
          </button>
        </div>
      </div>
      <div class="bg-[#1A1A1A] rounded-lg p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium gradient-text">{{ $t('asset.records') }}</h3>
          <button id="viewAllBtn" class="text-[#00F5FF] text-sm" @click="getAll">{{ $t('common.view_all') }}</button>
        </div>
        <Table custom-class="overflow-y-hidden h-[200px]">
          <template #header>
            <div>{{ $t('asset.contract') }}</div>
            <div class="text-center">{{ $t('asset.token_name') }}</div>
            <div class="text-center">{{ $t('asset.token_price') }}</div>
            <div class="text-right">{{ $t('asset.time') }}</div>
          </template>
          <template #body>
            <div class="space-y-3">
              <vue3ScrollSeamless :classOptions="{
            step:0.5,
            limitMoveNum:10
          }" :dataList="list">
                <template v-for="item in list">
                  <TableRows>
                    <div class="truncate text-neonBlue">0x3a4...5c6d</div>
                    <div class="text-center">BTC</div>
                    <div class="text-center">$42,500</div>
                    <div class="text-right">2025.03.24</div>
                  </TableRows>
                </template>
              </vue3ScrollSeamless>
            </div>
          </template>
        </Table>
      </div>
  </Main>
  <Modal :title="$t('asset.all_records')" v-model="showAll">
    <Table>
      <template #header>
        <div>{{ $t('asset.contract') }}</div>
        <div class="text-center">{{ $t('asset.token_name') }}</div>
        <div >{{ $t('asset.token_price') }}</div>
        <div class="text-right">{{ $t('asset.time') }}</div>
      </template>
      <template #body>
        <template v-for="item in list">
          <TableRows>
            <div>0x8F...2E1B</div>
            <div class="truncate text-center text-neonBlue">BTC</div>
            <div>$1,500</div>
            <div class="text-right text-xs text-gray-400">2025.03.24</div>
          </TableRows>
        </template>
      </template>
    </Table>
  </Modal>
  <Modal :title="$t('asset.left_assets')" v-model="showTip">
    <div class="text-sm space-y-2">
      <p>{{ $t('tips.tip1') }}</p>
      <p>{{ $t('tips.tip2') }}</p>
      <p>{{ $t('tips.tip3') }}</p>
      <p>{{ $t('tips.tip4') }}</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import Main from "@/layout/Main.vue";
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Table from "@/components/Table.vue";
import TableRows from "@/components/TableRows.vue";

const list = Array.from({ length: 20 }, (_, i) => ({
  id: Date.now() + i + 1,
  title: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));


const showAll = ref(false);
const getAll = ()=>{
  showAll.value = true;
}

const showTip = ref(false);

</script>

<style lang="scss" scoped>

</style>
