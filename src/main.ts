import { createApp } from 'vue'
import App from './App.vue'
import 'assets/scss/base.scss'
import { createPinia } from "pinia"
import router from "@/routes/index.ts"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import {vue3ScrollSeamless} from "vue3-scroll-seamless";
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/pacifico';
import i18n from "@/language"
import { WagmiPlugin } from '@wagmi/vue'
import { config } from './wagmi'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const queryClient = new QueryClient()
const app = createApp(App)
app.use(i18n).use(router).use(pinia)
.use(WagmiPlugin, { config}).use(VueQueryPlugin, { queryClient }).component('vue3ScrollSeamless',vue3ScrollSeamless)

app.mount('#app')

BigInt.prototype.toJSON = function () {
    return { $bigint: this.toString() };
};