import {Contract, ethers} from "ethers";
import abiinfo from "@/localinfo/abi.json";
import {Snackbar} from "@varlet/ui";
import {useProvider} from "@/hooks/useProvider.ts";
import {useSwapInfo} from "store/swap.ts";

export const useSwapDemo = () => {
    const swapStore = useSwapInfo();
    const watchSetting = swapStore.watchSettings
    const walletList:any = [];
    
    const botRetry = {
        lastTime: 0,
        times: 0
    };

    const settingParams = swapStore.watchStartSettings

    // 最后时间
    let lastTime = 0;

    // 钱包余额
    const walletBalance = ref("0");

    const listenStartFlag = ref(false);
    const listenStartLoading = ref(false);
    const botStartFlag = ref(false);

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
    const {provider} = useProvider()
    // 加载Swap信息
    const loadSwapInfo = async (data: any) => {
        // 与合约进行交互
        if (walletList.length === 0) {
            Snackbar.error({
                content: "请先链接钱包！",
                duration: 1000,
            })
            return;
        }
        listenStartLoading.value = true;
        {
            contract.pairs = new Contract(
                data.s_pair_add,
                abiinfo.pairs,
                walletList[0]
            )

            contract.router = new Contract(
                data.mainRouter,
                abiinfo.router,
                walletList[0]
            )
        }
        // 获取储备金额
        const [reserve0, reserve1] = await contract.pairs?.getReserves();
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
                swapStore.tokenAInfo.value = {
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
                swapStore.tokenBInfo.value = {
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
            Snackbar.error({
                content: "环境不符合要求：配对合约和路由合约不相关",
                duration: 1000,
            })
            return;
        }

        const pushSwapMessage = async (event: any) => {
            const {to, amount0In, amount1In, amount0Out, amount1Out} = event.args; // 提取参数
            const block = await provider.getBlock(event.blockNumber);
            const date = new Date(block.timestamp * 1000); // 将 Unix 时间戳转换为 JS 日期
            const baseInfo = {
                transferhash: 'https://testnet.bscscan.com/tx/' + event.log.transactionHash,
                to: to,
                time: date.toLocaleString(), // 转换为本地时间格式
            }

            const info = Object.assign(baseInfo, {
                intoken: amount0In > 0 ? swapStore.tokenAInfo.value.symbol : swapStore.tokenBInfo.value.symbol, // 根据输入和输出判断是哪个代币
                amountin: amount0In > 0 ? ethers.formatUnits(amount0In, swapStore.tokenAInfo.value.decimals) : ethers.formatUnits(amount1In, swapStore.tokenBInfo.value.decimals),
                outtoken: amount0In > 0 ? swapStore.tokenBInfo.value.symbol : swapStore.tokenAInfo.value.symbol,
                amountout: amount0In > 0 ? ethers.formatUnits(amount1Out, swapStore.tokenBInfo.value.decimals) : ethers.formatUnits(amount0Out, swapStore.tokenAInfo.value.decimals),
            })
            const isToInWallets = walletList.some((wallet:any) => wallet.address.toLowerCase() === to.toLowerCase());

            if (isToInWallets) {
                swapStore.subSwapEvents.push(info);
            } else {
                swapStore.swapEvents.push(info)
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
                listenStartFlag.value = true;
                listenStartLoading.value = false;
                while (listenStartFlag.value) {
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
                        listenStartFlag.value = false;
                    }
                }
                listenStartLoading.value = false;
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
        swapStore.tokenAInfo.value.balance = ethers.formatUnits(t0bal, swapStore.tokenAInfo.value.decimals)
        swapStore.tokenBInfo.value.balance = ethers.formatUnits(t1bal, swapStore.tokenBInfo.value.decimals)
        swapStore.tokenAInfo.value.price = Number(reserve1) / Number(reserve0);
        swapStore.tokenBInfo.value.price = Number(reserve0) / Number(reserve1);
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
        if (!(botStartFlag.value && listenStartFlag.value)) {
            return
        }
        {
            await updateBalance()
            const A2BPrice = swapStore.tokenAInfo.value.price;
            if (trad_dire) {
                if (watchSetting.A2BPriceLimit > A2BPrice) {
                    console.log("out of price", "true 1A2B:", A2BPrice, "wish 1A2B:", watchSetting.A2BPriceLimit);
                    return
                }
                const min = Number(watchSetting.A2BLowLimit);  // 将字符串转换为数字
                const max = Number(watchSetting.A2BTopLimit);
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
                if (watchSetting.B2APriceLimit * A2BPrice > 1) {
                    console.log("out of price", "true 1B2A:", 1 / A2BPrice, "wish 1B2A:", watchSetting.B2ATopLimit);
                    return
                }
                const min = Number(watchSetting.B2ALowLimit);  // 将字符串转换为数字
                const max = Number(watchSetting.B2ATopLimit);
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
            const gas = await contract.router?.connect(wallet)
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

    const botStart = async()=> {
        try {
            botStartFlag.value = true
            const timesTampStartTime = Math.floor(new Date(settingParams.startTime).getTime() / 1000);
            const timesTampEndTime = Math.floor(new Date(settingParams.endTime).getTime() / 1000);
            while (botStartFlag.value && listenStartFlag.value) {
                let nowTime = Math.floor(new Date().getTime() / 1000);
                if (nowTime < timesTampStartTime) {
                    await wait(2000);
                    continue
                }
                if (nowTime >= timesTampEndTime) {
                    botStartFlag.value = false;
                    continue;
                }
                await botTask(nowTime)
                await wait(2000);
            }
            alert('机器人开始运行');
            botStartFlag.value = false;
        } catch (error:any) {
            if (!(botStartFlag.value && listenStartFlag.value)) {
                alert('机器人结束运行'+error);
                botStartFlag.value = false;
                return
            }
            if ((botRetry.lastTime + 3600) < Math.floor(new Date().getTime() / 1000)) {
                botRetry.lastTime = Math.floor(new Date().getTime() / 1000)
                botRetry.times = 1;
                await wait(2000)
                await botStart()
            } else {
                if (botRetry.times < 20) {
                    botRetry.times++
                    await wait(2000)
                    await botStart()
                } else {
                    alert('机器人结束运行'+error);
                    botStartFlag.value = false;
                }
            }
        }
        return
    }

    async function botTask(nowTime:number) {
        if (lastTime < nowTime - (settingParams.autoTime * 60)) {
            lastTime = Math.floor(new Date().getTime() / 1000);
            let random_num = Math.floor(Math.random() * (swapStore.monitorDetails.subNumber - 1)) + 1;
            let random = Math.random();
            if ("bal0" == await swap(
                random < 0.5, walletList[random_num]
            )) {
                await swap(
                    random >= 0.5, walletList[random_num]
                )
            }

            lastTime = Math.floor(new Date().getTime() / 1000);
        }
    }
    return {
        loadSwapInfo,
        walletList,
        listenStartFlag,
        listenStartLoading,
        botStartFlag,
        botStart,
    }
}