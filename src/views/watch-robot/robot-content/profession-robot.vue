<template>
  <div class="w-full mt-[27px]">
    <div class="flex items-center justify-between  mb-[16px]">
      <div class="text-[var(--watch-robot-title)] text-[18px]">{{t('robot.LPAddress')}}</div>
      <div class="flex items-center space-x-[9px]">
        <div class="text-[18px] opacity-[0.4]  whitespace-nowrap">{{t('robot.numberOfSubWallets')}}</div>
        <input  type="text" class="w-[80px] rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[var(--input-border-color)] outline-0 px-[15px]">
      </div>
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[370px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[var(--input-border-color)] outline-0 px-[15px]" placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200">
      <div class="w-[138px] h-[45px] border-[2px] border-[var(--input-border-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]"  v-ripple>
        <template v-if="true">
          <var-loading size="small" color="#FFFFFF" class="opacity-[0.4]"/>
          <span class="text-[#605D75] text-[18px] ml-[5px]">{{t('public.loading')}}</span>
        </template>
        <span v-else>{{t('public.add')}}</span>
      </div>
    </div>


  </div>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      {{t('robot.newTreading')}}
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[302px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[var(--input-border-color)]  outline-0 px-[15px]" placeholder="12">
      <div class="space-x-[8px] flex items-center text-[18px]">
        <div class="w-[100px] h-[45px] border-[2px] px-[5px] border-[var(--watch-robot-stop-border)] text-[var(--watch-robot-stop-text-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple  @click="emit('now-type-status',{type:'normal',status:false})">
          {{t('robot.stopListening')}}
        </div>
        <div class="w-[100px] h-[45px] border-[var(--watch-robot-start-border)]  text-[var(--watch-robot-start-text-color)] px-[5px] bg-[var(--watch-robot-start-bg)] flex items-center justify-center rounded-[5px]"  v-ripple @click="emit('now-type-status',{type:'normal',status:true})">
          {{t('robot.startListening')}}
        </div>
      </div>

    </div>
    <div class="w-full p-[13px] min-h-[85px] border-[var(--input-border-color)]  border-2 mt-[24px] space-y-4 flex justify-between items-end">
      <div class="w-[95%]">
        <div class="text-[21px] text-[var(--watch-robot-more-color)]">{{t('robot.SubWalletsAddress')}}：0xBbc***4Af83</div>
      </div>
      <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[var(--input-border-color)]  bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple @click="showMore = true">
        <span class="opacity-[0.4]">{{t('public.more')}}</span>
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
import PopWindow from "@/components/pop-window.vue";

const emit = defineEmits(["now-type-status"]);
import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法

const showMore = ref(false);

</script>

<style lang="scss" scoped>

</style>
