import {defineStore} from "pinia";
export const useSwapInfo = defineStore("swap",()=>{
    const etherInfo = reactive({
        selectedNodeUrl:"https://data-seed-prebsc-2-s1.bnbchain.org:8545"
    })

    const watchSettings = ref({
        A2BPriceLimit:2,
        B2APriceLimit:2,
        A2BTopLimit:10,
        A2BLowLimit:10,
        B2ATopLimit:10,
        B2ALowLimit:10
    })

    const watchStartSettings = ref({
        slip:2,
        startTime:0,
        endTime:0,
        autoTime:0,
    })

    const isMonitor = ref(false);

    const userLpHistory = ref([]);
    const monitorDetails = reactive({
        mnemonic:"test test test test test test test test test test test junk",
        s_pair_add:"0x36A5484DC5d52ac786137a5A2244E9010Cb419E5",
        showAmount:5,
        subNumber:5
    });

    const provider = ref();

    const swapEvents = ref<any[]>([
        {
            to: "0x8C327f1Aa6327F01A9A74cEc696691cEAAc680e2",
            intoken: "tusdt",
            amountin: 1.1,
            outtoken: "ttoken",
            amountout: 2.2,
            transferhash: "456",
            time: (new Date()).toLocaleString()
        },
        {
            to: "0x8C327f1Aa6327F01A9A74cEc696691cEAAc680e2",
            intoken: "tusdt",
            amountin: 1.2,
            outtoken: "ttoken",
            amountout: 2.2,
            transferhash: "456",
            time: (new Date()).toLocaleString()
        }
    ]);

    const subSwapEvents = ref<any[]>([
        {
            to: "0x8C327f1Aa6327F01A9A74cEc696691cEAAc680e2",
            intoken: "tusdt",
            amountin: 1.1,
            outtoken: "ttoken",
            amountout: 2.2,
            transferhash: "456",
            time: (new Date()).toLocaleString()
        },
        {
            to: "0x1b61b764d8ae1c3A9ebB3E590F21042367174AA4",
            intoken: "tusdt",
            amountin: 1.2,
            outtoken: "ttoken",
            amountout: 2.2,
            transferhash: "456",
            time: (new Date()).toLocaleString()
        }
    ]);


    const getSwapEvents = computed(()=>{
        return swapEvents.value
    })

    const getSubSwapEvents = computed(()=>{
        return subSwapEvents.value
    })

    // 代币A信息
    const tokenAInfo = ref<any>({
        symbol: '',
        balance: ''
    });

    // 代币B信息
    const tokenBInfo = ref<any>({
        symbol: '',
        balance: ''
    });

    const getTokenAInfo = computed(()=>tokenAInfo.value)
    const getTokenBInfo = computed(()=>tokenBInfo.value)
    return {
        etherInfo,
        isMonitor,
        userLpHistory,
        monitorDetails,
        provider,
        swapEvents,
        subSwapEvents,
        getSwapEvents,
        getSubSwapEvents,
        tokenAInfo,
        tokenBInfo,
        getTokenAInfo,
        getTokenBInfo,
        watchSettings,
        watchStartSettings
    }
},{
    persist: {
        storage:localStorage,
    },
})