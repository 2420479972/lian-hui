<template>
  <div class="w-full flex-1 flex flex-col h-full pb-[23px]">
    <Step :steps="2"></Step>
    <div class="w-full flex-1 flex flex-col overflow-y-auto mt-[20px] px-[23px]">
      <Tabs></Tabs>
      <div class="flex-1 flex flex-col w-full">
        <robot-setting></robot-setting>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RobotSetting from "views/watch-robot/watch-setting/robot-setting.vue";
import Step from "views/watch-robot/comment/step.vue";
import Tabs from "views/watch-robot/comment/tabs.vue";
import TabRobot from "views/watch-robot/comment/tab-robot.vue";


</script>

<style lang="scss" scoped>


.button-shadow {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

</style>
