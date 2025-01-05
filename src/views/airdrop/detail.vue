<template>
  <pop-window v-model:show="showPop" :title="t('public.detail')" :show-line="false">
    <div class="flex-1 overflow-y-auto">
      <div class="w-full">
        <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[17px] p-[16px] bg-[var(--pop-text-bg)] text-[##297EFE] space-y-1">
          {{t('airdrop.address')}}
        </div>
        <template v-for="item in detailsTextList" :key="item.key">
          <div class="w-full mt-[24px] flex items-center justify-between">
            <div class="text-[21px] opacity-[0.5]">{{t('airdrop.' + item.label)}}</div>
            <div class="text-[21px] opacity-[0.5]">{{item.format(data[item.key])}}</div>
          </div>
        </template>
        <div class="w-full mt-[24px]">
          <div class="text-[21px] opacity-[0.4]">{{t('airdrop.tokenIntroduction')}}</div>
        </div>
        <div class="w-full min-h-[98px] bg-[rgba(122,120,131,0.05)] px-[14px] py-[23px] mt-[24px] rounded-[5px]">
          <div class="text-[21px] opacity-[0.4]">
            {{data["token_introduce"]}}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-[27px]">
      <div class="w-full flex items-center justify-center flex-col">
        <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center  border-[3px] border-solid rounded-[10px]" @click="receiveAirdrop" :style="{background:'var(--airdrop-card-disabled)',color:'var(--airdrop-card-dis-text)'}" v-ripple>{{t('airdrop.getItNow')}}</button>
        <div class="mt-[14px]">
          <div class="text-[16px] text-[#605D75]">
            {{t('airdrop.receiveTheAirdrop')}}
          </div>
        </div>
      </div>
    </div>
  </pop-window>
</template>

<script setup lang="ts">
import PopWindow from "@/components/pop-window.vue";

type Props = {
  type:'normal' | 'profession',
  show:boolean,
  data:any
}

import {useI18n} from "vue-i18n";
import {formatAddress, getNumber} from "utils/base.ts";
import {useWriteContract} from "@wagmi/vue";
import abi from "@/localinfo/all.json";
import {Snackbar} from "@varlet/ui";

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

const { t } = useI18n() // 解构出t方法

const props = withDefaults(defineProps<Props>(),{
  type: 'profession',
  show:false,
  data:()=>({})
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
    label:'tokenContractAddress',
    key:"coin",
    format(value:string){
      return formatAddress(value)
    }
  },
  {
    label:'tokenName',
    key:"name",
    format(value:string){
      return value
    }
  },
  {
    label:'tokenAbbreviation',
    key:"symbol",
    format(value:string){
      return value
    }
  },
  {
    label:'lPValue',
    key:"lpprice",
    format(value:BigInt){
      return getNumber(value)
    }
  },
  {
    label:'tokenPrice',
    key:"price",
    format(value:BigInt){
      return getNumber(value)
    }
  },
  {
    label:'totalSupply',
    key:"total_supply",
    format(value:BigInt){
      return getNumber(value)
    }
  },
  {
    label:'totalNumberOfCopies',
    key:"total_copies",
    format(value:BigInt){
      return getNumber(value)
    }
  },

]
const {
  isPending,
  writeContract,
} = useWriteContract()

const receiveAirdrop = ()=>{
  if(isPending.value) return; // 防止多次点击
  Snackbar.loading({
    content: '领取中...',
  })
  // 接收空投的逻辑
  writeContract({
    address: abi[netWord_id]["ERC250115"].address as any,
    abi: abi[netWord_id]["ERC250115"].abi,
    functionName: 'get_airdrop',
    args: [props.data.index],
  },{
    onError(data){
      console.error('领取空投失败',data)
      Snackbar.error({
        content: '领取失败',
      });
    },
    onSuccess(){
      Snackbar.success({
        content: '领取成功',
      });
    }
  })
}


</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
:deep(.var-counter__input){
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[#1D1A2A] text-[24px];
}
</style>
