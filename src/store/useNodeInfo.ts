import {defineStore} from "pinia";
export const useNodeInfo = defineStore("useNodeInfo",()=>{
    const nodeList = ref([
            {
                address: 'bsc.rpc.blxrbdn',
                url: 'https://bsc.rpc.blxrbdn.com',
            },
            {
                address: 'binance.llamarpc',
                url: 'https://binance.llamarpc.com',
            },
            {
                address: 'BSC-mainnet',
                url: 'https://api.zan.top/bsc-mainnet',
            },
            {
                address: 'endpoints.omniatech',
                url: 'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
            },
            {
                address: 'binance.nodereal',
                url: 'https://binance.nodereal.io',
            },
            {
                address: 'BSC-dataseed1',
                url: 'https://bsc-dataseed1.ninicoin.io',
            },
        ]);
    return {
        nodeList
    }
},{
    persist: {
        storage:localStorage
    },
})