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
    <input readonly type="text" class="w-full mt-[10px] rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200">
  </div>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      {{t('robot.newTreading')}}
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[302px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200">
      <div class="space-x-[8px] flex items-center text-[18px]">
        <div class="w-[100px] h-[45px] border-[2px] px-[5px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple  @click="emit('now-type-status',{type:'normal',status:false})">
          {{t('robot.stopListening')}}
        </div>
        <div class="w-[100px] h-[45px] text-[#3481D7] px-[5px] bg-[rgba(52,129,215,0.1)] flex items-center justify-center rounded-[5px]"  v-ripple @click="emit('now-type-status',{type:'normal',status:true})">
          {{t('robot.startListening')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["now-type-status"]);
import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法
</script>

<style lang="scss" scoped>

</style>
