<template>
  <var-app-bar class="h-full flex flex-col" round safe-area-top>
    {{ formatAddress(address) }}
    <template #left>
      <var-button color="transparent" round text @click="showMenu = true">
        <var-icon :size="24" name="menu" />
      </var-button>
    </template>
    <template #right>
      <div class="space-x-2 flex items-center pr-[13px]">
        <var-button round text color="transparent" text-color="#fff">
          <img alt="" src="assets/images/layout/wifi.png" class="w-[38px] h-[38px]">
        </var-button>
        <var-button round text color="transparent" text-color="#fff">
          <img alt="" src="assets/images/layout/lan.png" class="w-[38px] h-[38px]">
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
    <div class="w-[429px] h-[100vh] flex flex-col">
      <div
        class="w-full h-[189px] bg-[url('assets/images/menu/header-bg.png')] bg-cover flex items-center justify-center">
        <img alt="" class="w-[179px] h-[49px]" src="assets/images/menu/logo.png">
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
                  {{ item.label }}
                </div>
              </template>
              <template v-else>
                <div v-ripple class="text-[24px] flex-1 h-[32px]" @click="goPath(item)">
                  {{ item.label }}
                </div>
              </template>
            </div>
            <div v-if="item.render" class="flex-1 flex justify-end">
              <component :is="item.render"></component>
            </div>
          </div>
        </div>
        <div class="h-[110px] w-full px-[23px] space-x-[35px] py-[16px] flex border-t-[2px] border-[#666666]">
          <div v-for="item in buttonList" :key="item.label" class="flex items-center h-[32px] w-[110px] space-x-[13px]">
            <div class="space-x-[22px] flex items-center">
              <div class="w-[32px] h-[32px]">
                <img :src="item.icon" alt="" class="w-full h-full">
              </div>
              <div v-ripple class="text-[24px]">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script lang="tsx" setup>
import { useAccount, useDisconnect } from '@wagmi/vue'
const { address, chainId, status } = useAccount()
function formatAddress(address) {
  // 确保地址以 '0x' 开头且长度为42字符
  if (address && address.length === 42 && address.startsWith('0x')) {
    const start = address.slice(0, 6);   // 取前4个字符（0x和第一个字符）
    const end = address.slice(-4);        // 取最后4个字符
    return start + '***' + end;           // 中间部分用'***'替换
  }
  return 'Invalid address';               // 如果地址不符合规范，返回提示
}
import home from "assets/images/menu/home.png"
import account from "assets/images/menu/account.png"
import airdrop from "assets/images/menu/airdrop.png"
import briefIntroduction from "assets/images/menu/briefIntroduction.png"
import chat from "assets/images/menu/chat.png"
import quit from "assets/images/menu/quit.png"
import sound from "assets/images/menu/sound.png"
import telegraph from "assets/images/menu/telegraph.png"
import theme from "assets/images/menu/theme.png"
import { StyleProvider } from '@varlet/ui'
import { ThemeManager } from "store/theme.ts";

const themeStore = ThemeManager()
const showMenu = ref(false);


const soundSwitch = ref(false);

const menuList = [
  {
    label: '主页',
    icon: home,
    path:'/hot-token',
  },
  {
    label: '账户',
    icon: account,
    path:'/member',
  },
  {
    label: "联盟",
    icon: airdrop,
    path:'/alliance',
  },
  {
    label: '空投',
    icon: telegraph,
    path:'/airdrop',
  },
  {
    label: '简介',
    icon: briefIntroduction,
    path:'/intro',
  },
  {
    label: '声音',
    icon: sound,
    noRipple: true,
    render: () => {
      return <>
        <div className="bg-[#949397] w-[63px] h-[32px] rounded-[16px] flex items-center p-[5px] relative"
          onClick={setSound}
          style={{ background: soundSwitch.value ? '#16513c' : '#3A3643' }}>
          <div
            className='w-[22px] h-[22px] bg-[#fff] rounded-full transition-transform ease-in-out delay-150 relative z-10'
            style={{ transform: soundSwitch.value ? 'translateX(23px)' : 'translateX(0)' }}></div>
          {
            soundSwitch
              .value ? <div className="text-[18px] text-[#1CE89F] absolute left-[8px] z-0">开</div> :
              <div className="text-[18px] text-[#989898] absolute right-[8px] z-0">关</div>
          }
        </div>
      </>
    }
  },
  {
    label: '风格',
    icon: theme,
    noRipple: true,
    render: () => {
      return <>
        <div className="flex items-center space-x-[17px]">
          <div
            className="w-[74px] h-[32px] rounded-full flex items-center py-[14px] justify-center" style={{
              color: themeStore.theme == 'lightTheme' ? '#1CE89F' : '#959595',
              backgroundColor: themeStore.theme == 'lightTheme' ? '#165046' : '#3A3643'
            }} onClick={() => themeStore.toggleTheme('lightTheme')}>浅色
          </div>
          <div
            className="w-[74px] h-[32px] rounded-full flex items-center py-[14px] justify-center" style={{
              color: themeStore.theme == 'darkTheme' ? '#1CE89F' : '#959595',
              backgroundColor: themeStore.theme == 'darkTheme' ? '#165046' : '#3A3643'
            }} onClick={() => themeStore.toggleTheme('darkTheme')}>深色
          </div>
        </div>
      </>
    }
  },
  {
    label: '退出',
    icon: quit
  }
]

const buttonList = [
  {
    label: '电报',
    icon: telegraph
  },
  {
    label: '聊天',
    icon: chat
  },
]


const setSound = () => {
  soundSwitch.value = !soundSwitch.value
}

const router = useRouter();
const goPath =(item:any)=>{
  if(typeof item.fun == "function"){
    item.fun();
    return
  }
  if(item.path){
    router.push(item.path);
  }
}

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