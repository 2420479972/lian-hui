<template>
  <div class="space-y-7">
    <div v-for="item in vipInfo" v-ripple
         class="px-[18px] py-[30px] min-h-[177px] w-full user bg-[var(--member-card-bg)] rounded-xl relative" @click="buyMember(item)">
      <div class="absolute right-[18px] top-[18px] flex items-center space-x-[12px]">
        <div class="w-[7px] h-[7px] rounded-full bg-[var(--member-header-text-bg)] opacity-[0.4]"></div>
        <div class="opacity-[0.4] text-[18px]">{{ t('member.notPurchased') }}</div>
      </div>
      <div class="flex items-center h-[65px] space-x-[20px]">
        <div class="h-[65px] w-[65px] rounded-full">
          <img :src="getResource('member',item.vipname + '.png')" alt="" class="h-[65px]">
        </div>
        <div class="space-y-[16px]">
          <div class="text-[22px]">{{ item.vipname }}</div>
          <div class="text-[18px] text-[#605D75]">
            价格：{{ ethers.formatEther(getNumber(item?.paid_plan[0], "price",true)) }}
          </div>
          <!--          <div class="text-[18px] text-[#605D75]">{{item?.paid_plan[0]?.day || '&#45;&#45;'}}</div>-->
        </div>
      </div>
      <div class="mt-[32px]">
        {{ item.info }}
      </div>
    </div>
  </div>
  <div class="my-[28px] w-full h-[2px] bg-[var(--member-cut-line)] opacity-[0.1] rounded-full"></div>
  <div class="mt-[30px]">
    <div class="text-[24px]">{{ t('member.promotionDetails') }}</div>
  </div>
  <div
      class="min-h-[173px] w-full bg-[var(--member-bottom-bg)] border-[var(--member-bottom-border)]  border-solid border-4 rounded-[5px] mt-[30px] py-[34px] flex justify-between items-center">
    <div class="w-[47%] h-full flex flex-col justify-center items-center">
      <div class="text-[48px] text-[#1CE89F]">{{ getNumber(accountInfo, "total_invitations") }}</div>
      <div class="text-[18px]">{{ t('member.totalNumberOfInvitations') }}</div>
    </div>
    <div class="w-[63%] h-full space-y-[8px] px-[57px]">
      <div class="flex items-center w-full justify-between">
        <div class="text-[#605D75] w-[120px]">{{ t('member.directPushAddress') }}：</div>
        <div class="">{{ accountInfo?.promotion_address.length > 0 ? accountInfo.promotion_address[0] : '--' }}</div>
      </div>
      <div class="flex items-center w-full justify-between">
        <div class="text-[#605D75] w-[120px]">{{ t('member.level1') }}：</div>
        <div class="">{{ getNumber(accountInfo, "once_invitations") }}</div>
      </div>
      <div class="flex items-center w-full justify-between">
        <div class="text-[#605D75] w-[120px]">{{ t('member.level2') }}：</div>
        <div class="">{{ getNumber(accountInfo, "twice_invitations") }}</div>
      </div>
      <div class="flex items-center w-full justify-between">
        <div class="text-[#605D75] w-[120px]">{{ t('member.levelThree') }}：</div>
        <div class="">{{ getNumber(accountInfo, "third_invitations") }}</div>
      </div>
    </div>
  </div>
  <div
      class="w-full h-[50px] bg-[var(--member-bottom-bg)] border-[var(--member-bottom-border)] border-solid border-4 rounded-[5px] p-[18px] text-[#605D75] mt-[30px] flex justify-between items-center">
    <div class="flex items-center space-x-[22px]">
      <div class="">{{ t('member.superiorAddress') }}</div>
      <div class="">{{ formatAddress(accountInfo?.parent_address || '') }}</div>
    </div>
    <img alt="" class="h-[28px] w-[28px]" src="/images/hot-token/copy.png"
         @click="handleCopy(accountInfo?.parent_address || '--',t)">
  </div>
  <div
      class="w-full h-[50px] bg-[var(--member-bottom-bg)] border-[var(--member-bottom-border)] border-solid border-4 rounded-[5px] p-[18px] text-[#605D75] mt-[30px] flex justify-between items-center">
    <div class="flex items-center space-x-[22px]">
      <div class="">{{ t('member.promotionAddress') }}</div>
      <div class="">{{ formatAddress(accountInfo?.parent_address || '') }}</div>
    </div>
    <img alt="" class="h-[28px] w-[28px]" src="/images/hot-token/copy.png"
         @click="handleCopy(accountInfo.parent_address,t)">
  </div>
  <buy-vip v-model:show="showMember" :options="selectedOptions" @close="close" :data="selectedData"></buy-vip>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {handleCopy} from "@/hooks/copy.ts";
import {useAccount, useReadContract} from "@wagmi/vue";
import abi from "@/localinfo/all.json";
import {formatAddress, getNumber} from "utils/base.ts";
import {getResource} from "utils/getFile.ts";
import {ethers} from "ethers";
import BuyVip from "views/member/buy-vip.vue";

const {t} = useI18n() // 解构出t方法
const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

const {address} = useAccount()
const userInfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'gettotalinfo',
  args: [address],
}).data as any;

const accountInfo = computed(() => userInfo.value?.accountinfo)
const vipInfo = computed(() => userInfo.value?.vipinfo.filter(item=>item.vipname == "普通会员" || item.vipname == "高级会员"))

const showMember = ref(false)
const selectedOptions = ref([]);
const selectedData = ref({});
const buyMember = (item: any) => {
  selectedData.value = item;
  selectedOptions.value = item.paid_plan.map(_item => {
    return {
      value:  1,
      label: _item.day + "天",
      price: getNumber(_item,'price',true),
      day:_item.day
    }
  })
  showMember.value = true
}

const close = () => {
  selectedOptions.value = []
}


</script>

<style lang="scss" scoped>
.user-card {
  background: linear-gradient(90deg, #062E1E, #182423);
  border-radius: 5px;
}

input::placeholder {
  opacity: 0.4;
}
</style>
