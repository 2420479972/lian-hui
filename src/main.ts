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
import i18n from "@/language"


import { WagmiPlugin } from '@wagmi/vue'
import { config } from './wagmi'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import plusExtends from "@/hooks/plus.ts";
const queryClient = new QueryClient()
const app = createApp(App)
app.use(i18n).use(router).use(pinia)
.use(WagmiPlugin, { config }).use(VueQueryPlugin, { queryClient })
.mount('#app')

app.config.globalProperties.$plusExtends = plusExtends