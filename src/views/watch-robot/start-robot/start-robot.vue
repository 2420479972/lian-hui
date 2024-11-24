<template>
  <input type="text" class="w-full mt-[15px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="0xBbc***4Af83">
  <div class="mt-[28px] w-full">
    <div class="relative min-h-[176px] w-full pb-[30px] bg-[rgba(122,120,131,0.05)] rounded-[5px]">
      <div class="absolute right-[18px] top-[19px] flex items-center space-x-[5px]">
        <div class="w-[7px] h-[7px] rounded-full bg-[#7A7883]" style="background: #1CE89F"></div>
        <div class="opacity-[0.4] text-[18px]" style="color:#1CE89F;opacity: 1">运行中</div>
      </div>
      <div class="h-[136px] w-full  py-[31px] px-[21px] flex items-center space-x-[18px]" @click="showAccountSetting = true">
        <div class="h-[65px] w-[65px]">
          <img class="h-full w-full" :src="type == 'normal' ? NormalImage : ProfessionImage" alt="">
        </div>
        <div class="flex-1 h-full flex flex-col justify-between">
          <div class="flex items-center space-x-[7px]">
            <div class="text-[24px]">{{robotType[type]}}</div>
            <div class="h-[24px] w-[24px]">
              <img class="h-full w-full" src="../../../assets/images/watch-robot/wenhao.png" alt="">
            </div>
          </div>
          <div class="text-[18px]  opacity-[0.4]">
            2024/10/03 23:04-2024/10/30 23:04
          </div>
        </div>
      </div>
      <div :class="['px-[15px] grid gap-x-1',{'grid-cols-3':type == 'normal','grid-cols-4':type == 'profession'}]">
        <div class="text-[16px] space-x-1">
          <span class="text-[#605D75]">滑点 </span>
          <span>5%</span>
        </div>
        <div class="text-[16px] space-x-1 text-center">
          <span class="text-[#605D75]">延迟 </span>
          <span>360s</span>
        </div>
        <div class="text-[16px] space-x-1 text-right">
          <span class="text-[#605D75]">自动买卖 </span>
          <span>5min</span>
        </div>
        <div class="text-[16px] space-x-1 text-right" v-if="type == 'profession'">
          <span class="text-[#605D75]">高级设置 </span>
          <span>开</span>
        </div>
      </div>
    </div>
  </div>
  <start-setting v-model:show="showAccountSetting" :type="type"></start-setting>
</template>

<script setup lang="ts">
import NormalImage from "assets/images/watch-robot/normal-robot.png"
import ProfessionImage from "assets/images/watch-robot/profession-robot.png"
import StartSetting from "views/watch-robot/start-robot/start-setting.vue";

type Props = {
  type:'normal' | 'profession'
}

enum robotType {
  normal = '普通机器人',
  profession = '专业机器人',
}

const props = withDefaults(defineProps<Props>(),{
  type: 'profession'
})

const showAccountSetting = ref(false)

</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
</style>
