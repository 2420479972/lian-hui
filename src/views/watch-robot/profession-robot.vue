<template>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      输入LP pair地址
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[370px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200">
      <div class="w-[138px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]"  v-ripple>
        <template v-if="true">
          <var-loading size="small" color="#FFFFFF" class="opacity-[0.4]"/>
          <span class="text-[#605D75] text-[18px] ml-[5px]">加载中</span>
        </template>
        <span v-else>添加</span>
      </div>
    </div>
    <div class="flex items-center space-x-[9px] mt-[10px]">
      <input  type="text" class="w-[304px]  rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" >
      <div class="text-[18px] opacity-[0.4]  whitespace-nowrap">子钱包数量</div>
      <input  type="text" class="w-[104px]  rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]">
    </div>

  </div>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      最新交易事件显示数量
    </div>
    <div class="w-full flex items-center space-x-2">
      <input type="text" class="w-[302px] rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="12">
      <div class="space-x-[8px] flex items-center text-[18px]">
        <div class="w-[100px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple>
          停止监听
        </div>
        <div class="w-[100px] h-[45px] text-[#3481D7]  bg-[rgba(52,129,215,0.1)] flex items-center justify-center rounded-[5px]"  v-ripple>
          开始监听
        </div>
      </div>

    </div>
    <div class="w-full p-[13px] min-h-[85px] border-[#1D1A2A] border-2 mt-[24px] space-y-4 flex justify-between items-end">
      <div class="w-[95%]">
        <div class="text-[21px] text-[#605D75]">子钱包地址1：0xBbc***4Af83</div>
        <div class="text-[21px] text-[#605D75]">子钱包地址1：0xBbc***4Af83</div>
        <div class="text-[21px] text-[#605D75]">子钱包地址1：0xBbc***4Af83</div>
      </div>
      <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple>
        <span class="opacity-[0.4]">更多</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>

</style>
