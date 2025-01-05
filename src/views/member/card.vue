<template>
  <div class="w-full pb-[15px] ">
    <div class="text-[17px]  flex flex-wrap ">
      <div class="text-[20px] text-[#605D75]">{{type == 'normal' ? normalRobot?.info : proRobot?.info}}</div>
      <div class="mt-[28px] w-full">
        <div
            class="h-[136px] w-full bg-[rgba(122,120,131,0.05)] rounded-[5px] py-[31px] px-[21px] flex items-center space-x-[18px]"
            @click="showAccountSetting = true">
          <div class="h-[65px] w-[65px]">
            <img :src="type == 'normal' ? NormalImage : ProfessionImage" alt="" class="h-full w-full">
          </div>
          <div class="flex-1 h-full flex flex-col justify-between">
            <div class="flex items-center space-x-[7px]">
              <div class="text-[24px]">
                {{ type == 'normal' ? t('public.ordinaryRobot') : t('public.professionalRobot') }}
              </div>
              <div class="h-[24px] w-[24px]">
                <img alt="" class="h-full w-full" src="/images/watch-robot/wenhao.png">
              </div>
            </div>
            <div class="text-[18px]  opacity-[0.4]">
              2024/10/03 23:04-2024/10/30 23:04
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-[22px] w-full">
      <div v-ripple
           @click="showMake = true"
           class="w-full rounded-[5px] h-[45px] border-[2px] border-[#7A7883] bg-[rgba(122,120,131,0.05)] flex items-center justify-center space-x-1">
        <var-icon class="opacity-[0.5]" name="plus" size="20"/>
        <div class="opacity-[0.5]">{{ t('member.addRobot') }}</div>
      </div>
    </div>
  </div>
  <profession-make v-model:show="showMake" v-model:robotType="professionRobotSettingType"  v-if=" type == 'profession'" :data="proRobot"></profession-make>
  <normal-make v-else v-model:show="showMake" v-model:robotType="normalRobotSettingType" :data="normalRobot"></normal-make>
</template>

<script lang="ts" setup>
import NormalImage from "/images/watch-robot/normal-robot.png";
import ProfessionImage from "/images/watch-robot/profession-robot.png";
import ProfessionMake from "views/member/profession-make.vue";
import {useI18n} from "vue-i18n";
import NormalMake from "views/member/normal-make.vue";
import abi from "@/localinfo/all.json";
import {useAccount, useReadContract} from "@wagmi/vue";

type Props = {
  type: 'normal' | 'profession'
}

const { t } = useI18n() // 解构出t方法

const list = [
  "canBeCounterBought",
  "canBeReversed",
  "youCanSetTheTimeToBuy",
  "youCanSetTheTimeToSell",
  "theTransactionIsAFixedAmountOfACoins",
  "setAPriceLimitForBuyingAndSelling",
  "transactionSettingsACurrency",
  "subWalletsCanBeGenerated"
]

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

const {address} = useAccount()
const userInfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address as any,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'gettotalinfo',
  args: [address],
}).data as any;

const normalRobot = computed(() => userInfo.value?.vipinfo.find(item=>item.vipname == "普通机器人"))
const proRobot = computed(() => userInfo.value?.vipinfo.find(item=>item.vipname == "专业机器人"))



const professionRobotSettingType = ref<'make' | 'buy'>('make');
const normalRobotSettingType = ref<'make' | 'buy'>('make');

withDefaults(defineProps<Props>(), {
  type: 'normal'
})

const showMake = ref(false);

const showAccountSetting = ref(false)


</script>

<style lang="scss" scoped>
.content {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
