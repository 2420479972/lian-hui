<template>
  <div class="w-full flex-1 flex flex-col h-full pb-[23px]">
    <div class="w-full mt-[27px]  mb-[17px] px-[23px]">
      <div class="h-[54px] w-full  rounded-[27px] bg-[#201D2D] overflow-hidden flex items-center px-[16px]">
        <img src="assets/images/hot-token/search.png" class="h-[24px] w-[24px]" alt="">
        <input type="search" class="px-[12px] flex-1 bg-transparent outline-0 text-[18px] text-[#fff]"
               placeholder="输入关键字搜索">
      </div>
    </div>
    <div class="w-full min-h-[130px] px-[23px] mt-[15px]">
      <div class="w-full flex justify-between items-center h-[28px] ">
        <div class="text-[20px] text-[#fff] opacity-[0.4]">搜索历史</div>
        <div class="w-[35px] h-[35px]">
          <img class="w-full h-full" src="assets/images/search-token/del.png" alt="">
        </div>
      </div>
      <div class="w-full h-[88px] mt-[20px] flex flex-wrap gap-x-3 gap-y-1 overflow-y-auto">
        <div class="text-[18px] opacity-[0.4]" v-for="item in 20" @click="search(String(item))">热名代币</div>
      </div>
    </div>
    <div class="px-[23px] mt-[27px]">
      <div class="text-[21px] opacity-[0.4] pt-[27px] pb-[21px] border-t-[4px] border-[#fff] border-opacity-[0.1]">
        Token
      </div>
    </div>
    <div class="w-full flex-1 overflow-y-auto space-y-[15px] content">
      <div v-for="(item,index) in tokenList"
           class="w-[92%] min-h-[127px] px-[21px]  py-[31px] m-auto bg-[#140E20] rounded-xl card-shadow">
        <div class="flex items-center " @click="openExpand(item)">
          <div class="text-[30px] opacity-[0.4] mr-[57px] number w-[15px] ">{{ index + 1 }}</div>
          <div class="mr-[31px] h-[64px] w-[64px] rounded-full flex items-center justify-center" :style="{background:colorList[index] || '#A8A6AC'}">
            <img src="assets/images/hot-token/token.png" alt="">
          </div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const colorList = [
  "#00A579",
  "#A8A6AC",
  "#FF9900",
  "#3496E1",
  "#6900A5",
  "#FF9900"
]
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
.number{
  font-family: "YOUSHEBIAOTIHEI-2",serif;
}
</style>
