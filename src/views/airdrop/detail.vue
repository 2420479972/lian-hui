<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[90vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">{{t('public.detail')}}</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
      <div class="flex-1 overflow-y-auto">
        <div class="w-full">
          <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[17px] p-[16px] bg-[#141934] text-[##297EFE] space-y-1">
            {{t('airdrop.address')}}
          </div>
          <template v-for="item in detailsTextList" :key="item.key">
            <div class="w-full mt-[24px] flex items-center justify-between">
              <div class="text-[21px] opacity-[0.4]">{{t('airdrop.' + item.label)}}</div>
              <div class="text-[21px]">100000000枚/否</div>
            </div>
          </template>

          <div class="w-full mt-[24px]">
            <div class="text-[21px] opacity-[0.4]">{{t('airdrop.tokenIntroduction')}}</div>
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
          <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-solid rounded-[10px]" :style="{background:'#919094',color:'#303030'}" v-ripple>{{t('airdrop.getItNow')}}</button>
          <div class="mt-[14px]">
            <div class="text-[16px] text-[#605D75]">
              {{t('airdrop.receiveTheAirdrop')}}
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

import {useI18n} from "vue-i18n";

const { t } = useI18n() // 解构出t方法

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

const detailsTextList = [
  {
    label:'totalVolume',
    key:"",
    value:'100000000枚',
  },
  {
    label:'totalAirdrop',
    key:"",
    value:'100000000枚',
  },
  {
    label:'numberOfAirdrops',
    key:"",
    value:'100000000枚',
  },
  {
    label:'holdingAddress',
    key:"",
    value:'100000000枚',
  },
  {
    label:'airdropContract',
    key:"",
    value:'100000000枚',
  },
  {
    label:'lpContract',
    key:"",
    value:'100000000枚',
  }
]

</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
:deep(.var-counter__input){
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[#1D1A2A] text-[24px];
}
</style>
