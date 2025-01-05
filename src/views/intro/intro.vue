<template>
  <div class="px-[23px] h-full overflow-y-auto">
    <var-collapse v-model="value" @change="handleChange" :accordion="true" :elevation="false">
      <var-collapse-item :name="index" v-for="(item,index) in introductionList" :key="item.label">
        <template #title>
          <div class="flex items-center space-x-[6px] py-[20px]">
            <div
                class="h-[28px] w-[28px] rounded-full leading-[28px] text-center bg-[var(--intro-number-bg)] text-[21px] text-[var(--intro-number-color)] number">
              {{index+1}}
            </div>
            <div class="text-[21px]">{{t('intro.' + item.label)}}</div>
          </div>
        </template>
        <div class="bg-[var(--intro-bg)] text-[var(--intro-bg-text-color)] p-[16px] rounded-[5px] text-[24px]">
          {{t('intro.' + item.content)}}
        </div>
      </var-collapse-item>
    </var-collapse>
  </div>

</template>

<script setup lang="ts">

const value = ref();

const handleChange = () => {

}

import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法

const introductionList = [
  {
    label: 'centralizedPlatform',
    content: 'centralizedPlatformText'
  },
  {
    label: 'buyAIRobot',
    content: 'buyAIRobotText'
  },
  {
    label: 'aiRobotsBring',
    content: 'aiRobotsBringText'
  },
  {
    label: 'safeToParticipate',
    content: 'safeToParticipateText'
  },
  {
    label: 'aiRobotsGenerate',
    content: 'aiRobotsGenerateText'
  },
  {
    label: 'playTheAirdrop',
    content: 'playTheAirdropText'
  },
]

</script>

<style lang="scss" scoped>
:deep(.var-collapse-item){
  border-bottom: 3px solid var(--intro-line-color);
}
.number{
  font-family: "YOUSHEBIAOTIHEI-2",serif;
}
</style>
