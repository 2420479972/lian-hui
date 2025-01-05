<template>
  <div class="w-full flex-1 flex flex-col h-full pb-[23px]">
    <div class="w-full flex-1 flex flex-col overflow-y-auto px-[23px]">
      <div class="w-full py-[9px] flex gap-[15px]">
        <var-tabs v-model:active="activeHeader">
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
      <div class="w-full h-[105px] px-[12px] py-[16px] user-card flex items-center" :style="{backgroundImage:'url(' + Theme.memberHeaderBg + ')',backgroundSize:'100% 100%'}">
        <div class="h-[65px] w-[65px] rounded-full">
          <img src="/images/public/btc.png" class="w-full h-full" alt="">
        </div>
        <div class="space-y-[15px] ml-[21px] w-[65%]">
          <div class="flex items-center space-x-3">
            <div class="text-[24px] text-[#fff]">{{formatAddress(address || '')}}</div>
            <img src="/images/hot-token/copy.png" class="h-[28px] w-[28px] ml-[13px]" alt="" @click="handleCopy(address || '',t)">
          </div>
          <div class="flex items-center space-x-[15px] h-[28px]">
            <div class="text-[18px] text-[var(--member-header-text-color)]">余额(BNB)</div>
            <div class="text-[18px] text-[#fff]">{{ethers.formatEther(getNumber(accountInfo,'basecoin_balance',true))}}</div>
          </div>
        </div>
        <div class="flex-1 h-full flex items-start space-x-2">
          <div class="h-[28px] w-[28px]  rounded-full">
            <img :src="getResource('member','vip.png')" class="h-[28px]" alt="">
          </div>
          <div class="h-[28px] w-[28px]  rounded-full">
            <img :src="getResource('watch-robot','normal-robot.png')" class="h-[28px]" alt="">
          </div>
        </div>
      </div>
      <div class="w-full mt-[13px] flex justify-between items-center text-[18px]">
        <var-tabs v-model:active="activeUserMenu" :scrollable="true" class="w-full" @change="checkSecondTab">
          <var-tab v-for="(item,index) in secondTabList" :key="item.label">
            <div :style="{background:activeUserMenu == index ? 'var(--member-button-bg-active)' :'var(--member-button-bg)',color:activeUserMenu == index ? 'var(--member-button-color-active)' :'var(--member-button-color)' }" class="px-[35px]  rounded  leading-[45px] text-center  relative">
              <span>{{  t("public." + item.label) }}</span>
              <div v-if="activeUserMenu == index" class="absolute w-[35px] h-[2px] bg-[#3481D7] rounded-[1px] left-1/2 -translate-x-1/2 bottom-0"></div>
            </div>
          </var-tab>
        </var-tabs>
      </div>

      <div class="flex-1 mt-[22px] w-full overflow-y-auto pt-[20px] content">
        <template v-if="selectedSecondTab == 'member'">
          <User></User>
        </template>
          <Card v-else :type="selectedSecondTab"></Card>
        <div class="h-[63px]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {handleCopy} from "@/hooks/copy.ts";
import Card from "views/member/card.vue";
import {useI18n} from "vue-i18n";
import {ThemeManager} from "store/theme.ts";
import {getResource} from "utils/getFile.ts";
import {useAccount, useReadContract} from "@wagmi/vue";
import User from "views/member/user.vue";
import {ethers} from "ethers";
import {formatAddress, getNumber} from "utils/base.ts";
import abi from '@/localinfo/all.json';

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

const list = ['item1', 'item2', 'item3']

const {address} = useAccount()

const userInfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'gettotalinfo',
  args: [address],
}).data as any;

const accountInfo = computed(()=>userInfo.value?.accountinfo)



const { t } = useI18n() // 解构出t方法
const Theme = ThemeManager()
const activeHeader = ref(0);
const activeUserMenu = ref(0);
const selectedTab = ref('BSC')
const selectedSecondTab = ref<any>('member')
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

const secondTabList = [
  {
    label: "member",
    key: "member"
  },
  {
    label: "ordinaryRobot",
    key: "normal"
  },
  {
    label: "professionalRobot",
    key: "profession"
  }
]

const checkSecondTab = (selectedSelect: number) => {
  selectedSecondTab.value = secondTabList[selectedSelect].key;

}

const checkTab = (key: string) => {
  selectedTab.value = key
}

</script>

<style lang="scss" scoped>
.header {
  background: #110F20;
  border: 2px solid;
  border-image: linear-gradient(90deg, #103B38, #103B38) 2 2;
}

.button-shadow {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.content{
  &::-webkit-scrollbar {
    display: none;
  }
}
:deep(.var-tabs__tab-wrap){
  position: initial;
}


</style>
