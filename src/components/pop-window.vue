<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[80vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col">
      <div class="w-full flex items-center justify-between" v-if="showTitle">
        <div class="text-[21px]">{{title}}</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]" v-if="showTitle"></div>
      <div class="flex-1 overflow-y-auto">
        <slot/>
      </div>
    </div>
  </var-popup>
</template>

<script setup lang="ts">
type Props = {
  title:string,
  show:boolean,
  showTitle:boolean,
}
const props = withDefaults(defineProps<Props>(),{
  title: "标题",
  show:false,
  showTitle:true,
})

const emit = defineEmits(['update:show'])


const showPop = computed({
  get(){
    return props.show
  },
  set(value){
    emit('update:show',value)
  }
})


</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
:deep(.var-counter__input){
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[#1D1A2A] text-[24px];
}
</style>
