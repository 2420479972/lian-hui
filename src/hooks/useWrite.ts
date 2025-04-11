import {useWriteContract} from "@wagmi/vue";

export const useWrite = () => {
    const {writeContractAsync, isPending,error,reset} = useWriteContract()
    const write = async () => {

        return await writeContractAsync({

        }, {
            onSuccess: async (value) => {
            },
            onError: async (_error) => {
            },
        })
    }
    return {
        isPending,
        write,
        reset
    }
}