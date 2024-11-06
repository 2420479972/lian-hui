<template>
  <div class="p-[23px] flex flex-col h-full">
    <div class="pt-[15px] w-full text-[#297EFE]  text-[15px] p-[16px] bg-[#141934] text-[##297EFE] space-y-2">
      <div class="flex items-center">
        <span>节点速度</span>
        <div class="ml-[30px] flex items-center space-x-4">
          <div class="flex space-x-1 items-center ">
            <div class="h-[9px] w-[9px] bg-[#1CE89F] rounded-full"></div>
            <span>快</span>
          </div>
          <div class="flex space-x-1 items-center">
            <div class="h-[9px] w-[9px] bg-[#FFC513] rounded-full"></div>
            <span>中</span>
          </div>
          <div class="flex space-x-1 items-center">
            <div class="h-[9px] w-[9px] bg-[#FF3D3D] rounded-full"></div>
            <span>慢</span>
          </div>
        </div>
      </div>
      <div class="">
        区块高度：高度值越大，代表节点数据同步更完善，其稳定性更好。
      </div>
      <div class="">
        在节点速度差不多的情况下，选择高度值大的节点，体验更好
      </div>
    </div>
    <div class="pt-[23px] w-full pb-[25px] opacity-[0.4] text-[21px]">
      推荐节点
    </div>
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div class="h-[90%] overflow-y-auto content w-full space-y-[12px]" >
        <div class="w-[100%] h-[90px] rounded card-shadow bg-[#140E20] px-[16px] flex items-center justify-between" v-for="item in 10">
          <div class="text-[24px] w-[60%]">
            BSC-Binance10
          </div>
          <div class="flex-1 flex flex-col items-end">
            <div class="text-[24px] flex items-center space-x-[11px]">
              <span>249</span>
              <div class="text-[18px]">ms</div>
              <div class="h-[9px] w-[9px] bg-[#1CE89F] rounded-full"></div>
            </div>
            <div class="text-[18px] opacity-[0.4]">
              区块高度 43216784
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 pt-[30px]">
        <div class="w-[70%] m-auto h-[54px] flex items-center justify-center rounded-[10px] text-[24px] text-[#0D3728] bg-[#1CE89F]" v-ripple @click="showCustomNode = true">添加自定义节点</div>
      </div>
    </div>
  </div>
  <var-popup v-model:show="showCustomNode">
    <div class="w-[499px] h-[403px] bg-[#110F20] border-[3px] border-[#0F3B38] rounded-[10px] p-[30px] ">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">添加自定义节点</div>
          <var-icon name="window-close" @click="showCustomNode = false"/>
      </div>
      <div class="mt-[18px] w-full">
        <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请输入节点名称">
        <textarea cols="30" rows="5" class="w-full rounded-[5px] h-[154px] mt-[25px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 p-[15px]" placeholder="请输入URL"></textarea>
        <div class="w-full my-[10px] flex items-center justify-center">
          <div class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-[rgba(28,232,159,0.2)] rounded-[10px]" v-ripple>确定</div>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script setup lang="ts">

const showCustomNode = ref(false);

</script>

<style lang="scss" scoped>
.card-shadow{
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.content {
  -ms-overflow-style: none; /* 隐藏滚动条 */
  scrollbar-width: none; /* 隐藏滚动条 */
}
textarea{
  resize: none;
}
</style>
