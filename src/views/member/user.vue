<template>
  <div class="space-y-7">
    <div class="px-[18px] pt-[30px] min-h-[177px] w-full user bg-[#140E20] rounded-xl relative">
      <div class="absolute right-[18px] top-[18px] flex items-center space-x-[12px]">
        <div class="w-[7px] h-[7px] rounded-full bg-[#fff] opacity-[0.4]"></div>
        <div class="opacity-[0.4] text-[18px]">{{t('member.notPurchased')}}</div>
      </div>
      <div class="flex items-center h-[65px] space-x-[20px]">
        <div class="h-[65px] w-[65px] rounded-full bg-amber-100"></div>
        <div class="space-y-[16px]">
          <div class="text-[24px]">{{t('member.ordinaryMember')}}</div>
          <div class="text-[18px] text-[#605D75]">2024/10/03 23:04-2024/10/30 23:04</div>
        </div>
      </div>
      <div class="flex items-center space-x-[34px] mt-[32px]">
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">1</div>
          <div class="text-[18px]">{{t('member.canReceiveAirdrops')}}</div>
        </div>
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">2</div>
          <div class="text-[18px]">{{t('member.airdropsCanBeReleased')}}</div>
        </div>
      </div>
    </div>
    <div class="px-[18px] pt-[31px] pb-[30px] h-[177px] w-full user bg-[#140E20] rounded-xl relative">
      <div class="absolute right-[18px] top-[18px] flex items-center space-x-[12px]">
        <div class="w-[7px] h-[7px] rounded-full bg-[#fff] opacity-[0.4]"></div>
        <div class="opacity-[0.4] text-[18px]">{{t('member.notPurchased')}}</div>
      </div>
      <div class="flex items-center h-[65px] space-x-[20px]">
        <div class="h-[65px] w-[65px] rounded-full bg-amber-100"></div>
        <div class="space-y-[16px]">
          <div class="text-[24px]">{{t('member.premiumMember')}}</div>
          <div class="text-[18px] text-[#605D75]">2024/10/03 23:04-2024/10/30 23:04</div>
        </div>
      </div>
      <div class="flex items-center mt-[32px] flex-wrap">
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">1</div>
          <div class="text-[18px]">{{t('member.canReceiveAirdrops')}}</div>
        </div>
        <div class="flex items-center space-x-[13px] ml-3">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">2</div>
          <div class="text-[18px]">{{t('member.airdropsCanBeReleased')}}</div>
        </div>
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">3</div>
          <div class="text-[18px]">{{t('member.ecologicalDividends')}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="my-[28px] w-full h-[2px] bg-[#fff] opacity-[0.1] rounded-full"></div>
  <div class="mt-[30px]">
    <div class="text-[24px]">{{t('member.promotionDetails')}}</div>
  </div>
  <div class="w-full mt-[30px] flex items-center justify-between">
    <div class="opacity-[0.4] text-[20px]">{{t('member.totalNumberOfInvitations')}}</div>
    <div class="text-[23px]">5</div>
  </div>
  <div class="w-full mt-[20px] h-[47px] items-center flex space-x-6 relative text-[#605D75]">
    <div class="w-[100%] h-full bg-[#297FFF] opacity-[0.1] absolute"></div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>{{t('member.directPushAddress')}}</div>
      <div class="text-[#297EFE]">5</div>
    </div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>{{t('member.level1')}}</div>
      <div class="text-[#297EFE]">5</div>
    </div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>{{t('member.level2')}}</div>
      <div class="text-[#297EFE]">5</div>
    </div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>{{t('member.levelThree')}}</div>
      <div class="text-[#297EFE]">5</div>
    </div>
  </div>
  <div class="w-full mt-[25px] flex items-center justify-between">
    <div class="opacity-[0.4] text-[20px]">{{t('member.superiorAddress')}}</div>
  </div>
  <div class="mt-[18px]">
    <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" :placeholder="t('member.superiorAddress')">
  </div>
  <div class="w-full mt-[30px] flex items-center justify-between">
    <div class="opacity-[0.4] text-[20px]">{{t('member.promotionAddress')}}</div>
  </div>
  <div class="mt-[18px]">
    <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" :placeholder="t('member.promotionAddress')">
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
const { t } = useI18n() // 解构出t方法

</script>

<style lang="scss" scoped>
.user-card {
  background: linear-gradient(90deg, #062E1E, #182423);
  border-radius: 5px;
}
.user{
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
input::placeholder{
  opacity: 0.4;
}
</style>
