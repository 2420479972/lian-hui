<template>
  <div class="w-full h-full px-[23px] flex flex-col pb-[18px]">
    <div class="w-full py-[9px] flex gap-[15px] mt-[10px]">
      <var-tabs v-model:active="active">
        <var-tab v-for="item in tabList" :key="item.label">
          <div class="flex items-center gap-[8px]"  @click="checkTab(item.key)">
            <img :src="item.icon" alt="">
            <div class="text-[24px]" :style="{color:item.key == selectedTab ? '#fff' : '#6E6B76'}">{{ item.label }}</div>
          </div>
        </var-tab>
      </var-tabs>
    </div>
    <div class="mt-[15px] w-full  flex items-center mb-[18px] justify-between">
      <div class="text-[21px]">空投代币</div>
      <button class="h-[45px] bg-[rgba(122,120,131,0.05)] rounded-[2px] flex items-center p-[15px]" v-ripple>
        <var-icon name="plus" :size="22"/>
        <div class="ml-[8px] text-[18px]">发布空投</div>
      </button>
    </div>
    <div class="flex-1 w-full overflow-y-auto">
      <var-list
          :finished="false"
          :loading="false"
          class="h-full overflow-y-auto"
      >
        <div class="grid grid-cols-2 gap-y-[18px]">
          <div class="w-[249.5px] min-h-[267px] px-[18px] py-[18px] bg-[#140E20] border-[3px] border-[#1D1A2A] rounded-[5px]" v-for="item in 80">
            <div class="flex items-center space-x-[20px]">
              <div class="text-[18px] text-[#605D75]">0xBe4***49EA5</div>
              <img src="assets/images/hot-token/copy.png" class="h-[28px] w-[28px] ml-[13px]" alt="" @click="handleCopy('1232')">
            </div>
            <div class="w-full flex items-center space-x-[12px] mt-[15px]">
              <img class="h-[22px] w-[22px] border" src="" alt="">
              <div class="text-[24px] opacity-[0.4]">
                WERT
              </div>
            </div>
            <div class="w-full h-[96px] mt-[16px] bg-[rgba(122,120,131,0.05)] p-[9px] flex flex-col">
              <div class="text-[#605D75] text-[18px]">空投数量</div>
              <div class="flex-1 flex items-center justify-center text-[36px]">100</div>
            </div>
            <div class="mt-[16px] w-full flex items-center space-x-[24px]">
              <div class="text-[18px] opacity-[0.4]">LP流通市值</div>
              <div class="text-[18px]">0.00</div>
            </div>
            <div class="mt-[16px] w-full flex items-center space-x-[24px]">
              <div class="text-[18px] opacity-[0.4]">LP流通市值</div>
              <div class="text-[18px]">0.00</div>
            </div>
          </div>
        </div>
      </var-list>
    </div>
  </div>
<!--  <detail :show="true"></detail>-->
  <release :show="false"></release>
</template>

<script setup lang="ts">
import BSC from "assets/images/hot-token/BSC.png";
import ETH from "assets/images/hot-token/ETH.png";
import {handleCopy} from "@/hooks/copy.ts";
import Detail from "views/airdrop/detail.vue";
import Release from "views/airdrop/release.vue";
const active = ref(0);
const selectedTab = ref('BSC')
const tabList = [
  {
    label: 'BSC',
    icon: BSC,
    key: 'BSC'
  },
  {
    label: 'ETH',
    icon: ETH,
    key: 'ETH'
  }
]
const checkTab = (key: string) => {
  selectedTab.value = key
}
</script>

<style lang="scss" scoped>

</style>
