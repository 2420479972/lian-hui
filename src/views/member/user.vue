<template>
  <div class="space-y-7">
    <div class="px-[18px] pt-[30px] h-[177px] w-full user bg-[#140E20] rounded-xl relative">
      <div class="absolute right-[18px] top-[18px] flex items-center space-x-[12px]">
        <div class="w-[7px] h-[7px] rounded-full bg-[#fff] opacity-[0.4]"></div>
        <div class="opacity-[0.4] text-[18px]">未购买</div>
      </div>
      <div class="flex items-center h-[65px] space-x-[20px]">
        <div class="h-[65px] w-[65px] rounded-full bg-amber-100"></div>
        <div class="space-y-[16px]">
          <div class="text-[24px]">普通会员</div>
          <div class="text-[18px] text-[#605D75]">2024/10/03 23:04-2024/10/30 23:04</div>
        </div>
      </div>
      <div class="flex items-center space-x-[34px] mt-[32px]">
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">1</div>
          <div class="text-[18px]">可领空投</div>
        </div>
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">2</div>
          <div class="text-[18px]">可发布空投</div>
        </div>
      </div>
    </div>
    <div class="px-[18px] pt-[31px] pb-[30px] h-[177px] w-full user bg-[#140E20] rounded-xl relative">
      <div class="absolute right-[18px] top-[18px] flex items-center space-x-[12px]">
        <div class="w-[7px] h-[7px] rounded-full bg-[#fff] opacity-[0.4]"></div>
        <div class="opacity-[0.4] text-[18px]">未购买</div>
      </div>
      <div class="flex items-center h-[65px] space-x-[20px]">
        <div class="h-[65px] w-[65px] rounded-full bg-amber-100"></div>
        <div class="space-y-[16px]">
          <div class="text-[24px]">高级会员</div>
          <div class="text-[18px] text-[#605D75]">2024/10/03 23:04-2024/10/30 23:04</div>
        </div>
      </div>
      <div class="flex items-center space-x-[34px] mt-[32px]">
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">1</div>
          <div class="text-[18px]">可领空投</div>
        </div>
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">2</div>
          <div class="text-[18px]">可发布空投</div>
        </div>
        <div class="flex items-center space-x-[13px]">
          <div class="h-[22px] w-[22px] leading-[18px] text-center rounded-full border-2 text-[18px] border-[#605D75] text-[#605D75]">3</div>
          <div class="text-[18px]">生态分红</div>
        </div>
      </div>
    </div>
  </div>
  <div class="my-[28px] w-full h-[2px] bg-[#fff] opacity-[0.1] rounded-full"></div>
  <div class="mt-[30px]">
    <div class="text-[24px]">推广详情</div>
  </div>
  <div class="w-full mt-[30px] flex items-center justify-between">
    <div class="opacity-[0.4] text-[20px]">邀请总量</div>
    <div class="text-[23px]">5</div>
  </div>
  <div class="w-full mt-[20px] h-[47px] items-center flex space-x-6 relative text-[#605D75]">
    <div class="w-[97%] h-full bg-[#297FFF] opacity-[0.1] absolute"></div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>直推地址</div>
      <div class="text-[#297EFE]">5</div>
    </div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>一级</div>
      <div class="text-[#297EFE]">5</div>
    </div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>二级</div>
      <div class="text-[#297EFE]">5</div>
    </div>
    <div class="flex items-center h-[20px] text-[20px] space-x-2">
      <div>三级</div>
      <div class="text-[#297EFE]">5</div>
    </div>
  </div>
  <div class="w-full mt-[25px] flex items-center justify-between">
    <div class="opacity-[0.4] text-[20px]">上级地址</div>
  </div>
  <div class="mt-[18px]">
    <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请输入节点名称">
  </div>
  <div class="w-full mt-[30px] flex items-center justify-between">
    <div class="opacity-[0.4] text-[20px]">推广地址</div>
  </div>
  <div class="mt-[18px]">
    <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请输入节点名称">
  </div>
</template>

<script setup lang="ts">


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
