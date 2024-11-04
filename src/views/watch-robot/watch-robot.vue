<template>
  <div class="w-full flex-1 flex flex-col h-full pb-[23px]">
    <div class="h-[132px] relative w-full px-[62px] header flex items-center justify-center">
      <div class="w-[114px] relative flex items-center">
        <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
        <div class="h-[25px] w-[25px] rounded-full bg-[#3481D7] leading-[25px] text-center text-[18px] relative">
          <span>3</span>
          <div class="absolute -left-[100%] -top-[30px] text-[18px] whitespace-nowrap">监听sawp</div>
          <div class="w-[89px] h-[4px] bg-[#3481D7] absolute left-[100%] top-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      <div class="w-[203px] flex relative justify-center items-center">
        <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
        <div
            class="h-[25px] w-[25px] rounded-full bg-[#22222F] text-[#86839D] leading-[25px] text-center text-[18px] relative">
          <span>4</span>
          <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">设置</div>
          <div class="w-[89px] h-[4px]  absolute left-[100%] top-1/2 -translate-y-1/2"></div>
          <div class="w-[89px] h-[4px] absolute right-[100%] top-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      <div class="w-[114px] relative flex justify-end items-center">
        <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
        <div
            class="h-[25px] w-[25px] rounded-full bg-[#22222F] text-[#86839D] leading-[25px] text-center text-[18px] relative">
          <span>5</span>
          <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">启动</div>
          <div class="w-[89px] h-[4px] bg-[] absolute right-[100%] top-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      <div class="absolute flex items-center space-x-2 left-[44px] bottom-[15px] text-[15px] opacity-[0.4]">
        <var-icon name="alert-circle-outline"/>
        <div class="">监听swap相关的介绍监听swap相关的介绍监听swap相关的介绍</div>
      </div>
    </div>
    <div class="w-full flex-1 flex flex-col overflow-y-auto mt-[20px] px-[23px]  p-[1px]">
      <div class="w-full py-[9px] flex gap-[15px]">
        <div class="flex items-center gap-[8px]" v-for="item in tabList" :key="item.label" @click="checkTab(item.key)">
          <img class="h-[18px] w-[18px]" :src="item.icon" alt="">
          <div class="text-[24px]" :style="{color:item.key == selectedTab ? '#fff' : '#6E6B76'}">{{ item.label }}</div>
        </div>
      </div>
      <div class="w-full mt-[13px] flex justify-between items-center text-[18px]">
        <div @click="catRobot('normal')"
             class="w-[250px] h-[45px] bg-[rgba(52,129,215,0.05)] rounded  leading-[45px] text-center button-shadow relative"
             v-ripple
             :style="{background:nowSelectedRobot == 'normal' ? 'rgba(52,129,215,0.05)' :'rgba(122,120,131,0.05)',color:nowSelectedRobot == 'normal' ? '#3481D7' :'' }">
          <span>普通机器人</span>
          <div class="absolute w-[35px] h-[2px] bg-[#3481D7] rounded-[1px] left-1/2 -translate-x-1/2 bottom-0"
               v-if="nowSelectedRobot == 'normal'"></div>
        </div>
        <div @click="catRobot('profession')"
             class="w-[250px] h-[45px] bg-[rgba(52,129,215,0.05)] rounded leading-[45px] text-center button-shadow"
             v-ripple
             :style="{background:nowSelectedRobot == 'profession' ? 'rgba(52,129,215,0.05)' :'rgba(122,120,131,0.05)',color:nowSelectedRobot == 'profession' ? '#3481D7' :'' }">
          <span>专业机器人</span>
          <div class="absolute w-[35px] h-[2px] bg-[#3481D7] rounded-[1px] left-1/2 -translate-x-1/2 bottom-0"
               v-if="nowSelectedRobot == 'profession'"></div>
        </div>
      </div>
      <div class="">
<!--        <robot-content :type="nowSelectedRobot"></robot-content>-->
<!--        <robot-setting :type="nowSelectedRobot"></robot-setting>-->
<!--        <start-robot :type="nowSelectedRobot"></start-robot>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BSC from "assets/images/hot-token/BSC.png";
import ETH from "assets/images/hot-token/ETH.png";
import RobotContent from "views/watch-robot/robot-content.vue";
import RobotSetting from "views/watch-robot/robot-setting.vue";
import StartRobot from "views/watch-robot/start-robot.vue";


const nowSelectedRobot = ref<"normal" | "profession">('normal')

const selectedTab = ref('BSC')
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
const checkTab = (key: string) => {
  selectedTab.value = key
}


const catRobot = (value: string) => {
  nowSelectedRobot.value = value;
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
