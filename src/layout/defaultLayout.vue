<template>
  <var-app-bar class="h-full flex flex-col " round safe-area-top>
    <div class="text-[24px]" v-ripple="{disabled:isConnected}">
      <span v-if="isConnected">{{ formatAddress(address||'') }}</span>
      <div v-else class="text-[18px] flex items-center space-x-2 bg-[#1E2023] py-[2px] px-[8px] whitespace-nowrap rounded-[5px]" @click="useDetermine">
          <img alt="" src="/images/hot-token/link.png" class="h-[20px] w-[20px]">
          <span >{{ t('language.链接钱包', '链接钱包') }}</span>
        </div>
    </div>
    <template #left>
      <var-button color="transparent" round text @click="showMenu = true">
        <var-icon :size="30" name="menu"/>
      </var-button>
    </template>
    <template #right>
      <div class="space-x-2 flex items-center pr-[13px]">
        <var-button color="transparent" round text text-color="#fff" @click="goPath({path:'/node-cut'})">
          <img alt="" class="w-[38px] h-[38px]" src="/public/images/layout/wifi.png">
        </var-button>
        <var-button color="transparent" round text text-color="#fff" @click="cutLanguage">
          <img alt="" class="w-[38px] h-[38px]" src="/public/images/layout/lan.png">
        </var-button>
      </div>
    </template>
    <template #content>
      <div class="content overflow-y-auto">
        <router-view></router-view>
      </div>
    </template>
  </var-app-bar>
  <var-popup v-model:show="showMenu" position="left" teleport="#app">
    <div class="w-[360px] h-[100vh] flex flex-col bg-[var(--popup-content-background)]">
      <div
          :style="{backgroundImage:'url(' + themeStore?.menuBg + ')'}"
          class="w-full h-[189px] bg-cover flex items-center justify-center">
        <img alt="" class="w-[179px] h-[49px]" src="/public/images/menu/dark/logo.png">
      </div>
      <div class="flex-1 overflow-y-auto mt-[23px] flex flex-col">
        <div class="px-[23px] space-y-[54px] pb-[46px] pt-[23px]">
          <div v-for="item in menuList" :key="item.label" class="w-full flex items-center ">
            <div :class="['space-x-[22px] flex items-center', { 'w-[100%]': !item.render, 'w-[70%]': item.render }]">
              <div class="w-[32px] h-[32px]">
                <img :src="item.icon" alt="" class="w-full h-full">
              </div>
              <template v-if="item.noRipple">
                <div class="text-[24px] flex-1 h-[32px]">
                  {{ t("menuList." + item.label) }}
                </div>
              </template>
              <template v-else>
                <div v-ripple class="text-[24px] flex-1 h-[32px]" @click="goPath(item)">
                  {{ t("menuList." + item.label) }}
                </div>
              </template>
            </div>
            <div v-if="item.render" class="flex-1 flex justify-end">
              <component :is="item.render"></component>
            </div>
          </div>
        </div>
        <div class="h-[110px] w-full px-[23px] space-x-[35px] py-[16px] flex border-t-[2px] border-[#666666]">
          <div v-for="item in buttonList" :key="item.label"
               class="flex items-center h-[32px] min-w-[110px] space-x-[13px]">
            <div class="space-x-[22px] flex items-center">
              <div class="w-[32px] h-[32px]">
                <img :src="item.icon" alt="" class="w-full h-full">
              </div>
              <div v-ripple class="text-[24px]">
                {{ t("menuList." + item.label) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script lang="tsx" setup>
import {ThemeManager} from "store/theme.ts";
import {useI18n} from "vue-i18n";
import {formatAddress} from "../utils/base.ts";
import {getResource} from "utils/getFile.ts";
import {useAccount, useChainId, useConnect} from "@wagmi/vue";
import {metaMask} from "@wagmi/vue/connectors";
import {Snackbar} from "@varlet/ui";
import {useSwapInfo} from "store/swap.ts";
import {ethers} from "ethers";

// const chainId = useChainId()
// if(chainId.value != 54 || chainId.value != 53){
//   Snackbar.error({content: '请在 Ethereum 53/54主网上使用'});
// }
const {address} = useAccount()
const {isConnected} = useAccount()

const {t, locale} = useI18n() // 解构出t方法
const themeStore = ThemeManager()
const showMenu = ref(false);

const soundSwitch = ref(false);

const menuList = ref([
  {
    label: 'home',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "home.png") : getResource('menu/dark/', "home.png")
    }),
    path: '/hot-token',
  },
  {
    label: 'account',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "account.png") : getResource('menu/dark/', "account.png")
    }),
    path: '/member',
  },
  {
    label: "alliance",
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "airdrop.png") : getResource('menu/dark/', "airdrop.png")
    }),
    path: '/alliance',
  },
  {
    label: 'airdrop',
    icon: computed(()=>{
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "telegraph.png") : getResource('menu/dark/', "telegraph.png")
    }),
    path:'/airdrop',
  },
  {
    label: 'synopsis',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "briefIntroduction.png") : getResource('menu/dark/', "briefIntroduction.png")
    }),
    path: '/intro',
  },
  {
    label: 'sound',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "sound.png") : getResource('menu/dark/', "sound.png")
    }),
    noRipple: true,
    render: () => {
      return <>
        <div className="w-[63px] h-[32px] rounded-[16px] flex items-center p-[5px] relative"
             onClick={setSound}
             style={{background: soundSwitch.value ? 'var(--layout-switch-color-close)' : 'var(--layout-switch-color-open)'}}>
          <div
              className='w-[22px] h-[22px] bg-[#fff] rounded-full transition-transform ease-in-out delay-150 relative z-10'
              style={{transform: soundSwitch.value ? 'translateX(23px)' : 'translateX(0)'}}></div>
          {
            soundSwitch
                .value ? <div className="text-[18px] text-[#1CE89F] absolute left-[8px] z-0">{t('public.open')}</div> :
                <div className="text-[18px] text-[#989898] absolute right-[8px] z-0">{t('public.close')}</div>
          }
        </div>
      </>
    }
  },
  {
    label: 'theme',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "theme.png") : getResource('menu/dark/', "theme.png")
    }),
    noRipple: true,
    render: () => {
      return <>
        <div className="flex items-center space-x-[17px]">
          <div
              className="w-[74px] h-[32px] rounded-full flex items-center py-[14px] justify-center" style={{
            color: themeStore.theme == 'lightTheme' ? 'var(--layout-them-color-active)' : 'var(--layout-them-color)',
            backgroundColor: themeStore.theme == 'lightTheme' ? 'var(--layout-them-bg-active)' : 'var(--layout-them-bg)'
          }} onClick={() => themeStore.toggleTheme('lightTheme')}>{t('menuList.themeType.light')}
          </div>
          <div
              className="w-[74px] h-[32px] rounded-full flex items-center py-[14px] justify-center" style={{
            color: themeStore.theme == 'darkTheme' ? 'var(--layout-them-color-active)' : 'var(--layout-them-color)',
            backgroundColor: themeStore.theme == 'darkTheme' ? 'var(--layout-them-bg-active)' : 'var(--layout-them-bg)'
          }} onClick={() => themeStore.toggleTheme('darkTheme')}>{t('menuList.themeType.dark')}
          </div>
        </div>
      </>
    }
  },
  {
    label: 'quit',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "quit.png") : getResource('menu/dark/', "quit.png")
    }),
  }
])

