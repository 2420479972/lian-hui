import {Contract, ethers} from "ethers";
import {useSwapInfo} from "store/swap.ts";
import abiinfo from "@/localinfo/abi.json"
import {wait} from "viem/_types/utils/wait";

const useSwap = (wallects:any[])=>{
    const swapEvents = ref([]); // 存储 swap 事件信息
    const sub_swapEvents = ref([]); // 存储 swap 事件信息
    const listen_flag = ref(false);
    const bot_flag = ref(false); // 机器人是否启动
    let lastTime = Math.floor(new Date().getTime() / 1000);
    const guiji_flag = ref(false);
    const walletBalance = ref(""); // 账户余额
    const slip = ref('2')  // 滑点
    const A2Btoplimit = ref('10')       // 交易随机量最大值
    const A2Blowlimit = ref('1')        // 交易随机量最小值
    const A2Bpricelimit = ref('2')    // 交易限制价格

    const B2Atoplimit = ref('10')       // 交易随机量最大值
    const B2Alowlimit = ref('1')        // 交易随机量最小值
    const B2Apricelimit = ref('2')    // 交易限制价格

    const contract: {
        [key: string]:Contract | undefined
    } = {
        "pairs": undefined,
        "router": undefined,
        "token0": undefined,
        "token1": undefined,
    }
    // 存储节点信息
    const swapStore = useSwapInfo();

    // 存储tokenA和tokenB的相关信息
    const tokenAinfo = ref({
        symbol: '',
        balance: ''
    });

    const tokenBinfo = ref({
        symbol: '',
        balance: ''
    });

    let provider:any = null;
    watch(()=>swapStore.etherInfo.selectedNodeUrl,(newVal)=>{
        provider = new ethers.JsonRpcProvider(newVal)
    },{
        immediate:true,
        deep:true,
    })

    const load_swapInfo =async (data:any)=>{
        {
            contract.pairs = new Contract(
                data.s_pair_add,
                abiinfo.pairs,
                wallects[0]
            );
            contract.router = new Contract(
                data.mainrouter,
                abiinfo.router,
                wallects[0]
            );
        }

        let [reserve0, reserve1] = await contract.pairs.getReserves()

        {
            async function loadtoken0() {//deal token0
                let token0_add = await contract.pairs.token0()
                contract.token0 = new Contract(
                    token0_add,
                    abiinfo.IERC20,
                    wallects[0]
                );
                let [decimals, symbol, balance] =
                    await Promise.all([contract.token0.decimals(), contract.token0.symbol(), contract.token0.balanceOf(wallects[0].address)])

                tokenAinfo.value = {
                    symbol: symbol,
                    decimals: decimals,
                    balance: ethers.formatUnits(balance, decimals),
                    address: token0_add,
                    price: Number(reserve1) / Number(reserve0)
                }
            }

            async function loadtoken1() {//deal token1
                let token1_add = await contract.pairs.token1()
                contract.token1 = new Contract(
                    token1_add,
                    abiinfo.IERC20,
                    wallects[0]
                );
                let [decimals, symbol, balance] =
                    await Promise.all([contract.token1.decimals(), contract.token1.symbol(), contract.token1.balanceOf(wallects[0].address)])
                tokenBinfo.value = {
                    symbol: symbol,
                    decimals: decimals,
                    balance: ethers.formatUnits(balance, decimals),
                    address: token1_add,
                    price: Number(reserve0) / Number(reserve1)
                }
            }

            await Promise.all([
                loadtoken0(), loadtoken1()
            ])
        }

        var factory_add = await contract.pairs.factory()
        var factory_add2 = await contract.router.factory()
        if (factory_add != factory_add2) {
            console.log(factory_add, factory_add2);
            alert('环境不符合要求：配对合约和路由合约不相关')
            return;
        }

        async function pushswapevent(event:any) {
            const { to, amount0In, amount1In, amount0Out, amount1Out } = event.args; // 提取参数
            const block = await provider.getBlock(event.blockNumber);
            const date = new Date(block.timestamp * 1000); // 将 Unix 时间戳转换为 JS 日期
            let baseinfo = {
                transferhash:'https://testnet.bscscan.com/tx/' + event.log.transactionHash,
                to: to,
                time: date.toLocaleString(), // 转换为本地时间格式
            }
            let info = Object.assign(baseinfo, {
                intoken: amount0In > 0 ? tokenAinfo.value.symbol : tokenBinfo.value.symbol, // 根据输入和输出判断是哪个代币
                amountin: amount0In > 0 ? ethers.formatUnits(amount0In, tokenAinfo.value.decimals) : ethers.formatUnits(amount1In, tokenBinfo.value.decimals),
                outtoken: amount0In > 0 ? tokenBinfo.value.symbol : tokenAinfo.value.symbol,
                amountout: amount0In > 0 ? ethers.formatUnits(amount1Out, tokenBinfo.value.decimals) : ethers.formatUnits(amount0Out, tokenAinfo.value.decimals),
            })
            const isToInWallects = wallects.some(wallect => wallect.address.toLowerCase() === to.toLowerCase());
            if (isToInWallects) {
                sub_swapEvents.value.push(info);
            } else {
                swapEvents.value.push(info);
                let random_num = Math.floor(Math.random() * (data.sub_number - 1)) + 1;
                console.log("event swap");
                if (amount0In > 0) {
                    await swap(false, wallects[random_num]);
                } else {
                    await swap(true, wallects[random_num]);
                }
            }

        }

        var listen_retry = {
            lastTime: 0,
            times: 0
        };

        async function listenSwap() {
            const swapListener = (
                sender, amount0In, amount1In, amount0Out, amount1Out, to, event
            ) => {
                pushswapevent(event);
            };
            try {
                contract.pairs.off("Swap", swapListener);
                console.log("start listening");
                // const filter = contract.pairs.filters.Swap(); // 获取 Swap 事件的过滤器
                contract.pairs.on("Swap", swapListener);
                console.log('Listening to Swap events...');
                listen_flag.value = true;
                while (listen_flag.value) {
                    await wait(2000);
                }
                contract.pairs.off("Swap", swapListener);
            } catch (error) {
                if ((listen_retry.lastTime + 3600) < Math.floor(new Date().getTime() / 1000)) {
                    listen_retry.lastTime = Math.floor(new Date().getTime() / 1000)
                    listen_retry.times = 1;
                    await wait(2000)
                    contract.pairs.off("Swap", swapListener);
                    await listenSwap()
                } else {
                    if (listen_retry.times < 20) {
                        listen_retry.times++
                        await wait(2000)
                        contract.pairs.off("Swap", swapListener);
                        await listenSwap()
                    } else {
                        listen_flag.value = false;
                    }
                }
            }
        }

        async function loadSwapEvents() {
            listenSwap()
            return
        }

        loadSwapEvents()
    }


    async function swap(trad_dire:any, wallect:any) {
        lastTime = Math.floor(new Date().getTime() / 1000);
        if (!(bot_flag.value && listen_flag.value)) {
            return
        }
        {
            await updatebalance()

            let AMBprice = tokenAinfo.value.price;
            console.log({
                trad_dire, AMBprice,
                A2Bpricelimit: A2Bpricelimit.value,
                B2Apricelimit: B2Apricelimit.value,
                flag0: A2Bpricelimit.value < AMBprice,
                flag1: B2Apricelimit.value * AMBprice < 1,
            });
            if (trad_dire) {
                if (A2Bpricelimit.value > AMBprice) {
                    console.log("out of price", "true 1A2B:", AMBprice, "wish 1A2B:", A2Bpricelimit.value);
                    return
                }
                const min = Number(A2Blowlimit.value);  // 将字符串转换为数字
                const max = Number(A2Btoplimit.value);
                const randomValue = ethers.parseEther(String(Math.random() * (max - min) + min));
                let allow = await contract.token0.allowance(wallect, contract.router);

                if (randomValue > await contract.token0.balanceOf(wallect)) {
                    if (await contract.token0.balanceOf(wallects[0]) < randomValue) {
                        return "bal0"
                    }
                    await contract.token0.transfer(
                        wallect, randomValue, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token0.balanceOf(wallect)) {
                        await wait(2000);
                    }
                }
                if (randomValue > allow) {
                    let gas = await contract.token0.connect(wallect)
                        .approve.estimateGas(
                            contract.router, 2n ** 254n
                        );
                    await checkandsendgas(
                        gas,
                        wallect
                    )
                    await contract.token0.connect(wallect).approve(
                        contract.router, 2n ** 254n, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token0.allowance(wallect, contract.router)) {
                        await wait(2000);
                    }
                }
                var info = [
                    randomValue,
                    BigInt(Math.floor(Number(randomValue) * (100 - slip.value) * AMBprice / 100)),
                    [await contract.pairs.token0(), await contract.pairs.token1()],
                    wallect,
                    9999999999
                ]
            } else {
                if (B2Apricelimit.value * AMBprice > 1) {
                    console.log("out of price", "true 1B2A:", 1 / AMBprice, "wish 1B2A:", B2Apricelimit.value);
                    return
                }
                const min = Number(B2Alowlimit.value);  // 将字符串转换为数字
                const max = Number(B2Atoplimit.value);
                const randomValue = ethers.parseEther(String(Math.random() * (max - min) + min));
                let allow = await contract.token1.allowance(wallect, contract.router);

                if (randomValue > await contract.token1.balanceOf(wallect)) {
                    if (await contract.token1.balanceOf(wallects[0]) < randomValue) {
                        return "bal0";
                    }
                    await contract.token1.transfer(
                        wallect, randomValue, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token1.balanceOf(wallect)) {
                        await wait(500);
                    }
                }
                if (randomValue > allow) {
                    let gas = await contract.token1.connect(wallect)
                        .approve.estimateGas(
                            contract.router, 2n ** 254n
                        );
                    await checkandsendgas(
                        gas,
                        wallect
                    )
                    await contract.token1.connect(wallect).approve(
                        contract.router, 2n ** 254n, {
                            gasPrice: ethers.parseUnits("3", "gwei")
                        });
                    while (randomValue > await contract.token1.allowance(wallect, contract.router)) {
                        await wait(2000);
                    }
                }
                var info = [
                    randomValue,
                    BigInt(Math.floor(Number(randomValue) * (100 - slip.value) / AMBprice / 100)),
                    [await contract.pairs.token1(), await contract.pairs.token0()],
                    wallect,
                    9999999999
                ]
            }
            let gas = await contract.router.connect(wallect)
                .swapExactTokensForTokensSupportingFeeOnTransferTokens.estimateGas(
                    ...info
                )
            await checkandsendgas(
                gas,
                wallect
            )
            await contract.router.connect(wallect).swapExactTokensForTokensSupportingFeeOnTransferTokens(
                ...info, {
                    gasPrice: ethers.parseUnits("3", "gwei")
                })
            await guiji(trad_dire, wallect, false);
            await updatebalance()
        }
    }

    async function updatebalance() {
        let [
            balance, t0bal, t1bal,
            [reserve0, reserve1]
        ] = await Promise.all([
            provider.getBalance(wallects[0].address),
            contract.token0.balanceOf(wallects[0].address),
            contract.token1.balanceOf(wallects[0].address),
            contract.pairs.getReserves()
        ])
        walletBalance.value = ethers.formatEther(balance)
        tokenAinfo.value.balance = ethers.formatUnits(t0bal, tokenAinfo.value.decimals)
        tokenBinfo.value.balance = ethers.formatUnits(t1bal, tokenBinfo.value.decimals)

        tokenAinfo.value.price = Number(reserve1) / Number(reserve0);
        tokenBinfo.value.price = Number(reserve0) / Number(reserve1);

    }

    async function checkandsendgas(gas, wallect) {
        let bnb = gas * ethers.parseUnits("3", "gwei") * 11n / 10n;
        let oldbalance = await provider.getBalance(wallect);
        if (oldbalance < bnb) {
            const tx = {
                to: wallect,
                value: bnb - oldbalance,
                gasPrice:ethers.parseUnits("3", "gwei")
            };
            const transactionResponse = await wallects[0].sendTransaction(tx);
            await transactionResponse.wait();
        }
    }

    async function bx_guijis() {
        guiji_flag.value = true;
        try {
            let tasks = []
            for (let i in wallects) {
                if (i != 0) {
                    tasks.push(guiji(true, wallects[i], true));
                    tasks.push(guiji(false, wallects[i], true));
                }
            }
            await Promise.all(tasks);
            // for (let i = 0; i < wallects.length; i++) {
            //     await guiji(true, wallects[i], true);
            //     await guiji(false, wallects[i], true);
            // }
            alert('归集结束');
        } catch (error) {
            alert('网络繁忙，请重试', error);
        }
        guiji_flag.value = false;
    }

    async function guiji(trad_dire, wallect, flag) {
        if (trad_dire) {
            let token1_bal = await contract.token1.balanceOf(wallect);
            if (flag && token1_bal == 0n) {
                return
            }
            while (token1_bal == 0n) {
                await wait(2000);
                token1_bal = await contract.token1.balanceOf(wallect)
            }
            let gas = await contract.token1.connect(wallect)
                .transfer.estimateGas(
                    wallects[0], token1_bal
                );
            await checkandsendgas(
                gas,
                wallect
            )
            await contract.token1.connect(wallect).transfer(
                wallects[0], token1_bal, {
                    gasPrice: options[selectedEnvironment.value].gasprice
                });
        } else {
            let token0_bal = await contract.token0.balanceOf(wallect);
            if (flag && token0_bal == 0n) {
                return
            }
            while (token0_bal == 0n) {
                await wait(2000);
                token0_bal = await contract.token0.balanceOf(wallect);
            }
            let gas = await contract.token0.connect(wallect)
                .transfer.estimateGas(
                    wallects[0], token0_bal
                );
            await checkandsendgas(
                gas,
                wallect
            )
            await contract.token0.connect(wallect).transfer(
                wallects[0], token0_bal, {
                    gasPrice: options[selectedEnvironment.value].gasprice
                });
        }
    }

}