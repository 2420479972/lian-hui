<template>
  <div class="w-full h-full overflow-y-auto flex flex-col pb-[23px] pt-[15px]">
    <div class="w-full px-[23px]">
      <div class="w-full mb-[32px]">
        <img src="assets/images/hot-token/logo.png" alt="" class="w-[179px] h-[49px]">
      </div>
      <div>
        <var-swipe class="h-[160px] w-full  py-[21.5px] border-[3px] border-[#0F3B38] rounded-[5px]">
          <var-swipe-item>
            <div class="grid grid-rows-1 grid-cols-4 gap-3 mb-[28px]">
              <div class="flex flex-col justify-center items-center" v-for="item in menuList" :key="item.label"
                   @click="item.fun(item)">
                <div class="h-[61px] w-[61px] flex items-center justify-center">
                  <img :src="item.key == selectedMenu ? item.selected : item.icon" alt="">
                </div>
                <div class="mt-[13px] text-[21px]">{{ item.label }}</div>
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
              <img :src="item.key == selectedTab ? item.selected :item.icon" alt="">
              <div class="text-[24px]" :style="{color:item.key == selectedTab ? '#fff' : '#6E6B76'}">{{
                  item.label
                }}
              </div>
            </div>
          </var-tab>
        </var-tabs>
      </div>
      <div class="w-full mt-[27px]  mb-[17px] px-[23px]">
        <div class="h-[54px] w-full rounded-[27px] bg-[#201D2D] overflow-hidden flex items-center px-[16px] ">
          <img src="assets/images/hot-token/search.png" class="h-[24px] w-[24px]" alt="">
          <input readonly type="text" class="px-[12px] flex-1 bg-transparent outline-0 text-[18px]"
                 placeholder="点击搜索" @click="goSearch">
        </div>
      </div>
      <div class="w-full flex-1 overflow-y-auto space-y-[15px] content">
        <div v-for="(item,index) in tokenList"
             class="w-[92%] min-h-[127px] px-[21px]  py-[31px] m-auto bg-[#140E20] rounded-xl card-shadow"
             :style="{background:item.bg}">
          <div class="flex items-center " @click="openExpand(item)">
            <div class="mr-[21px] h-[64px] w-[64px] rounded-full flex items-center justify-center"
                 :style="{background:colorList[index] || '#A8A6AC'}">
              <img src="assets/images/hot-token/token.png" alt="">
            </div>

            <div class="flex-1 flex items-center justify-between">
              <div class="w-[35%] flex flex-col justify-center">
                <div class="text-[24px] font-bold">Ethereum</div>
                <div class="text-[18px] text-[#605D75]">ETH</div>
              </div>
              <div class="w-[40%] flex justify-center items-center">
                <div class="h-[50px] w-[91px]">
                  <img src="assets/images/hot-token/up.png" alt="" v-if="item.isUp" class="h-full w-full">
                  <img src="assets/images/hot-token/down.png" alt="" v-else class="h-full w-full">
                </div>

              </div>
              <div class="flex-1 flex-col justify-center">
                <div class="text-[24px] font-bold">$ 28.45</div>
                <div class="text-[18px] text-[#1CE89F]">+24.56%</div>
              </div>
            </div>
          </div>
          <var-collapse-transition :expand="item.show">
            <div class="pt-[18px] mt-[18px] flex items-center justify-between border-t-[2px] border-[#666666]">
              <div class="w-[70%] space-y-1">
                <div class="text-[#58566D] text-[18px]">合约地址：<span class="text-[#fff]">0xc1C***932FB</span></div>
                <div class="text-[#58566D] text-[18px] flex">
                  合约LP地址：
                  <span class="text-[#fff]">11111***11111</span>
                  <img src="assets/images/hot-token/copy.png" class="h-[28px] w-[28px] ml-[13px]" alt=""
                       @click="handleCopy('1232')">
                </div>
              </div>
              <div class="">
                <var-button color="#0F3334" style="border-radius: 9999px"><span class="text-[#1CE89F]">添加机器人</span>
                </var-button>
              </div>
            </div>
          </var-collapse-transition>
        </div>
      </div>
    </div>
  </div>
  <var-drag style="left: 82%; top: 31.5%" attraction="x">
    <img src="assets/images/hot-token/jiqiren.png" class="w-[105px] h-[98px]" alt="">
  </var-drag>
</template>

<script setup lang="ts">
import Ai from "assets/images/hot-token/ai.png"
import hotToken from "assets/images/hot-token/hot-token.png"
import hotTokenED from "assets/images/hot-token/selected-hot-token.png"
import kongtou from "assets/images/hot-token/kongtou.png"
import newToken from "assets/images/hot-token/new-token.png"
import newTokenED from "assets/images/hot-token/selected-new-token.png"
import BSCED from "assets/images/hot-token/selected-BSC.png"
import BSC from "assets/images/hot-token/BSC.png"
import ETHED from "assets/images/hot-token/selected-ETH.png"
import ETH from "assets/images/hot-token/ETH.png"
import {handleCopy} from "@/hooks/copy.ts";


const router = useRouter();

const colorList = [
  "#00A579",
  "#A8A6AC",
  "#FF9900",
  "#3496E1",
  "#6900A5",
  "#FF9900"
]


const selectedMenu = ref('hot-token');
const menuList = [
  {
    label: '热门代币',
    icon: hotToken,
    key: 'hot-token',
    selected: hotTokenED,
    fun(item: any) {
      selectedTab.value = "BSC"
      selectedMenu.value = item.key

    }
  },
  {
    label: '上新代币',
    icon: newToken,
    key: 'new-token',
    selected: newTokenED,
    fun(item: any) {
      selectedTab.value = "ETH"
      selectedMenu.value = item.key
    }
  },
  {
    label: 'Ai机器人',
    icon: Ai,
    fun(){
      router.push('/watch-robot')
    }
  },
  {
    label: '项目空投',
    icon: kongtou,
    fun(){
      router.push('/airdrop')
    }
  }
]


const goSearch = () => {
  router.push('/search-token')
}

const selectedTab = ref('BSC')
const active = ref(0)

const tabList = [
  {
    label: 'BSC',
    icon: BSC,
    selected: BSCED,
    key: 'BSC'
  },
  {
    label: 'ETH',
    icon: ETH,
    selected: ETHED,
    key: 'ETH'
  },
]

const checkTab = (key: string) => {
  selectedTab.value = key
}

const tokenList = ref([
  {
    key: 'ETH',
    isUp: true,
    id: 'ETH1',
  },
  {
    key: 'ETH1',
    isUp: true,
    id: 'ETH2',
  },
  {
    key: 'ETH2',
    isUp: false,
    id: 'ETH3',
  },
  {
    key: 'ETH3',
  },
  {
    key: 'ETH4',
  },
]);

const openExpand = (item: any) => {
  tokenList.value.forEach((listItem: { show: boolean, bg: string } | any) => {
    if (item.id != listItem.id) {
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
</style>
