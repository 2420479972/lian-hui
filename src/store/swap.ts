import {defineStore} from "pinia";
export const useSwapInfo = defineStore("swap",()=>{
    const etherProvider = ref();
    const etherInfo = reactive({
        selectedNodeUrl:"https://api.zan.top/bsc-testnet"
    })
    return {
        etherProvider,
        etherInfo
    }
},{
    persist: {
        storage:localStorage
    },
})