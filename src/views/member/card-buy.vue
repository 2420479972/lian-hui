<template>
  <pop-window v-model:show="showPop" :show-line="false" title="">
    <div class="min-h-[383px] w-full">
      <div class="flex justify-center items-center flex-col">
        <img :src="getResource('member',data.vipname + '.png') as string" alt="" class="w-[60px]">
        <div class="text-[25px] mt-[17px] whitespace-nowrap">{{ data.vipname }}</div>

        <div class="relative px-[10px] mt-[25px]">
          <span class="absolute right-[100%] bottom-0 whitespace-nowrap">金额:</span>
          <span class="text-[42px] font-bold text-[#D7AF34]">{{ price }}</span>
          <div class="absolute bottom-0 left-[100%] text-[#fff] whitespace-nowrap">USD</div>
        </div>
        <div class="bg-[rgba(255,255,255,0.03)] mt-[31px]  w-full py-[17px] px-[13px] text-[18px] text-[#605D75]">
          <div class="">有效期：{{ validityPeriod }}</div>
          <div class="mt-[15px]">权益：{{ data.info }}</div>
        </div>
        <div class="mt-[30px] flex items-center space-x-3 justify-center">
          <div
              v-ripple
              class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[var(--watch-start-stop-bg)] text-[#303030] border-[3px] border-[rgba(255,255,255,0.2)] rounded-[10px]"
              @click="showPop = false">取消
          </div>
          <div
              v-ripple
              class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[var(--member-confirm-bg)] text-[var(--airdrop-card-dis-text)] border-[3px] border-[rgba(28,232,159,0.2)] rounded-[10px]"
              @click="buyRobot">立即购买
          </div>
        </div>
      </div>
    </div>
  </pop-window>
</template>

<script lang="ts" setup>
import PopWindow from "@/components/pop-window.vue";
import {getResource} from "utils/getFile.ts";
import {useAccount, useReadContract, useWriteContract} from "@wagmi/vue";
import abi from "@/localinfo/all.json";
import {ethers} from "ethers";
import {Snackbar} from "@varlet/ui";

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

const {address} = useAccount()

type Props = {
  price: number,
  validityPeriod: string,
  show: boolean,
  id: string,
  data: {
    vipname?: string,
    info?: string,
  },
}


const props = withDefaults(defineProps<Props>(), {
  price: 0,
  show: false,
  data: () => ({})
})

const emit = defineEmits(['update:show'])

const showPop = computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show', value)
  }
})

const userinfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address as any,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'gettotalinfo',
  args: [address],
}).data


//获取付费代币余额
const token_bal = (useReadContract({
  address: abi[netWord_id]["ttoken"].address as any,
  abi: abi[netWord_id]["ttoken"].abi,
  functionName: 'balanceOf',
  args: [address]
}).data)

//获取授权额度
const app_bal = (useReadContract({
  address: abi[netWord_id]["ttoken"].address as any,
  abi: abi[netWord_id]["ttoken"].abi,
  functionName: 'allowance',
  args: [address, abi[netWord_id]["robot"].address],
}).data)

const {
  isPending,
  writeContract,
} = useWriteContract()
const buyRobot = async () => {
  if (Number(ethers.formatEther(token_bal.value)) < Number(props.price)) {
    Snackbar.error({
      content: "余额不足！",
      duration: 1000,
    })
    if (Number(ethers.formatEther(app_bal.value)) < Number(props.price)) {
      Snackbar.error({
        content: "授权额度不足，请授权！",
        duration: 1000,
      })
      writeContract({
        address: userinfo.value?.accountinfo?.usdt,
        abi: abi[netWord_id]["ttoken"].abi,
        functionName: 'approve',
        args: [abi[netWord_id]["ERC250115"].address, ethers.parseEther(String(props.price))],
      }, {
        onSuccess(data, variables) {
          if(Number(ethers.formatEther(app_bal.value)) > Number(props.price)){
            Snackbar.success({
              content: "授权成功",
              duration: 1000,
            })
            buyVip()
          }
        },
        onError(error, variables) {
          Snackbar.error({
            content: "授权失败！",
            duration: 1000,
          })
          return;
        },
      })
    }
    buyVip()
    return;
  }
  buyVip()
}

const buyVip = () => {
  Snackbar.loading('正在购买中...')
  writeContract({
    address: abi[netWord_id]["ERC250115"].address,
    abi: abi[netWord_id]["ERC250115"].abi,
    functionName: 'pay_paid_plan',
    args: [props.id],
  }, {
    onSuccess(data, variables) {
      Snackbar.success({
        content: "购买成功",
        duration: 1000,
      })
    },
    onError(error, variables) {
      console.log(error)
      Snackbar.error({
        content: "购买失败！",
        duration: 1000,
      })
      return;
    },
  })
}


</script>

<style lang="scss" scoped>
</style>
