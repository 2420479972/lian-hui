<template>
  <div class="w-full h-full overflow-y-auto flex flex-col pb-[23px] pt-[10px]">
    <div class="w-full px-[23px]">
      <div class="w-full mb-[32px]">
        <img src="/images/hot-token/logo.png" alt="" class="w-[179px] h-[49px]">
      </div>
      <div>
        <var-swipe class="h-[155px] w-[516px] header-menu  py-[21.5px]  rounded-[5px]" :style="{background:'url(' + Theme.hotMenuBg + ')',backgroundSize:'100% 100%'}">
          <var-swipe-item>
            <div class="grid grid-rows-1 grid-cols-4 gap-3 mb-[28px]">
              <div class="flex flex-col justify-center items-center" v-for="item in menuList" :key="item.label"
                   @click="item.fun(item)">
                <div class="h-[61px] w-[61px] flex items-center justify-center">
                  <img :src="item.key == selectedMenu ? item.selected : item.icon" alt="">
                </div>
                <div class="mt-[13px] text-[21px]" style="color:#fff">{{ t('hotToken.' + item.label) }}</div>
              </div>
            </div>
          </var-swipe-item>
        </var-swipe>
      </div>
    </div>
    <div class="w-full flex-1 flex flex-col min-h-[200px] mt-[20px] ">
      <div class="w-full py-[9px] flex gap-[15px] px-[23px]">
        <var-tabs v-model:active="active">
          <var-tab v-for="item in tabList" :key="item.label">
            <div class="flex items-center gap-[8px]" @click="checkTab(item.key)">
              <img :src="item.key == selectedTab ? item.selected :item.icon" alt="" class="h-[35px]">
              <div class="text-[24px]" :style="{color:item.key == selectedTab ? 'var(--tab-color-text-selected)' : 'var(--tab-color-text)'}">{{
                  item.label
                }}
              </div>
            </div>
          </var-tab>
        </var-tabs>
      </div>
      <div class="w-full mt-[18px]  mb-[17px] px-[23px]">
        <div class="h-[54px] w-full rounded-[27px] bg-[var(--hot-token-search-bg)] overflow-hidden flex items-center px-[16px] ">
          <img src="/images/hot-token/search.png" class="h-[24px] w-[24px]" alt="">
          <input readonly type="text" class="px-[12px] flex-1 bg-transparent outline-0 text-[18px]" :placeholder="t('public.clickSearch')" @click="goSearch">
        </div>
      </div>
      <div class="w-full flex-1 overflow-y-auto space-y-[15px] content">
        <div v-for="(item,index) in hotList?.rankings"
             class="w-[92%] min-h-[127px] px-[21px]  py-[31px] m-auto bg-[var(--hot-token-card-bg)] rounded-xl card-shadow"
             :style="{background:item.bg}">
          <div class="flex items-center " @click="openExpand(item)">
            <div class="mr-[21px] h-[64px] w-[64px] rounded-full flex items-center justify-center"
                 :style="{background:colorList[index] || '#A8A6AC'}">
              <img src="/images/hot-token/token.png" alt="">
            </div>

            <div class="flex-1 flex items-center justify-between">
              <div class="w-[35%] flex flex-col justify-center">
                <div class="text-[24px] font-bold">{{item.name}}</div>
                <div class="text-[18px] text-[#605D75]">{{item.symbol}}</div>
              </div>
              <div class="w-[40%] flex justify-center items-center">
                <div class="h-[50px] w-[91px]">
                  <img src="/images/hot-token/up.png" alt="" v-if="item.isUp" class="h-full w-full">
                  <img src="/images/hot-token/down.png" alt="" v-else class="h-full w-full">
                </div>

              </div>
              <div class="flex-1 flex-col justify-center">
                <div class="text-[24px] font-bold">$ {{getNumber(item.price)}}</div>
              </div>
            </div>
          </div>
          <var-collapse-transition :expand="item.show">
            <div class="pt-[18px] mt-[18px] flex items-center justify-between border-t-[2px] border-[#666666]">
              <div class="w-[70%] space-y-1">
                <div class="text-[#58566D] text-[18px]">{{t('hotToken.contractAddress')}}：<span class="text-[var(--hot-token-card-color)]">{{formatAddress(item.pair)}}</span></div>
                <div class="text-[#58566D] text-[18px] flex">
                  {{t('hotToken.contractLPAddress')}}：
                  <span class="text-[var(--hot-token-card-color)]">{{formatAddress(item.coin)}}</span>
                  <img src="/images/hot-token/copy.png" class="h-[28px] w-[28px] ml-[13px]" alt=""
                       @click="handleCopy(item.coin,t)">
                </div>
              </div>
              <div class="">
                <var-button color="var(--hot-token-card-button-bg)" @click="goRobot" class="w-[132px] !h-[45px] leading-[50px]"   style="border-radius: 9999px">
                  <div class="text-[var(--hot-token-card-button-color)] !h-[47px] text-[21px]" >{{t('hotToken.addRobot')}}</div>
                </var-button>
              </div>
            </div>
          </var-collapse-transition>
        </div>
      </div>
    </div>
  </div>
  <var-drag style="left: 82%; top: 31.5%" attraction="x">
    <img src="/images/hot-token/jiqiren.png" class="h-[88px]" alt="" @click="goRobot">
  </var-drag>
