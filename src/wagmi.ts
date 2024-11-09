import { http, createConfig } from '@wagmi/vue'
import { bsc, bscTestnet } from '@wagmi/vue/chains'

export const config = createConfig({
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
})