<template>
  <div class="h-[132px] relative w-full px-[62px] header flex items-center justify-center">
    <div class="w-[114px] relative flex items-center text-[var(--watch-robot-header-border-text-active)]" >
      <div class="bg-[var(--watch-robot-header-border-text-active)] absolute w-full h-[4px]"></div>
      <div class="h-[25px] w-[25px] rounded-full bg-[var(--watch-robot-header-border-text-active)] leading-[25px] text-center text-[18px] relative" @click="go('/watch-robot')">
        <span class="text-[#fff]" :style="{color:steps >=1 ? '#fff' : '#86839D'}">1</span>
        <div class="absolute -left-[100%] -top-[30px] text-[18px] whitespace-nowrap">{{t('robot.watchSwap')}}</div>
        <div class="w-[84px] h-[4px] bg-[var(--watch-robot-header-border-text-active)] absolute left-[100%] top-1/2 -translate-y-1/2"></div>
      </div>
    </div>
    <div class="w-[203px] flex relative justify-center items-center">
      <div class="bg-[var(--watch-robot-header-solid)] absolute w-full h-[4px]"></div>
      <div
          class="h-[25px] w-[25px] rounded-full bg-[var(--watch-robot-header-normal-bg)] text-[#86839D] leading-[25px] text-center text-[18px] relative" :style="{background:steps >=2 ? 'var(--watch-robot-header-border-text-active)' : '',color:steps >=2 ? 'var(--watch-robot-header-border-text-active)' : ''}"
          @click="go('/watch-setting')"
      >
        <span class="text-[#fff]" :style="{color:steps >=2 ? '#fff' : '#86839D'}">2</span>
        <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">{{t('robot.setUp')}}</div>
        <div class="w-[86px] h-[4px]  absolute  left-[100%] top-1/2 -translate-y-1/2" :style="{background:steps >=2 ? 'var(--watch-robot-header-border-text-active)' : ''}"></div>
        <div class="w-[87px] h-[4px] absolute right-[100%] top-1/2 -translate-y-1/2" :style="{background:steps >=2 ? 'var(--watch-robot-header-border-text-active)' : ''}"></div>
      </div>
    </div>
    <div class="w-[114px] relative flex justify-end items-center">
      <div class="bg-[var(--watch-robot-header-solid)] absolute w-full h-[4px]"></div>
      <div
          class="h-[25px] w-[25px] rounded-full bg-[var(--watch-robot-header-normal-bg)] text-[#86839D] leading-[25px] text-center text-[18px] relative" :style="{background:steps >=3 ? 'var(--watch-robot-header-border-text-active)' : '',color:steps >=3 ? 'var(--watch-robot-header-border-text-active)' : ''}"
          @click="go('/watch-start')"
      >
        <span class="text-[#fff]" :style="{color:steps >=3 ? '#fff' : '#86839D'}">3</span>
        <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">{{t('robot.start')}}</div>
        <div class="w-[86px] h-[4px]  absolute right-[100%] top-1/2 -translate-y-1/2" :style="{background:steps >=3 ? 'var(--watch-robot-header-border-text-active)' : ''}"></div>
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
.header {
  background:var(--watch-robot-header-bg);
  border: 2px solid;
  border-image: var(--watch-robot-header-border-color);
  border-left: none;
  border-right: none;
}
</style>
