import {defineStore} from "pinia";
export const useSwapInfo = defineStore("swap",()=>{
    const etherInfo = reactive({
        selectedNodeUrl:"https://api.zan.top/bsc-testnet"
    })

    const isMonitor = ref(false);

    const userLpHistory = ref([]);
    const MonitorDetails = reactive({
        mnemonic:"test test test test test test test test test test test junk",
        s_pair_add:"0x36A5484DC5d52ac786137a5A2244E9010Cb419E5",
        showamount:"5",
        subNumber:"5"
    });
    return {
        etherInfo,
        isMonitor,
        userLpHistory,
        MonitorDetails
    }
},{
    persist: {
        storage:localStorage
    },
})