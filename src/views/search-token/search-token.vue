<template>
  <div class="w-full flex-1 flex flex-col h-full pb-[23px]">
    <div class="w-full mt-[27px]  mb-[17px] px-[23px]">
      <div class="h-[54px] w-full  rounded-[27px] bg-[#201D2D] overflow-hidden flex items-center px-[16px]">
        <img src="assets/images/hot-token/search.png" class="h-[24px] w-[24px]" alt="">
        <input type="text" class="px-[12px] flex-1 bg-transparent outline-0 text-[18px] text-[#fff]"
               placeholder="输入关键字搜索">
      </div>
    </div>
    <div class="w-full min-h-[130px] px-[23px] mt-[15px]">
      <div class="w-full flex justify-between items-center h-[28px] ">
        <div class="text-[18px] text-[#fff] opacity-[0.4]">搜索历史</div>
        <div class="w-[28px] h-[28px]">
          <img class="w-full h-full" src="assets/images/search-token/del.png" alt="">
        </div>
      </div>
      <div class="w-full h-[88px] mt-[20px] flex flex-wrap gap-x-3 gap-y-1 overflow-y-auto">
        <div class="text-[18px] opacity-[0.4]" v-for="item in 20" @click="search(String(item))">ETH</div>
      </div>
    </div>
    <div class="px-[23px] mt-[27px]">
      <div class="text-[21px] opacity-[0.4] pt-[27px] pb-[21px] border-t-[4px] border-[#fff] border-opacity-[0.1]">
        Token
      </div>
    </div>
    <div class="w-full flex-1 overflow-y-auto space-y-[15px] content">
      <div v-for="(item,index) in tokenList"
           class="w-[92%] min-h-[127px] px-[21px]  py-[31px] m-auto bg-[#140E20] rounded-xl card-shadow"
           :style="{background:item.bg}">
        <div class="flex items-center " @click="openExpand(item)">
          <div class="text-[30px] opacity-[0.4] mr-[57px]">{{ index + 1 }}</div>
          <img :src="BSC" alt="" class="mr-[21px] h-[64px] w-[64px]">
          <div class="flex-1 flex items-center justify-between">
            <div class="w-[35%] flex flex-col justify-center">
              <div class="text-[24px] font-bold">Ethereum</div>
              <div class="text-[18px] text-[#605D75]">ETH</div>
            </div>
            <div class="flex-col justify-center">
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
              <var-button color="#0F3334"  style="border-radius: 9999px">
                <span class="text-[#1CE89F]">添加机器人</span>
              </var-button>
            </div>
          </div>
        </var-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BSC from "assets/images/hot-token/BSC.png"
import {handleCopy} from "@/hooks/copy.ts";


const search = (keyword: string) => {

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
  {
    key: 'ETH3',
  },
  {
    key: 'ETH4',
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
</style>