const buttonList = ref([
  {
    label: 'telegraph',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "telegraph.png") : getResource('menu/dark/', "telegraph.png")
    }),
  },
  {
    label: 'chat',
    icon: computed(() => {
      return themeStore.theme == "lightTheme" ? getResource('menu/light/', "chat.png") : getResource('menu/dark/', "chat.png")
    }),
  },
])


const setSound = () => {
  soundSwitch.value = !soundSwitch.value
}

const router = useRouter();
const goPath = async (item: any) => {
  if (typeof item.fun == "function") {
    item.fun();
    return
  }
  if (item.path) {
    await router.push(item.path);
    showMenu.value = false;
  }
}

const cutLanguage = () => {
  if (localStorage.getItem('language') == 'zh') {
    localStorage.setItem('language', 'en')
  } else {
    localStorage.setItem('language', 'zh')
  }
  locale.value = localStorage.getItem('language') || 'zh'
}

const {status} = useAccount()
const {connect} = useConnect()
const useDetermine = (success?:()=>void)=>{
  connect({connector: metaMask()})
  if (status.value == 'connected') {
    Snackbar.success({
      content: "链接钱包成功",
    })
    if(success && typeof success === 'function'){
      success();
    }
    return
  }
  if(status.value == "disconnected"){
    Snackbar.error({
      content: "请检查钱包是否登陆",
    })
  }
}
const swap = useSwapInfo();

swap.etherProvider = new ethers.JsonRpcProvider(swap.etherInfo.selectedNodeUrl)

</script>
<style lang="scss" scoped>
.content {
  height: calc(100% - 54px);
}

.toggle-switch {
  display: flex;
  align-items: center;
  background-color: #2e2d2d;
  border-radius: 20px;
  width: 50px;
  height: 24px;
  cursor: pointer;
  padding: 2px;
  transition: background-color 0.3s;
}

.toggle-switch span {
  color: white;
  font-size: 12px;
  margin-left: 5px;
}

.toggle-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  transition: transform 0.3s;
}

.toggle-circle.active {
  transform: translateX(26px);
}

:deep(.var-switch__handle) {
  background: #fff !important;
}
</style>