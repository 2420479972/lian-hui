<template>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      {{t('robot.LPAddress')}}
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[370px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200">
      <div class="w-[138px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]"  v-ripple>
        <template v-if="true">
          <var-loading size="small" color="#FFFFFF" class="opacity-[0.4]"/>
          <span class="text-[#605D75] text-[18px] ml-[5px]">{{t('public.loading')}}</span>
        </template>
        <span v-else>{{t('public.add')}}</span>
      </div>
    </div>
    <div class="flex items-center space-x-[9px] mt-[10px] w-full">
      <input  type="text" class="w-[70%] rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" >
      <div class="text-[18px] opacity-[0.4]  whitespace-nowrap">{{t('robot.numberOfSubWallets')}}</div>
      <input  type="text" class="w-[100px] rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]">
    </div>

  </div>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      {{t('robot.newTreading')}}
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[302px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="12">
      <div class="space-x-[8px] flex items-center text-[18px]">
        <div class="w-[100px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple  @click="emit('now-type-status',{type:'profession',status:false})">
          {{t('robot.stopListening')}}
        </div>
        <div class="w-[100px] h-[45px] text-[#3481D7]  bg-[rgba(52,129,215,0.1)] flex items-center justify-center rounded-[5px]"  v-ripple @click="emit('now-type-status',{type:'profession',status:true})">
          {{t('robot.startListening')}}
        </div>
      </div>

    </div>
    <div class="w-full p-[13px] min-h-[85px] border-[#1D1A2A] border-2 mt-[24px] space-y-4 flex justify-between items-end">
      <div class="w-[95%]">
        <div class="text-[21px] text-[#605D75]">{{t('robot.SubWalletsAddress')}}：0xBbc***4Af83</div>
      </div>
      <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple @click="showMore = true">
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
