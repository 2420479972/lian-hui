<template>
    <RouterView />
</template>

<script setup lang="tsx">
import {useAccount} from "@wagmi/vue";
const { isConnected } = useAccount()

const router = useRouter()


watch(()=>isConnected.value,(newVal)=>{
  if(newVal){
   // router.push('/home')
  }else{
    router.push('/login')
  }
})
</script>

<style lang="scss">
</style>
