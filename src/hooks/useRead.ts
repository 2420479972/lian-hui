import {useAccount, useBlockNumber, useReadContract} from "@wagmi/vue";
import type {UseReadContractParameters} from "@wagmi/vue"

type UseReadType ={
    type?:string,
    onSuccess:(...args:any)=>any,
    onError:(...args:any)=>any,
    initParams:{
        [key:string]:any
    },
}
export const useRead = (options:UseReadType={initParams:{},onError:(...args)=>args,onSuccess:(...args)=>args,})=>{
    // const chainId = useChainId()
    const {address} = useAccount()
    const params:any = reactive<UseReadContractParameters>({
        address:"0xCafac3dD18aC6c6e92c921884f9E4176737C052c",
        functionName:'getUserInfo',
        abi:[],
        ...options.initParams,
    });

    const isLoading = ref(false);

    const {data,error,refetch,status} = useReadContract(params)

    watch(()=>status.value,(newVal)=>{
        if(newVal == 'pending'){
            isLoading.value = true;
        }
        if(newVal == "success"){
            options?.onSuccess(data);
        }else if(newVal == 'error'){
            options?.onError();
            isLoading.value = false;
        }
    },{
        deep: true,
        immediate: true,
    })

    const setParams =async (args:any[])=>{
        params.args = args
        await refetch()
    }

    const { data: blockNumber } = useBlockNumber({
        watch: true, // 监听区块变化
    });

    watch(()=>blockNumber.value,async()=>{
        if(status.value == 'success'){
            await refetch();
            isLoading.value = false
        }
    },{
        immediate:true,
        deep:true
    })

    watch(()=>address.value,(newVal)=>{
        if(!newVal) return
    },{
        immediate: true,
        deep: true
    })
    return {
        refetch,
        isLoading,
        error,
        status,
        data,
        setParams,
        params
    }
}