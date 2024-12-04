<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[90vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">详情</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="mt-[60px] relative w-[85%] m-auto header flex items-center justify-between">
        <div class="relative z-10 flex items-center">
          <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
          <div class="h-[25px] w-[25px] rounded-full bg-[#3481D7] leading-[25px] text-center text-[18px] relative">
            <span>3</span>
            <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">创建</div>
          </div>
        </div>
        <div class="w-[100%] h-[4px] bg-[#3481D7] absolute left-0 z-0"></div>
        <div class="relative z-10 flex justify-end items-center">
          <div class="h-[25px] w-[25px] rounded-full bg-[#22222F] text-[#86839D] leading-[25px] text-center text-[18px] relative">
            <span>5</span>
            <div class="absolute -left-1 -top-[30px] text-[18px] whitespace-nowrap">启动</div>
          </div>
        </div>
      </div>
      <template v-if="robotType == 'buy'">
        <div class="mt-[27px]">
          <div class="text-[18px] opacity-[0.4]">输入助记词</div>
        </div>
        <div class="mt-[20px]">
          <textarea type="text" class="w-full rounded-[5px] h-[149px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 p-[15px]" placeholder="请输入助记词"/>
        </div>
        <div class="mt-[20px]">
          <div class="text-[18px] opacity-[0.4]">钱包地址</div>
        </div>
        <div class="mt-[20px]">
          <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 p-[15px]" placeholder="请输入助记词"/>
        </div>
        <div class="mt-[20px]">
          <div class="text-[18px] opacity-[0.4]">子钱包数量</div>
        </div>
        <div class="flex items-center space-x-[9px] mt-[10px]">
          <input  type="text" class="w-[80%]  rounded-[5px] h-[45px] text-[#605D75] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]">
          <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple>
            <span class="opacity-[0.4]">确认</span>
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
      </template>
      <template v-if="robotType == 'make'">
        <div class="mt-[27px]">
          <div class="text-[18px] opacity-[0.4]">选择时间</div>
        </div>
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

        <div class="mt-[27px]">
          <div class="text-[18px] opacity-[0.4]">开始倒计时</div>
        </div>
        <div class="mt-[20px] flex items-center justify-between  rounded-[5px] w-full h-[45px] border-[2px] border-[#1D1A2A] px-[15px]">
          <input type="text" class="w-[95%] h-full bg-transparent outline-0 pr-[5px]" placeholder="请输入助记词"/>
          <div class="-mt-[8px]">
            <var-icon name="chevron-down" />
          </div>
        </div>
        <div class="flex mt-[37px] items-center justify-between w-full">
          <div class=" text-[20px] space-x-1">
            <span class="opacity-[0.4]">价格（USDT）</span>
            <span class="text-[#605D75]">持有ERC115的NFT免费使用</span>
          </div>
          <div class="text-[21px]">
            20
          </div>
        </div>

      </template>
      <div class="my-[35px] ">
        <div class="w-full flex items-center justify-center">
          <div class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-solid border-[rgba(28,232,159,0.2)] rounded-[10px]" v-ripple>立即购买</div>
        </div>
      </div>
    </div>

  </var-popup>
</template>

<script setup lang="ts">
type Props = {
  type:'normal' | 'profession',
  show:boolean,
  robotType?:'buy' | 'make'
}


const props = withDefaults(defineProps<Props>(),{
  type: 'profession',
  show:false
})

const emit = defineEmits(['update:show'])

const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show',val)
  }
})

</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
:deep(.var-counter__input){
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[#1D1A2A] text-[24px];
}
</style>
