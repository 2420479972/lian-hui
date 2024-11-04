<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[90vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">详情</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
      <div class="flex-1 overflow-y-auto">
        <div class="w-full">
          <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[17px] p-[16px] bg-[#141934] text-[##297EFE] space-y-1">
            单个地址领取XX小时/X天/X次 <br/> 是否持有XXX币，有可领，无不可领
          </div>
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.4]">总量/增发</div>
            <div class="text-[21px]">100000000枚/否</div>
          </div>
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.4]">总量/增发</div>
            <div class="text-[21px]">100000000枚/否</div>
          </div>
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.4]">总量/增发</div>
            <div class="text-[21px]">100000000枚/否</div>
          </div>
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.4]">总量/增发</div>
            <div class="text-[21px]">100000000枚/否</div>
          </div>
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.4]">总量/增发</div>
            <div class="text-[21px]">100000000枚/否</div>
          </div>
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.4]">总量/增发</div>
            <div class="text-[21px]">100000000枚/否</div>
          </div>
          <div class="w-full mt-[24px]">
            <div class="text-[21px] opacity-[0.4]">代币介绍</div>
          </div>
          <div class="w-full min-h-[98px] bg-[rgba(122,120,131,0.05)] px-[14px] py-[23px] mt-[24px] rounded-[5px]">
            <div class="text-[21px] opacity-[0.4]">
              Become part of a mission-aligned communi ty stew arding the ZKs
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[27px]">
        <div class="w-full flex items-center justify-center flex-col">
          <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-solid rounded-[10px]" :style="{background:'#919094',color:'#303030'}" v-ripple>立即领取</button>
          <div class="mt-[14px]">
            <div class="text-[16px] text-[#605D75]">
              购买机器人的地址才能领取空投
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script setup lang="ts">
type Props = {
  type:'normal' | 'profession',
  show:boolean
}


enum robotType {
  normal = '普通机器人',
  profession = '专业机器人',
}

const props = withDefaults(defineProps<Props>(),{
  type: 'profession',
  show:false
})

const emit = defineEmits(['update:show'])

const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show',val)
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
