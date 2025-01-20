import {Contract, ethers} from "ethers";
import {useSwapInfo} from "store/swap.ts";
import abiinfo from "@/localinfo/abi.json";
import {Snackbar} from "@varlet/ui";

export const useSwapDemo = (walletList: any[]) => {
    // 存储 swap 事件信息
    const swapEvents = ref<any[]>([]);
    // 最后时间
    let lastTime = 0;
    // 存储 swap 事件信息// 存储 swap 事件信息
    const sub_swapEvents = ref<any[]>([]);
    // 钱包余额
    const walletBalance = ref("0");
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
    const listenStart = ref(false);
    const botStart = ref(false);


    // 交易价格限制
    const A2BPriceLimit = ref(2);
    // 交易价格下线
    const A2BLowLimit = ref(10);
// 交易价格上线
    const A2BTopLimit = ref(10);
    const B2ATopLimit = ref(10)       // 交易随机量最大值
    const B2ALowLimit = ref(1)        // 交易随机量最小值
    const B2APriceLimit = ref(2)    // 交易限制价格


    // 滑点
    const slip = ref(0);
    // 合约对象
    const contract: {
        [key: string]: Contract | undefined
    } = {
        "pairs": undefined,
        "router": undefined,
        "token0": undefined,
        "token1": undefined,
    }

    // 监听节点切换

    const swapStore = useSwapInfo();
    let provider: any = null;
    watch(() => swapStore.etherInfo.selectedNodeUrl, (newVal) => {
        provider = new ethers.JsonRpcProvider(newVal)
    }, {
        immediate: true,
        deep: true,
    })

    // 加载Swap信息
    const loadSwapInfo = async (data: any) => {
        // 与合约进行交互
        {
            contract.pairs = new Contract(
                data.s_pair_add,
                abiinfo.pairs,
                walletList[0]
            );
            contract.router = new Contract(
                data.mainrouter,
                abiinfo.router,
                walletList[0]
            );
        }
        // 获取储备金额
        let [reserve0, reserve1] = await contract.pairs.getReserves()
        //加载代币
        {
            const loadToken0 = async () => {
                let token0_add = await contract.pairs?.token0()
                contract.token0 = new Contract(
                    token0_add,
                    abiinfo.IERC20,
                    walletList[0]
                );
                let [decimals, symbol, balance] =
                    await Promise.all([contract.token0.decimals(), contract.token0.symbol(), contract.token0.balanceOf(walletList[0].address)])

                tokenAInfo.value = {
                    symbol: symbol,
                    decimals: decimals,
                    balance: ethers.formatUnits(balance, decimals),
                    address: token0_add,
                    price: Number(reserve1) / Number(reserve0)
                }
            }

            const loadToken1 = async () => {//deal token1
                let token1_add = await contract.pairs?.token1()
                contract.token1 = new Contract(
                    token1_add,
                    abiinfo.IERC20,
                    walletList[0]
                );
                let [decimals, symbol, balance] =
                    await Promise.all([contract.token1.decimals(), contract.token1.symbol(), contract.token1.balanceOf(walletList[0].address)])
                tokenBInfo.value = {
                    symbol: symbol,
                    decimals: decimals,
                    balance: ethers.formatUnits(balance, decimals),
                    address: token1_add,
                    price: Number(reserve0) / Number(reserve1)
                }
            }
            await Promise.all([
                loadToken0(), loadToken1()
            ])
        }
        const factory_add = await contract.pairs.factory()
        const factory_add2 = await contract.router.factory()
        if (factory_add != factory_add2) {
            Snackbar.success({
                content: "环境不符合要求：配对合约和路由合约不相关",
                duration: 1000,
            })
            return;
        }
        const pushSwapMessage = async (event: any) => {
            const {to, amount0In, amount1In, amount0Out, amount1Out} = event.args; // 提取参数
            //
            const block = await provider.getBlock(event.blockNumber);
            const date = new Date(block.timestamp * 1000); // 将 Unix 时间戳转换为 JS 日期
            const baseInfo = {
                transferhash: 'https://testnet.bscscan.com/tx/' + event.log.transactionHash,
                to: to,
                time: date.toLocaleString(), // 转换为本地时间格式
            }
            const info = Object.assign(baseInfo, {
                intoken: amount0In > 0 ? tokenAInfo.value.symbol : tokenBInfo.value.symbol, // 根据输入和输出判断是哪个代币
                amountin: amount0In > 0 ? ethers.formatUnits(amount0In, tokenAInfo.value.decimals) : ethers.formatUnits(amount1In, tokenBInfo.value.decimals),
                outtoken: amount0In > 0 ? tokenBInfo.value.symbol : tokenAInfo.value.symbol,
                amountout: amount0In > 0 ? ethers.formatUnits(amount1Out, tokenBInfo.value.decimals) : ethers.formatUnits(amount0Out, tokenAInfo.value.decimals),
            })
            const isToInWallets = walletList.some(wallet => wallet.address.toLowerCase() === to.toLowerCase());

            if (isToInWallets) {
                sub_swapEvents.value.push(info);
            } else {
                swapEvents.value.push(info);
                let random_num = Math.floor(Math.random() * (data.sub_number - 1)) + 1;
                if (amount0In > 0) {
                    await swap(false, walletList[random_num]);
                } else {
                    await swap(true, walletList[random_num]);
                }
            }
        }

        const listen_retry = {
            lastTime: 0,
            times: 0
        };

        const listenSwap = async () => {
            const swapListener = (
                sender: any, amount0In: any, amount1In: any, amount0Out: any, amount1Out: any, to: any, event: any
            ) => {
                console.log(`${sender} is transferring ${amount0In} to ${amount1In} to ${amount1Out} to ${amount0Out} to ${to}`);
                pushSwapMessage(event);
            };
            try {
                contract.pairs?.off("Swap", swapListener);
                // const filter = contract.pairs.filters.Swap(); // 获取 Swap 事件的过滤器
                contract.pairs?.on("Swap", swapListener);
                listenStart.value = true;
                while (listenStart.value) {
                    await wait(2000);
                }
                contract.pairs?.off("Swap", swapListener);
            } catch (error) {
                if ((listen_retry.lastTime + 3600) < Math.floor(new Date().getTime() / 1000)) {
                    listen_retry.lastTime = Math.floor(new Date().getTime() / 1000)
                    listen_retry.times = 1;
                    await wait(2000)
                    contract.pairs?.off("Swap", swapListener);
                    await listenSwap()
                } else {
                    if (listen_retry.times < 20) {
                        listen_retry.times++
                        await wait(2000)
                        contract.pairs?.off("Swap", swapListener);
                        await listenSwap()
                    } else {
                        listenStart.value = false;
                    }
                }
            }
        }

        const loadSwapEvents = async () => {
            await listenSwap()
            return
        }
        await loadSwapEvents()
    }
    // 更新余额
    const updateBalance = async () => {
        const [
            balance, t0bal, t1bal,
            [reserve0, reserve1]
        ] = await Promise.all([
            provider.getBalance(walletList[0].address),
            contract.token0?.balanceOf(walletList[0].address),
            contract.token1?.balanceOf(walletList[0].address),
            contract.pairs?.getReserves()
        ])
        walletBalance.value = ethers.formatEther(balance)
        tokenAInfo.value.balance = ethers.formatUnits(t0bal, tokenAInfo.value.decimals)
        tokenBInfo.value.balance = ethers.formatUnits(t1bal, tokenBInfo.value.decimals)

        tokenAInfo.value.price = Number(reserve1) / Number(reserve0);
        tokenBInfo.value.price = Number(reserve0) / Number(reserve1);
    }
    // 选择和发送Gas
    const checkAndSendGas = async (gas: bigint, wallet: any) => {
        let bnb = gas * ethers.parseUnits("3", "gwei") * 11n / 10n;
        let oldBalance = await provider.getBalance(wallet);
        if (oldBalance < bnb) {
            const tx = {
                to: wallet,
                value: bnb - oldBalance,
                gasPrice: ethers.parseUnits("3", "gwei")
            };
            const transactionResponse = await walletList[0].sendTransaction(tx);
            await transactionResponse.wait();
        }
    }

    //等待
    function wait(delay: number) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }


    const swap = async (trad_dire: boolean, wallet: any) => {
        let info;
        lastTime = Math.floor(new Date().getTime() / 1000);
        if (!(botStart.value && listenStart.value)) {
            return
        }
        {
            await updateBalance()
            const A2BPrice = tokenAInfo.value.price;
            if (trad_dire) {
                if (A2BPriceLimit.value > A2BPrice) {
                    console.log("out of price", "true 1A2B:", A2BPrice, "wish 1A2B:", A2BPriceLimit.value);
                    return
                }
                const min = Number(A2BLowLimit.value);  // 将字符串转换为数字
                const max = Number(A2BTopLimit.value);
                const randomValue = ethers.parseEther(String(Math.random() * (max - min) + min));
                let allow = await contract.token0?.allowance(wallet, contract.router);

                if (randomValue > await contract.token0?.balanceOf(wallet)) {
                    if (await contract.token0?.balanceOf(walletList[0]) < randomValue) {
                        return "bal0"
                    }
                    await contract.token0?.transfer(
                        wallet, randomValue, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token0?.balanceOf(wallet)) {
                        await wait(2000);
                    }
                }
                if (randomValue > allow) {
                    let gas = await contract.token0?.connect(wallet)
                        .approve.estimateGas(
                            contract.router, 2n ** 254n
                        );
                    await checkAndSendGas(
                        gas,
                        wallet
                    )
                    await contract.token0?.connect(wallet).approve(
                        contract.router, 2n ** 254n, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token0?.allowance(wallet, contract.router)) {
                        await wait(2000);
                    }
                }
                info = [
                    randomValue,
                    BigInt(Math.floor(Number(randomValue) * (100 - slip.value) * A2BPrice / 100)),
                    [await contract.pairs?.token0(), await contract.pairs?.token1()],
                    wallet,
                    9999999999
                ]
            } else {
                if (B2APriceLimit.value * A2BPrice > 1) {
                    console.log("out of price", "true 1B2A:", 1 / A2BPrice, "wish 1B2A:", B2ATopLimit.value);
                    return
                }
                const min = Number(B2ALowLimit.value);  // 将字符串转换为数字
                const max = Number(B2ATopLimit.value);
                const randomValue = ethers.parseEther(String(Math.random() * (max - min) + min));
                let allow = await contract.token1?.allowance(wallet, contract.router);

                if (randomValue > await contract.token1?.balanceOf(wallet)) {
                    if (await contract.token1?.balanceOf(walletList[0]) < randomValue) {
                        return "bal0";
                    }
                    await contract.token1?.transfer(
                        wallet, randomValue, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token1?.balanceOf(wallet)) {
                        await wait(500);
                    }
                }
                if (randomValue > allow) {
                    let gas = await contract.token1?.connect(wallet)
                        .approve.estimateGas(
                            contract.router, 2n ** 254n
                        );
                    await checkAndSendGas(
                        gas,
                        wallet
                    )
                    await contract.token1?.connect(wallet).approve(
                        contract.router, 2n ** 254n, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token1?.allowance(wallet, contract.router)) {
                        await wait(2000);
                    }
                }
                info = [
                    randomValue,
                    BigInt(Math.floor(Number(randomValue) * (100 - slip.value) / A2BPrice / 100)),
                    [await contract.pairs?.token1(), await contract.pairs?.token0()],
                    wallet,
                    9999999999
                ]
            }
            let gas = await contract.router?.connect(wallet)
                .swapExactTokensForTokensSupportingFeeOnTransferTokens.estimateGas(
                    ...info
                )
            await checkAndSendGas(
                gas,
                wallet
            )
            await contract.router?.connect(wallet).swapExactTokensForTokensSupportingFeeOnTransferTokens(
                ...info, {
                    gasPrice: ethers.parseUnits("3", "gwei")
                })
            await guiJi(trad_dire, wallet, false);
            await updateBalance()
        }
    }
    const  guiJi = async (trad_dire:boolean, wallet:any, flag:boolean) =>{
        if (trad_dire) {
            let token1_bal = await contract.token1?.balanceOf(wallet);
            if (flag && token1_bal == 0n) {
                return
            }
            while (token1_bal == 0n) {
                await wait(2000);
                token1_bal = await contract.token1?.balanceOf(wallet)
            }
            let gas = await contract.token1?.connect(wallet)
                .transfer.estimateGas(
                    walletList[0], token1_bal
                );
            await checkAndSendGas(
                gas,
                wallet
            )
            await contract.token1?.connect(wallet).transfer(
                walletList[0], token1_bal, {
                    gasPrice: ethers.parseUnits("3", "gwei")
                });
        } else {
            let token0_bal = await contract.token0?.balanceOf(wallet);
            if (flag && token0_bal == 0n) {
                return
            }
            while (token0_bal == 0n) {
                await wait(2000);
                token0_bal = await contract.token0?.balanceOf(wallet);
            }
            let gas = await contract.token0?.connect(wallet)
                .transfer.estimateGas(
                    walletList[0], token0_bal
                );
            await checkAndSendGas(
                gas,
                wallet
            )
            await contract.token0?.connect(wallet).transfer(
                walletList[0], token0_bal, {
                    gasPrice: ethers.parseUnits("3", "gwei")
                });
        }
    }

}