</template>

<script setup lang="ts">
import {handleCopy} from "@/hooks/copy.ts";
import {useI18n} from "vue-i18n";
import {ThemeManager} from "store/theme.ts";
import {getResource} from "utils/getFile.ts";
import {useAccount, useReadContract} from "@wagmi/vue";
import abi from "@/localinfo/all.json";
import {cloneDeep} from "lodash"
import {formatAddress, getNumber} from "utils/base.ts";
import {isVip} from "@/hooks/isVip.ts";
const { t } = useI18n() // 解构出t方法

const router = useRouter();

const colorList = [
  "#00A579",
  "#A8A6AC",
  "#FF9900",
  "#3496E1",
  "#6900A5",
  "#FF9900"
]

const Theme = ThemeManager()

const selectedMenu = ref('bsc');
const menuList = ref([
  {
    label: 'hotToken',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "hot-token.png") : getResource('hot-token/dark/', "hot-token.png")
    }),
    key: 'bsc',
    selected:computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "hot-token-selected.png") : getResource('hot-token/dark/', "hot-token-selected.png")
    }),
    fun(item: any) {
      selectedTab.value = "bsc"
      // 获取最新代币
      getTokenList('bsc');
      selectedMenu.value = item.key
    }
  },
  {
    label: 'newToken',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "new-token.png") : getResource('hot-token/dark/', "new-token.png")
    }),
    key: 'eth',
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "new-token-selected.png") : getResource('hot-token/dark/', "new-token-selected.png")
    }),
    fun(item: any) {
      selectedTab.value = "eth"
      // 获取上新代币
      getTokenList('eth');
      selectedMenu.value = item.key
    }
  },
  {
    label: 'aiRobot',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "ai.png") : getResource('hot-token/dark/', "ai.png")
    }),
    fun(){
      router.push('/watch-robot')
    }
  },
  {
    label: 'projectAlliance',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "kongtou.png") : getResource('hot-token/dark/', "kongtou.png")
    }),
    fun(){
      router.push('/airdrop')
    }
  }
])


const goSearch = () => {
  router.push('/search-token')
}

const selectedTab = ref('bsc')
const active = ref(0)

const tabList = ref([
  {
    label: 'BSC',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "BSC.png") : getResource('hot-token/dark/', "BSC.png")
    }),
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "selected-BSC.png") : getResource('hot-token/dark/', "selected-BSC.png")
    }),
    key: 'bsc'
  },
  {
    label: 'ETH',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "ETH.png") : getResource('hot-token/dark/', "ETH.png")
    }),
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "selected-ETH.png") : getResource('hot-token/dark/', "selected-ETH.png")
    }),
    key: 'eth'
  },
])

const checkTab = (key: 'bsc' | 'eth') => {
  selectedTab.value = key
  if(key == 'bsc' || key == 'eth'){
    getTokenList(key);
  }
}

const {address} = useAccount()
const netWord_id = import.meta.env.VITE_API_ID as keyof typeof abi;
const userInfo = useReadContract({
  address: abi[netWord_id]["ERC250115"].address as any,
  abi: abi[netWord_id]["ERC250115"].abi,
  functionName: 'gettotalinfo',
  args: [address],
}).data as any;

const hotList = ref({})

watch(()=> userInfo.value,(newVal)=>{
  hotList.value = cloneDeep(newVal?.hotlist[active.value])
},{
  deep: true,
  immediate: true,
})

watch(()=> active.value,(newVal)=>{
  hotList.value = cloneDeep(userInfo.value?.hotlist[newVal])
},{
  deep: true,
  immediate: true,
})





const openExpand = (item: any) => {
  hotList.value.rankings.forEach((listItem: { show: boolean, bg: string } | any) => {
    if (item.coin != listItem.coin) {
      listItem.show = false;
      listItem.bg = "";
    }
  })
  item.show = !item.show;
  item.bg = "";
  if (item.isUp && item.show) {
    item.bg = 'rgba(28,232,159,0.1)'
  }
}





// 获取代币列表
const getTokenList = (type:'bsc' | 'eth')=>{
  if(type == 'bsc'){
      // 获取BTC代币列表

    return
  }
  if(type == 'eth'){

    return
  }
}



const goRobot = ()=>{
  isVip('isNotVip');
  router.push('/watch-robot')
}



</script>

<style lang="scss" scoped>
.content {
  -ms-overflow-style: none; /* 隐藏滚动条 */
  scrollbar-width: none; /* 隐藏滚动条 */
}

input::placeholder {
  color: #605D75;
}

.card-shadow {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

:deep(.var-swipe--indicator-active) {
  width: 18px;
  height: 4px;
  border-radius: 999px;
  background: #1CE89F;
}

:deep(.var-swipe__indicator) {
  width: 18px;
  height: 4px;
  border-radius: 999px;
}
.header-menu{
  background-size: 100% 100%;
}
</style>
