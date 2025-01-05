<template>
  <div class="w-full h-full px-[23px] flex flex-col pb-[18px]">
    <div class="w-full py-[9px] flex gap-[15px]">
      <var-tabs v-model:active="active">
        <var-tab v-for="item in tabList" :key="item.label">
          <div class="flex items-center gap-[8px]" @click="checkTab(item.key)">
            <img :src="item.key == selectedTab ? item.selected :item.icon" alt="" class="h-[35px]">
            <div class="text-[24px]" :style="{color:item.key == selectedTab ? 'var(--tab-color-text-selected)' : 'var(--tab-color-text)'}">{{
                item.label
              }}
            </div>
          </div>
        </var-tab>
      </var-tabs>
    </div>
    <div class="mt-[15px] w-full  flex items-center mb-[18px] justify-between">
      <div class="text-[21px]">{{t('airdrop.airdropTokens')}}</div>
      <button class="h-[45px] bg-[var(--airdrop-sbu-bg)]  rounded-[5px] flex items-center p-[15px] border-2 border-solid border-[var(--airdrop-border-color)]" v-ripple @click="showRelease = true">
        <var-icon name="plus" :size="22" color="var(--airdrop-sbu-bg-text)"/>
        <div class="ml-[8px] text-[18px]   text-[var(--airdrop-sbu-bg-text)]" >{{t('airdrop.launchAirdrop')}}</div>
      </button>
    </div>
    <div class="flex-1 w-full overflow-y-auto">
      <var-list
          :finished="false"
          :loading="false"
      >
        <div class="grid grid-cols-2 gap-[18px]">
          <div class="w-[100%] min-h-[267px] px-[18px] py-[18px] bg-[var(--airdrop-sbu-bg)] border-[3px] border-[var(--airdrop-card-bg-border)] rounded-[5px]" v-for="item in airdropInfo" @click="selectItem(item)">
            <div class="flex items-center space-x-[20px]">
              <div class="text-[18px] text-[#605D75]">{{formatAddress(item.coin)}}</div>
              <img src="/images/hot-token/copy.png" class="h-[28px] w-[28px] ml-[13px]" alt="" @click.stop="handleCopy(item.coin,t)">
            </div>
            <div class="w-full flex items-center space-x-[12px] mt-[15px]">
              <img class="h-[25px] w-[25px]" src="/images/public/btc.png" alt="">
              <div class="text-[24px] text-[var(--tab-color-text)]">
                {{item.symbol?.toUpperCase()}}
              </div>
            </div>
            <div class="w-full h-[96px] mt-[16px] bg-[var(--airdrop-card-number-bg)] p-[9px] flex flex-col rounded-[5px]">
              <div class="text-[#605D75] text-[15px]">{{t('airdrop.airdropQuantity')}}</div>
              <div class="flex-1 flex items-center justify-center text-[36px]">{{getNumber(item.once_airdrop_amount)}}</div>
            </div>
            <div class="mt-[16px] w-full flex items-center space-x-[24px]">
              <div class="text-[18px] opacity-[0.4]">{{t('airdrop.lPValue')}}</div>
              <div class="text-[18px]">{{getNumber(item.lpprice)}}</div>
            </div>
            <div class="mt-[16px] w-full flex items-center space-x-[24px]">
              <div class="text-[18px] opacity-[0.4]">{{t('airdrop.tokenPrice')}}</div>
              <div class="text-[18px]">{{getNumber(item.price)}}</div>
            </div>
          </div>
        </div>
      </var-list>
      <var-back-top :duration="300" />
    </div>
  </div>
  <detail v-model:show="showDetail" :data="selectedShowData"></detail>
  <release v-model:show="showRelease" @success="success"></release>
</template>

<script setup lang="ts">
import {handleCopy} from "@/hooks/copy.ts";
import Detail from "views/airdrop/detail.vue";
import Release from "views/airdrop/release.vue";
import {useI18n} from "vue-i18n";
import {useReadContract} from "@wagmi/vue";
import abi from '@/localinfo/all.json'
import {getResource} from "utils/getFile.ts";
import {ThemeManager} from "store/theme.ts";
import {formatAddress, getNumber} from "utils/base.ts";

const { t } = useI18n() // 解构出t方法

const Theme = ThemeManager()

const active = ref(0);

const selectedTab = ref('BSC')

const tabList = ref([
  {
    label: 'BSC',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "BSC.png") : getResource('hot-token/dark/', "BSC.png")
    }),
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "selected-BSC.png") : getResource('hot-token/dark/', "selected-BSC.png")
    }),
    key: 'BSC'
  },
  {
    label: 'ETH',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "ETH.png") : getResource('hot-token/dark/', "ETH.png")
    }),
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "selected-ETH.png") : getResource('hot-token/dark/', "selected-ETH.png")
    }),
    key: 'ETH'
  },
])

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

//获取空投项目
const airdropInfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address as any,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'get_airdropinfo',
  args: [0, 10],
}).data




//添加成功后
const success = (item)=>{
  showRelease.value = false
}


const selectItem = (item)=>{
  selectedShowData.value = item
  showDetail.value = true
}


const checkTab = (key: string) => {
  selectedTab.value = key
}

const selectedShowData =ref({});
const showDetail = ref(false);


const showRelease = ref(false);

</script>

<style lang="scss" scoped>

</style>
