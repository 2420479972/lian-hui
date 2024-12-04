<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[90vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col content">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">{{t('airdrop.launchAirdrop')}}</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="flex items-center space-x-[20px] mt-[38px] mb-[20px]">
        <div class="flex items-center space-x-[9px]">
          <div class="h-[25px] w-[25px] rounded-full bg-[#143A39] flex items-center justify-center">
            <div class="h-[11px] w-[11px] bg-[#1CE89F] rounded-full"></div>
          </div>
          <div class="text-[22px]">BSC</div>
        </div>
        <div class="flex items-center space-x-[9px]">
          <div class="h-[25px] w-[25px] rounded-full bg-[#666] flex items-center justify-center">
            <div class="h-[11px] w-[11px] bg-[#0D081A] rounded-full"></div>
          </div>
          <div class="text-[22px]">ETH</div>
        </div>

      </div>
      <div class="flex-1 overflow-y-auto">
        <div class="space-y-[35px] pt-[18px]">
          <div class="space-y-[18px]" v-for="item in formList" :key="item.key">
            <div class="w-ful">
              <div class="text-[18px] opacity-[0.4]">{{t( 'airdrop.' + item.label)}}</div>
            </div>
            <div class="flex items-center space-x-[14px]">
              <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" :placeholder="t( 'public.please') + t( 'airdrop.' + item.label)">
            </div>
          </div>
        </div>
        <div class="space-y-[18px] mt-[35px]">
          <div class="w-full flex items-center space-x-[14px]">
            <div class="text-[18px] opacity-[0.4]">{{t('airdrop.inputAirdropContract')}}</div>
            <div class="text-[16px] text-[#605D75]">{{t('airdrop.inputTip')}}</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <div class="w-[100px] text-[21px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple>
              {{t('public.generate')}}
            </div>
            <input type="text" class="flex-1 rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="">
          </div>
        </div>
        <div class="w-full mt-[24px]">
          <div class="text-[21px] opacity-[0.4]">{{t('airdrop.introductionToInputTokens')}}</div>
        </div>
        <textarea :placeholder="t('airdrop.introductionToInputTokens')" class="w-full outline-0 min-h-[98px] bg-[rgba(122,120,131,0.05)] px-[14px] py-[10px] mt-[18px] rounded-[5px]"></textarea>
        <div class="space-x-[22px] flex items-center mt-[18px]">
          <div class="w-ful">
            <div class="text-[18px] opacity-[0.4]">{{t('airdrop.whetherToHold')}}ERC20</div>
          </div>
          <div class="flex items-center space-x-[14px] w-[207px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" :placeholder="t('airdrop.numberOfTokens')">
          </div>
          <div class="text-[18px] opacity-[0.4]">{{t('public.gold')}}</div>
        </div>
        <div class="space-x-[22px] flex items-center mt-[18px]">
          <div class="w-ful">
            <div class="text-[18px] opacity-[0.4]">{{t('airdrop.pickUpAtASingleAddress')}}</div>
          </div>
          <div class="flex items-center space-x-[14px] w-[80px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placehold>
          </div>
          <div class="text-[18px] opacity-[0.4]">{{t('airdrop.hoursDay')}}</div>
          <div class="flex items-center space-x-[14px] w-[80px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]">
          </div>
          <div class="text-[18px] opacity-[0.4]">{{t('public.times')}}</div>
        </div>
      </div>
      <div class="mt-[27px]">
        <div class="w-full flex items-center justify-center flex-col">
          <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F]  text-[#0D3728] border-[3px] border-solid rounded-[10px]" :style="{background:'#1CE89F',color:'#303030'}" v-ripple>{{t('airdrop.confirmRelease')}}</button>
          <div class="mt-[14px]">
            <div class="text-[16px] text-[#605D75]">
              {{t('airdrop.defray')}} XXXUSDT
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script setup lang="ts">
type Props = {
  show:boolean
}
import {useI18n} from "vue-i18n";

const { t } = useI18n() // 解构出t方法



const props = withDefaults(defineProps<Props>(),{
  show:false
})

const emit = defineEmits(['update:show'])

const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show',val)
  }
})


const formList = [
  {
    label:'inputTokenName',
    key:"",
  },
  {
    label:'inputAirdropQuantity',
    key:"",
  },
  {
    label:'inputAirdropQuantityCopy',
    key:"",
  },
  {
    label:'inputTokenAddress',
    key:"",
  },

]


</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
:deep(.var-counter__input){
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[#1D1A2A] text-[24px];
}
.content{
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
