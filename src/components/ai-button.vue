<template>
    <div class="w-full h-full border-[4px] border-[rgba(28,232,159,0.2)] rounded-[10px] border-solid overflow-hidden" :style="{borderColor:disabled ? disabledBorderColor || 'rgba(255,255,255,0.2)' : 'rgba(28,232,159,0.2)'}">
      <div class="w-full h-full text-[24px] leading-[54px] text-center text-[#303030] whitespace-nowrap " :style="{background:disabled ? disabledColor || '#919094' : '#1CE89F'}" v-ripple="{disabled:disabled}"><slot>确认</slot></div>
    </div>
</template>

<script setup lang="ts">
type Props ={
  disabled:boolean
  disabledColor?:string
  disabledBorderColor?:string
}

withDefaults(defineProps<Props>(),{
  disabled: false,
})


</script>

<style lang="scss" scoped>

</style>
