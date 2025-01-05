<template>
  <div class="w-full text-[26px] text-center pt-[26px]">登陆</div>
  <div class="w-full px-[19px]">
    <div class="mt-[43px]">
      <img alt="" class="w-[102px] h-[30px]" src="/images/hot-token/logo.png">
    </div>
    <div class="mt-[21px] h-[323px] w-full">
      <img alt="" class="w-full h-full" src="/images/login/login-bg.png">
    </div>
    <div class="mt-[23px]">钱包地址</div>
    <div class="mt-[16px] flex items-center w-full rounded-[5px] h-[45px]  border-[2px] border-[#1D1A2A]">
      <div class="w-[98%]">
        <input v-model="registerAddress" class="w-full bg-transparent outline-0 px-[15px]" placeholder="0xf39F......2266"
               readonly type="text">
      </div>
    </div>
    <div class="mt-[117px]">
      <div class="w-full h-[58px]">
        <ai-button @click="determine(buttonType)">{{ ButtonType[buttonType] }}</ai-button>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import AiButton from "@/components/ai-button.vue";
import {useAccount, useChainId, useConnect, useReadContract, useWriteContract} from '@wagmi/vue'
import {metaMask} from '@wagmi/vue/connectors'
import abi from '@/localinfo/all.json'
import {Snackbar} from "@varlet/ui";



const chainId = useChainId();
// 获取钱包地址和链id以及状态
const {address, status} = useAccount()
const {connect} = useConnect()

const useDetermine = (success?:()=>void)=>{
  connect({connector: metaMask()})
  if (status.value == 'connected') {
    Snackbar.success({
      content: "链接钱包成功",
    })
    if(success && typeof success === 'function'){
      success();
    }
    return
  }
  if(status.value == "disconnected"){
    Snackbar.error({
      content: "链接钱包失败",
    })
  }
}

const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;

//获取用户和系统信息
const userinfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'gettotalinfo',
  args: [address],
}).data as any;

const registerAddress = ref();


enum ButtonType {
  disconnected = "链接钱包",
  registered = "注册钱包"
}

const buttonType = ref<keyof typeof ButtonType>('disconnected');

const init = () => {
  if (status.value == 'disconnected') {
    buttonType.value = "disconnected";
  }
}

const router = useRouter()



const determine =async (type: keyof typeof ButtonType) => {
  if (type == 'disconnected') {
    useDetermine(()=>{
       router.push('/hot-token')
      if (!userinfo.data.value.accountinfo.register_flag) {
        buttonType.value = "registered";
      }
    })
  }
  if (type == 'registered') {
    register();
  }
}

const getLink = () => {
  const hash = window.location.hash;
  const urlParams = new URLSearchParams(hash.split('?')[1]);
  registerAddress.value = urlParams.get('link') || null;
}


const {
  data: hash,
  isPending,
  error,
  writeContract
} = useWriteContract()

const register = () => {
  try {
    writeContract({
      address: abi[netWord_id]["ERC250115"].address as any,
      abi: abi[netWord_id]["ERC250115"].abi,
      functionName: 'register',
      args: [registerAddress.value],
    })
    if (isPending.value) {
      Snackbar.success({
        content: "注册中...",
      })
    }
    if (hash.value) {
      Snackbar.success({
        content: "注册成功",
      })
    }
    if (error.value) {
      Snackbar.error({
        content: "注册失败",
      })
    }

  } catch (error) {
    Snackbar.error({
      content: "注册失败",
    })
  }
}


onMounted(() => {
  init();
  getLink();
})
</script>

<style lang="scss" scoped>

</style>
