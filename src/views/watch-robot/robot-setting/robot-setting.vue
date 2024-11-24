<template>
  <input type="text" class="w-full mt-[15px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="0xBbc***4Af83">
  <div class="mt-[28px] w-full">
    <div class="h-[136px] w-full bg-[rgba(122,120,131,0.05)] rounded-[5px] py-[31px] px-[21px] flex items-center space-x-[18px]" @click="showAccountSetting = true">
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
          监听买卖并反向交易设置【USDT链/ERC20代币】
        </div>
      </div>
    </div>
  </div>
  <account-setting v-bind="$attrs" :type="type" v-model:show="showAccountSetting" ></account-setting>
</template>

<script setup lang="ts">
import NormalImage from "assets/images/watch-robot/normal-robot.png"
import ProfessionImage from "assets/images/watch-robot/profession-robot.png"
import AccountSetting from "views/watch-robot/robot-setting/account-setting.vue";

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
