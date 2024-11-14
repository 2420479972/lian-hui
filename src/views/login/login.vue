<template>
<div class="w-full text-[26px] text-center mt-[26px]">代币安全检测</div>
  <div class="w-full px-[19px]">
    <div class="mt-[43px]">
      <img src="assets/images/hot-token/logo.png" alt="" class="w-[102px] h-[30px]">
    </div>
    <div class="mt-[21px] h-[323px] w-full">
      <img src="assets/images/login/login-bg.png" class="w-full h-full" alt="">
    </div>
    <div class="mt-[23px]">
      <var-menu class="w-full" placement="bottom" same-width>
        <div class="mt-[20px] flex items-center justify-between  rounded-[5px] w-full h-[45px] border-[2px] border-[#1D1A2A] px-[15px]">
          <input type="text" class="w-[95%] h-full bg-transparent outline-0 pr-[5px]" placeholder="请输入助记词"/>
          <div class="-mt-[8px]">
            <var-icon name="chevron-down" />
          </div>
        </div>
        <template #menu>
          <var-cell>菜单项</var-cell>
          <var-cell>菜单项</var-cell>
          <var-cell>菜单项</var-cell>
        </template>
      </var-menu>
    </div>
    <div class="mt-[16px]">
      <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请设置自动买卖时间">
    </div>
    <div class="mt-[117px]">
      <div class="w-full flex items-center justify-center">
        <div class="w-full h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-solid border-[rgba(28,232,159,0.2)] rounded-[10px]" v-ripple>确认</div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>

</style>
