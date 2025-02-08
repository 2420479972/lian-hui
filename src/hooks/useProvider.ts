import {useSwapInfo} from "store/swap.ts";
import {ethers} from "ethers";

export const useProvider = ()=>{
    const swapStore = useSwapInfo();
    let provider: any = swapStore.provider;
    watch(() => swapStore.etherInfo.selectedNodeUrl, (newVal) => {
        provider = swapStore.provider = new ethers.JsonRpcProvider(newVal)
    }, {
        immediate: true,
        deep: true,
    })
    return {
        provider
    }
}