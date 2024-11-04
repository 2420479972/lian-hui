<template>
  <var-popup v-model:show="showPop">
    <div class="h-[80vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">{{robotType[type]}}</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
      <div class="flex-1 overflow-y-auto">
        <div class="w-full  flex items-center justify-between">
          <div class="text-[21px]">监听买卖并反向交易设置【USDT】</div>
        </div>
        <div class="mt-[21px] w-full">
          <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[15px] p-[16px] bg-[#141934] text-[##297EFE] space-y-1">
            <div class="">
              USDT 购买 ERC20代币【XXX】
            </div>
            <div class="">USDT 1 实时价格：100 ERC20代币【XXX】</div>
            <div class="">USDT 1 至少兑换多少</div>
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[18px] opacity-[0.4]">价格上/下限设置</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="上限">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="下限">
          </div>
          <template  v-if="type == 'profession'">
            <div class="w-full my-[18px]">
              <div class="text-[18px] opacity-[0.4]">单次交易数量随机上限/下限值</div>
            </div>
            <div class="flex items-center space-x-[14px]">
              <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="上限">
              <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="下限">
            </div>
            <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
          </template>
          <div class="w-full my-[18px]">
            <div class="text-[21px]">单次买卖交易数量</div>
          </div>

          <div class="flex mt-[23px] items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="买">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="卖">
          </div>

          <template v-if="type == 'profession'">
            <div class="w-full flex items-center justify-between mt-[32px]">
              <div class="text-[18px] opacity-[0.4]">设置主账户USDT买递减递增功能（%）</div>
              <var-counter v-model="value"/>
            </div>
          </template>

          <div class="w-full mt-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>

          <div class="w-full my-[18px]">
            <div class="text-[21px]">监听买卖并反向交易设置【ERC20代币】</div>
          </div>

          <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[15px] p-[16px] bg-[#141934] text-[##297EFE] space-y-1">
            <div class="">
              USDT 购买 ERC20代币【XXX】
            </div>
            <div class="">USDT 1 实时价格：100 ERC20代币【XXX】</div>
            <div class="">USDT 1 至少兑换多少</div>
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[18px] opacity-[0.4]">价格上/下限设置</div>
          </div>

          <div class="flex items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="上限">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="下限">
          </div>

          <template v-if="type == 'profession'">
            <div class="w-full my-[18px]">
              <div class="text-[18px] opacity-[0.4]">单次交易数量随机上限/下限值</div>
            </div>
            <div class="flex items-center space-x-[14px]">
              <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="上限">
              <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="下限">
            </div>
            <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
          </template>

          <div class="w-full my-[18px]">
            <div class="text-[21px]">单次买卖交易数量</div>
          </div>

          <div class="flex mt-[23px] items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="买">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="卖">
          </div>

          <template  v-if="type == 'profession'">
            <div class="w-full flex items-center justify-between mt-[32px]">
              <div class="text-[18px] opacity-[0.4]">设置主账户USDT买递减递增功能（%）</div>
              <var-counter v-model="value"/>
            </div>
          </template>
        </div>
      </div>
      <div class="mt-[27px]">
        <div class="w-full flex items-center justify-center">
          <div class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-[rgba(28,232,159,0.2)] rounded-[10px]" v-ripple>确定</div>
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
