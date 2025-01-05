<template>
  <div class="w-full mt-[13px] flex justify-between items-center text-[18px]">
    <div @click="catRobot('normal')"
         class="w-[240px] h-[45px] bg-[var(--watch-robot--tab-bg)] rounded  leading-[45px] text-center button-shadow relative"
         v-ripple
         :style="{background:nowSelectedRobot == 'normal' ? 'var(--watch-robot--tab-bg)' :'rgba(122,120,131,0.05)',color:nowSelectedRobot == 'normal' ? 'var(--watch-robot-tab-selected)' :'' }">
      <span>{{t('public.ordinaryRobot')}}</span>
      <div class="absolute w-[35px] h-[2px] bg-[#3481D7] rounded-[1px] left-1/2 -translate-x-1/2 bottom-0"
           v-if="nowSelectedRobot == 'normal'"></div>
    </div>
    <div @click="catRobot('profession')"
         class="w-[240px] h-[45px] bg-[rgba(52,129,215,0.05)] rounded leading-[45px] text-center button-shadow"
         v-ripple
         :style="{background:nowSelectedRobot == 'profession' ? 'var(--watch-robot--tab-bg)' :'rgba(122,120,131,0.05)',color:nowSelectedRobot == 'profession' ? 'var(--watch-robot-tab-selected)' :'' }">
      <span>{{t('public.professionalRobot')}}</span>
      <div class="absolute w-[35px] h-[2px] bg-[#3481D7] rounded-[1px] left-1/2 -translate-x-1/2 bottom-0"
           v-if="nowSelectedRobot == 'profession'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useI18n} from "vue-i18n";
  import {catRobot, nowSelectedRobot} from "views/watch-robot/comment/index.ts";
  const { t } = useI18n() // 解构出t方法
</script>

<style lang="scss" scoped>

</style>
