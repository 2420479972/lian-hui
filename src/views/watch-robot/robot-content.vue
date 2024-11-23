<template>
    <normal-robot v-if="type == 'normal'" v-bind="$attrs"></normal-robot>
    <profession-robot v-else v-bind="$attrs"></profession-robot>
    <div class="w-full mt-[37px] flex items-center justify-between">
      <div class="w-[146px] text-[18px]  flex flex-col items-center justify-center relative">
        <div class="mb-[10px] opacity-[0.4]">
          USDT
        </div>
        <div class="text-[30px] text-[#65B6FF]"><span class="text-[40px]">0</span>.0000</div>
        <div class="absolute -right-[20px] h-[43px] w-[3px] bg-[#92A0AE] opacity-[0.2]"></div>
      </div>
      <div class="w-[146px] text-[18px] flex flex-col items-center justify-center relative">
        <div class="mb-[10px] opacity-[0.4]">
          ERC20代币
        </div>
        <div class="text-[30px] text-[#FF964E]"><span class="text-[40px]">0</span>.0000</div>
        <div class="absolute -right-[20px] h-[43px] w-[3px] bg-[#92A0AE] opacity-[0.2]"></div>
      </div>
      <div class="w-[146px] text-[18px]  flex flex-col items-center justify-center">
        <div class="mb-[10px] opacity-[0.4]">
          预估产值USDT
        </div>
        <div class="text-[30px] text-[#1CE89F]"><span class="text-[40px]">0</span>.0000</div>
      </div>
    </div>
    <div class="text-[15px] opacity-[0.4] mt-[37px] space-x-2">
      <var-icon name="alert-circle-outline"/>
      <span>价格：86.69896417100072 USDT/FINECIA</span>
    </div>
    <div class="w-full bg-[rgba(122,120,131,0.05)] mt-[11px] rounded p-[18px] space-y-[20px] flex-1 overflow-y-auto ">
      <div class="w-full">
        <div class="text-[18px] text-[#605D75]">2024/10/15 17:54:52</div>
        <div class="text-[18px] text-[#65B6FF] mt-[19px]">最新 pancake swap 交易消息</div>
        <div class="text-[18px] text-[#65B6FF] mt-[12px] opacity-[0.4]">0x987***58964 使用11.061866065222256 USDT 交换
          959.0523296531131686
        </div>
        <div class="text-[18px] text-[#fff] mt-[16px]">0x987***58964 使用11.061866065222256 USDT 交换
          959.0523296531131686
        </div>
      </div>
      <div class="w-full">
        <div class="text-[18px] text-[#605D75]">2024/10/15 17:54:52</div>
        <div class="text-[18px] text-[#65B6FF] mt-[19px]">最新 pancake swap 交易消息</div>
        <div class="text-[18px] text-[#65B6FF] mt-[12px] opacity-[0.4]">0x987***58964 使用11.061866065222256 USDT 交换
          959.0523296531131686
        </div>
        <div class="text-[18px] text-[#fff] mt-[16px]">0x987***58964 使用11.061866065222256 USDT 交换
          959.0523296531131686
        </div>
      </div>
      <div class="w-full">
        <div class="text-[18px] text-[#605D75]">2024/10/15 17:54:52</div>
        <div class="text-[18px] text-[#65B6FF] mt-[19px]">最新 pancake swap 交易消息</div>
        <div class="text-[18px] text-[#65B6FF] mt-[12px] opacity-[0.4]">0x987***58964 使用11.061866065222256 USDT 交换
          959.0523296531131686
        </div>
        <div class="text-[18px] text-[#fff] mt-[16px]">0x987***58964 使用11.061866065222256 USDT 交换
          959.0523296531131686
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import NormalRobot from "views/watch-robot/normal-robot.vue";
import ProfessionRobot from "views/watch-robot/profession-robot.vue";

type Props = {
  type: "normal" | "profession";
}

const props = withDefaults(defineProps<Props>(),{})

</script>

<style lang="scss" scoped>

</style>
