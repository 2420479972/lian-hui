import { createApp } from 'vue'
import App from './App.vue'
import '@varlet/touch-emulator'
import 'tailwindcss/tailwind.css'
import 'assets/scss/base.scss'
import '@varlet/ui/es/style'
import { createPinia } from "pinia"
import router from "@/routes/index.ts"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { WagmiPlugin } from '@wagmi/vue'
import { config } from './wagmi'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
const queryClient = new QueryClient()

createApp(App).use(router).use(pinia)
.use(WagmiPlugin, { config }).use(VueQueryPlugin, { queryClient })
.mount('#app')
