<template>
  <input type="text" class="w-full mt-[15px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[var(--input-border-color)] outline-0 px-[15px]" placeholder="0xBbc***4Af83">
  <div class="mt-[28px] w-full">
    <div class="min-h-[136px] w-full bg-[rgba(122,120,131,0.05)] rounded-[5px] py-[31px] px-[21px] flex items-center space-x-[18px]" @click="showAccountSetting = true">
      <div class="h-[80px] w-[80px]">
        <img class="h-full w-full" :src="nowSelectedRobot == 'normal' ? NormalImage : ProfessionImage" alt="">
      </div>
      <div class="flex-1 h-full flex flex-col justify-between">
        <div class="flex items-center space-x-[7px]">
          <div class="text-[24px]">{{nowSelectedRobot == 'normal' ? t('public.ordinaryRobot') : t('public.professionalRobot')}}</div>
          <div class="h-[24px] w-[24px]">
            <img class="h-full w-full" src="/images/watch-robot/wenhao.png" alt="">
          </div>
        </div>
        <div class="text-[18px]  opacity-[0.4]">
          {{t('robot.watchSetting')}}
        </div>
      </div>
    </div>
  </div>
  <account-setting v-bind="$attrs" v-model:show="showAccountSetting" ></account-setting>
</template>

<script setup lang="ts">
import NormalImage from "/images/watch-robot/normal-robot.png"
import ProfessionImage from "/images/watch-robot/profession-robot.png"
import AccountSetting from "views/watch-robot/watch-setting/account-setting.vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法
import {nowSelectedRobot} from "views/watch-robot/comment";

const showAccountSetting = ref(false)

</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
</style>
