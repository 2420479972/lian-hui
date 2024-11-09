<template>
  <div class="w-full flex-1 flex flex-col h-full pb-[23px]">
    <div class="w-full flex-1 flex flex-col overflow-y-auto mt-[14px] px-[23px]">
      <div class="w-full py-[9px] flex gap-[15px]">
        <var-tabs v-model:active="activeHeader">
          <var-tab v-for="item in tabList" :key="item.label">
            <div class="flex items-center gap-[8px]" @click="checkTab(item.key)">
              <img :src="item.icon" alt="">
              <div :style="{color:item.key == selectedTab ? '#fff' : '#6E6B76'}" class="text-[24px]">{{
                  item.label
                }}
              </div>
            </div>
          </var-tab>
        </var-tabs>
      </div>
      <div class="mt-[13px] w-full h-[105px] px-[12px] py-[16px] user-card flex items-center">
        <div class="h-[65px] w-[65px] rounded-full">
          <img src="" class="w-full h-full" alt="">
        </div>
        <div class="space-y-[15px] ml-[21px] w-[65%]">
          <div class="flex items-center space-x-3">
            <div class="text-[24px]">0xdaa***7e997</div>
            <img src="assets/images/hot-token/copy.png" class="h-[28px] w-[28px] ml-[13px]" alt="" @click="handleCopy('1232')">
          </div>
          <div class="flex items-center space-x-[15px]">
            <div class="text-[18px] text-[#605D75]">余额(BNB)</div>
            <div class="text-[18px]">0.0000</div>
          </div>
        </div>
        <div class="flex-1 h-full flex items-start space-x-2">
          <div class="h-[28px] w-[28px] bg-amber-400 rounded-full"></div>
          <div class="h-[28px] w-[28px] bg-amber-400 rounded-full"></div>
        </div>
      </div>
      <div class="w-full mt-[13px] flex justify-between items-center text-[18px]">
        <var-tabs v-model:active="activeUserMenu" :scrollable="true" class="w-full">
          <var-tab v-for="(item,index) in secondTabList" :key="item.label">
            <div
                v-ripple
                :style="{background:activeUserMenu == index ? 'rgba(52,129,215,0.05)' :'rgba(122,120,131,0.05)',color:activeUserMenu == index ? '#3481D7' :'' }"
                class="px-[35px] min-w-[142px] h-[45px] bg-[rgba(52,129,215,0.05)] rounded  leading-[45px] text-center button-shadow relative">
              <span>{{ item.label }}</span>
              <div v-if="activeUserMenu == index"
                   class="absolute w-[35px] h-[2px] bg-[#3481D7] rounded-[1px] left-1/2 -translate-x-1/2 bottom-0"></div>
            </div>

          </var-tab>
        </var-tabs>
      </div>
      <div class="flex-1 mt-[22px] w-full space-y-[18px] overflow-y-auto pt-[20px]">
        <template v-if="false">
          <User></User>
        </template>
        <template v-else>
          <Card></Card>
        </template>

        <div class="h-[63px]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BSC from "assets/images/hot-token/BSC.png";
import ETH from "assets/images/hot-token/ETH.png";
import RobotContent from "views/watch-robot/robot-content.vue";
import {handleCopy} from "@/hooks/copy.ts";
import Card from "views/member/card.vue";
import User from "views/member/user.vue";


const nowSelectedRobot = ref<"normal" | "profession">('normal')
const activeHeader = ref(0);
const activeUserMenu = ref(0);
const selectedTab = ref('BSC')
const selectedSecondTab = ref('member')
const tabList = [
  {
    label: 'BSC',
    icon: BSC,
    key: 'BSC'
  },
  {
    label: 'ETH',
    icon: ETH,
    key: 'ETH'
  }
]


const secondTabList = [
  {
    label: "会员",
    key: "member"
  },
  {
    label: "普通机器人",
    key: "normal"
  },
  {
    label: "专业机器人",
    key: "profession"
  }
]

const checkSecondTab = (selectedSelect: string) => {


}

const checkTab = (key: string) => {
  selectedTab.value = key
}

</script>

<style lang="scss" scoped>
.header {
  background: #110F20;
  border: 2px solid;
  border-image: linear-gradient(90deg, #103B38, #103B38) 2 2;
}

.button-shadow {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}


</style>
