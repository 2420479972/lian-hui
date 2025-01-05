<template>
  <div class="w-full mt-[27px]">
    <div class="text-[18px] mb-[16px] text-[var(--watch-robot-title)]">
      {{t('robot.LPAddress')}}
    </div>
    <div class="w-full flex items-center space-x-2">
      <z-form-item placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200"></z-form-item>
      <div class="w-[138px] h-[45px] border-[2px] border-[var(--input-border-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]"  v-ripple>
        <template v-if="true">
          <var-loading size="small" color="#FFFFFF" class="opacity-[0.4]"/>
          <span class="text-[#605D75] text-[18px] ml-[5px]">{{t('public.loading')}}</span>
        </template>
        <span v-else>{{t('public.add')}}</span>
      </div>
    </div>
    <z-form-item placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200" readonly class="mt-1"></z-form-item>
  </div>
  <div class="w-full mt-[27px]">
    <div class=" text-[18px] mb-[16px] text-[var(--watch-robot-title)]">
      {{t('robot.newTreading')}}
    </div>
    <div class="w-full flex items-center space-x-2">
      <z-form-item placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200" ></z-form-item>
      <div class="space-x-[8px] flex items-center text-[18px]">
        <div class="w-[100px] h-[45px] border-[2px] px-[5px] border-[var(--watch-robot-stop-border)] text-[var(--watch-robot-stop-text-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple  @click="emit('now-type-status',{type:'normal',status:false})">
          {{t('robot.stopListening')}}
        </div>
        <div class="w-[100px] h-[45px] border-[var(--watch-robot-start-border)]  text-[var(--watch-robot-start-text-color)] px-[5px] bg-[var(--watch-robot-start-bg)] flex items-center justify-center rounded-[5px]"  v-ripple @click="emit('now-type-status',{type:'normal',status:true})">
          {{t('robot.startListening')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ZFormItem from "@/components/z-form-item.vue";

const emit = defineEmits(["now-type-status"]);
import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法
</script>

<style lang="scss" scoped>

</style>
