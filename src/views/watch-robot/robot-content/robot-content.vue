<template>
  <normal-robot v-if="nowSelectedRobot == 'normal'" v-bind="$attrs"></normal-robot>
  <profession-robot v-else v-bind="$attrs"></profession-robot>
  <div class="w-full mt-[37px] grid grid-cols-3">
    <div class="text-[18px]  flex flex-col items-center justify-center relative">
      <div class="mb-[10px] opacity-[0.4]">
        USDT
      </div>
      <div class="text-[23px] text-[#65B6FF]">
        <span class="text-[40px]">0</span></div>
    </div>
    <div class="text-[18px] flex flex-col items-center justify-center relative">
      <div class="mb-[10px] opacity-[0.4]">
        ERC20<span>{{ t('public.token') }}</span>
      </div>
      <div class="text-[23px] text-[#FF964E]"><span class="text-[40px]">0</span></div>
    </div>
    <div class="text-[18px]  flex flex-col items-center justify-center">
      <div class="mb-[10px] opacity-[0.4]">
        {{ t('robot.estimatedProductionValue') }}USDT
      </div>
      <div class="text-[23px] text-[#1CE89F]"><span class="text-[40px]">0</span></div>
    </div>
  </div>
  <div class="text-[15px] opacity-[0.4] mt-[37px] space-x-2">
    <var-icon name="alert-circle-outline"/>
    <span>{{ t('public.price') }}：86.69896417100072 USDT/FINECIA</span>
  </div>
  <div class="w-full bg-[var(--node-card-bg)] mt-[11px] rounded p-[18px] space-y-[38px]">
    <div class="w-full">
      <div class="text-[18px] mb-[10px] text-[#65B6FF]">{{ t('public.latest') }} pancake swap
        {{ t('public.message') }}
      </div>
      <div class="h-[320px] relative">
        <vue3-seamless-scroll :list="list" direction="up" :step="0.15" :wheel="true" class="w-full  space-y-[20px] h-full overflow-hidden  list">
          <div class="w-full" v-for="item in list">
            <div class="text-[18px] text-[#605D75]">2024/10/15 17:54:52</div>
            <div class="text-[18px] text-[#65B6FF] mt-[12px] opacity-[0.7]">0x987***58964 使用11.061866065222256 USDT 交换
              959.0523296531131686
            </div>
            <div class="text-[18px] text-[var(--color-text)] mt-[16px]">0x987***58964 使用11.061866065222256 USDT 交换
              959.0523296531131686
            </div>
          </div>
        </vue3-seamless-scroll>
        <div class="absolute bottom-2 right-2" v-if="list.length > 4">
          <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[var(--input-border-color)]  bg-[var(--node-card-bg)] flex items-center justify-center rounded-[5px]" v-ripple @click="showMore = true">
            <span class="opacity-[0.4]">{{t('public.more')}}</span>
          </div>
        </div>
      </div>

    </div>
    <div class="w-full mt-[20px]">
      <div class="text-[18px] text-[#FF964E] mb-[19px]">{{ t('public.latest') }} pancake swap
        {{ t('public.message') }}
      </div>
      <div class="h-[320px] relative">
        <vue3-seamless-scroll :list="list" direction="up" :step="0.15" :wheel="true" class="w-full  space-y-[20px]  overflow-hidden h-full list">
          <div class="w-full" v-for="item in list">
            <div class="text-[18px] text-[#605D75]">2024/10/15 17:54:52</div>
            <div class="text-[18px] text-[#FF964E] mt-[12px] opacity-[0.7]">0x987***58964 使用11.061866065222256 USDT 交换
              959.0523296531131686
            </div>
            <div class="text-[18px] text-[var(--color-text)] mt-[16px]">0x987***58964 使用11.061866065222256 USDT 交换
              959.0523296531131686
            </div>
          </div>
        </vue3-seamless-scroll>
        <div class="absolute bottom-2 right-2" v-if="list.length > 4">
          <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[var(--input-border-color)]  bg-[var(--node-card-bg)] flex items-center justify-center rounded-[5px]" v-ripple @click="showMore = true">
            <span class="opacity-[0.4]">{{t('public.more')}}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <pop-window :title="t('public.more')" v-model:show="showMore" :showLine="false">
    <div class="w-[95%] space-y-4 min-h-[300px] max-h-[600px]">
      <div class="text-[22px] text-[#605D75] w-full flex items-center justify-between" v-for="item in 10">
        <span>{{t('robot.SubWalletsAddress')}}</span>
        <span>0xBbc***4Af83</span>
      </div>
    </div>
  </pop-window>
</template>

<script setup lang="ts">
import NormalRobot from "views/watch-robot/robot-content/normal-robot.vue";
import ProfessionRobot from "views/watch-robot/robot-content/profession-robot.vue";
import {useI18n} from "vue-i18n";
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import PopWindow from "@/components/pop-window.vue";
import {nowSelectedRobot} from "views/watch-robot/comment";
import {useAccount, useReadContract} from "@wagmi/vue";
import abi from '@/localinfo/all.json'
import {ethers} from "ethers";

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;
const {t} = useI18n() // 解构出t方法

const showMore = ref(false);

const list = ['item1', 'item2', 'item3']
const {address} = useAccount()
const token_bal = (useReadContract({
  address: abi[netWord_id]["ttoken"].address,//用了wagmi后，异步莫名不给用，不能改成活的，对于前端我也不熟，看怎么处理。
  abi: abi[netWord_id]["ttoken"].abi,
  functionName: 'balanceOf',
  args: [address]
}).data)

</script>

<style lang="scss" scoped>

</style>
