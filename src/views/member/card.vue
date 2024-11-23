<template>
<div class="w-full py-[15px] ">
  <div class="text-[17px]  flex flex-wrap ">
    <div class="space-x-1 flex items-center mr-[18px] mb-[21px]">
      <div class="h-[22px] w-[22px] leading-[20px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">1</div>
      <div class="text-[20px] text-[#605D75]">可以反买</div>
    </div>
    <div class="space-x-1 flex items-center mr-[18px] mb-[21px]">
      <div class="h-[22px] w-[22px] leading-[20px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">1</div>
      <div class="text-[20px] text-[#605D75]">可以反买</div>
    </div>
    <div class="mt-[28px] w-full">
      <div class="h-[136px] w-full bg-[rgba(122,120,131,0.05)] rounded-[5px] py-[31px] px-[21px] flex items-center space-x-[18px]" @click="showAccountSetting = true">
        <div class="h-[65px] w-[65px]">
          <img class="h-full w-full" :src="type == 'normal' ? NormalImage : ProfessionImage" alt="">
        </div>
        <div class="flex-1 h-full flex flex-col justify-between">
          <div class="flex items-center space-x-[7px]">
            <div class="text-[24px]">{{robotType[type]}}</div>
            <div class="h-[24px] w-[24px]">
              <img class="h-full w-full" src="assets/images/watch-robot/wenhao.png" alt="">
            </div>
          </div>
          <div class="text-[18px]  opacity-[0.4]">
            2024/10/03 23:04-2024/10/30 23:04
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-[22px] w-full">
    <div v-ripple class="w-full rounded-[5px] h-[45px] border-[2px] border-[#7A7883] bg-[rgba(122,120,131,0.05)] flex items-center justify-center space-x-1">
      <var-icon name="plus" class="opacity-[0.5]" size="20"/>
      <div class="opacity-[0.5]" @click="showMake = true">添加机器人</div>
    </div>
  </div>
</div>
  <profession-make v-model:show="showMake" :type="type" :robotType="robotSettingType"></profession-make>
</template>

<script setup lang="ts">
import NormalImage from "assets/images/watch-robot/normal-robot.png";
import ProfessionImage from "assets/images/watch-robot/profession-robot.png";
import ProfessionMake from "views/member/profession-make.vue";
type Props = {
  type:'normal' | 'profession'
}

enum robotType {
  normal = '普通机器人',
  profession = '专业机器人',
}


const robotSettingType = ref();

const props = withDefaults(defineProps<Props>(),{
  type: 'normal'
})

const showMake = ref(false);

const showAccountSetting = ref(false)

</script>

<style lang="scss" scoped>
.content{
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
