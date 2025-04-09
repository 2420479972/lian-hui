import { createConfig, http } from '@wagmi/vue'
import { hardhat } from 'viem/chains'

export const config = createConfig({
  chains: [hardhat], // 仅使用 Hardhat 网络
  transports: {
    [hardhat.id]: http("http://127.0.0.1:8545"), // 连接 Hardhat 本地 RPC
  },
})
