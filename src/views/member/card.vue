<template>
  <div class="w-full py-[15px] ">
    <div class="text-[17px]  flex flex-wrap ">
      <template v-for="(item,index) in list.slice(0,type == 'normal' ? 6 : list.length)">
        <div class="space-x-1 flex items-center mr-[18px] mb-[21px]">
          <div
              class="h-[22px] w-[22px] leading-[20px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">
            {{ index + 1 }}
          </div>
          <div class="text-[20px] text-[#605D75]">{{ t('member.' + item) }}</div>
        </div>
      </template>

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
                <img alt="" class="h-full w-full" src="assets/images/watch-robot/wenhao.png">
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
           class="w-full rounded-[5px] h-[45px] border-[2px] border-[#7A7883] bg-[rgba(122,120,131,0.05)] flex items-center justify-center space-x-1">
        <var-icon class="opacity-[0.5]" name="plus" size="20"/>
        <div class="opacity-[0.5]" @click="showMake = true">{{ t('member.addRobot') }}</div>
      </div>
    </div>
  </div>
  <profession-make v-model:show="showMake" :robotType="robotSettingType" :type="type"></profession-make>
</template>

<script lang="ts" setup>
import NormalImage from "assets/images/watch-robot/normal-robot.png";
import ProfessionImage from "assets/images/watch-robot/profession-robot.png";
import ProfessionMake from "views/member/profession-make.vue";
import {useI18n} from "vue-i18n";

type Props = {
  type: 'normal' | 'profession'
}

const {t} = useI18n() // 解构出t方法


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

const robotSettingType = ref('buy');

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
