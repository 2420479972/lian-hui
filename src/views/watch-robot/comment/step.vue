<template>
  <div class="h-[132px] relative w-full px-[62px] header flex items-center justify-center">
    <div class="w-[114px] relative flex items-center">
      <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
      <div class="h-[25px] w-[25px] rounded-full bg-[#3481D7] leading-[25px] text-center text-[18px] relative" @click="go('/watch-robot')">
        <span>1</span>
        <div class="absolute -left-[100%] -top-[30px] text-[18px] whitespace-nowrap">{{t('robot.watchSwap')}}</div>
        <div class="w-[84px] h-[4px] bg-[#3481D7] absolute left-[100%] top-1/2 -translate-y-1/2"></div>
      </div>
    </div>
    <div class="w-[203px] flex relative justify-center items-center">
      <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
      <div
          class="h-[25px] w-[25px] rounded-full bg-[#22222F] text-[#86839D] leading-[25px] text-center text-[18px] relative" :style="{background:steps >=2 ? '#3481D7' : '',color:steps >=2 ? '#fff' : ''}"
          @click="go('/watch-setting')"
      >
        <span>2</span>
        <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">{{t('robot.setUp')}}</div>
        <div class="w-[85px] h-[4px]  absolute  left-[100%] top-1/2 -translate-y-1/2" :style="{background:steps >=2 ? '#3481D7' : ''}"></div>
        <div class="w-[85px] h-[4px] absolute right-[100%] top-1/2 -translate-y-1/2" :style="{background:steps >=2 ? '#3481D7' : ''}"></div>
      </div>
    </div>
    <div class="w-[114px] relative flex justify-end items-center">
      <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
      <div
          class="h-[25px] w-[25px] rounded-full bg-[#22222F] text-[#86839D] leading-[25px] text-center text-[18px] relative" :style="{background:steps >=3 ? '#3481D7' : '',color:steps >=3 ? '#fff' : ''}"
          @click="go('/watch-start')"
      >
        <span>3</span>
        <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">{{t('robot.start')}}</div>
        <div class="w-[84px] h-[4px]  absolute right-[100%] top-1/2 -translate-y-1/2" :style="{background:steps >=3 ? '#3481D7' : ''}"></div>
      </div>
    </div>
    <div class="absolute flex items-center space-x-2 left-[44px] bottom-[15px] text-[15px] opacity-[0.4]">
      <var-icon name="alert-circle-outline"/>
      <div class="">{{t('robot.watchTip')}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法
type Props ={
  steps: number;
}

withDefaults(defineProps<Props>(),{
  steps: 1,  // 初始步骤
})

const router = useRouter()

const go = (path: string) => {
  router.push(path)
}

</script>

<style lang="scss" scoped>

</style>
