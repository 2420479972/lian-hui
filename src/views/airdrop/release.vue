<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[90vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">发布空投</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div class="space-y-[35px] pt-[18px]">
          <div class="space-y-[18px]" v-for="item in 4">
            <div class="w-ful">
              <div class="text-[18px] opacity-[0.4]">设置滑点（%）</div>
            </div>
            <div class="flex items-center space-x-[14px]">
              <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请设置滑点">
            </div>
          </div>
        </div>
        <div class="space-y-[18px] mt-[35px]">
          <div class="w-full flex items-center space-x-[14px]">
            <div class="text-[18px] opacity-[0.4]">生成空投合约</div>
            <div class="text-[16px] text-[#605D75]">(生成合约地址需要支付XXXUSDT)</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <div class="w-[100px] text-[21px] h-[45px] border-[2px] border-[#1D1A2A] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple>
              生成
            </div>
            <input type="text" class="flex-1 rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="">
          </div>
        </div>
        <div class="w-full mt-[24px]">
          <div class="text-[21px] opacity-[0.4]">输入代币介绍</div>
        </div>
        <div class="w-full min-h-[98px] bg-[rgba(122,120,131,0.05)] px-[14px] py-[23px] mt-[18px] rounded-[5px]">
          <div class="text-[21px] opacity-[0.4]">
            Become part of a mission-aligned commu nity stewarding the ZKsy
          </div>
        </div>
        <div class="space-x-[22px] flex items-center mt-[18px]">
          <div class="w-ful">
            <div class="text-[18px] opacity-[0.4]">是否持有ERC20代币</div>
          </div>
          <div class="flex items-center space-x-[14px] w-[207px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请输入代币数量">
          </div>
          <div class="text-[18px] opacity-[0.4]">枚</div>
        </div>
        <div class="space-x-[22px] flex items-center mt-[18px]">
          <div class="w-ful">
            <div class="text-[18px] opacity-[0.4]">单个地址领取</div>
          </div>
          <div class="flex items-center space-x-[14px] w-[80px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="时间">
          </div>
          <div class="text-[18px] opacity-[0.4]">小时/天</div>
          <div class="flex items-center space-x-[14px] w-[80px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="次数">
          </div>
          <div class="text-[18px] opacity-[0.4]">次</div>
        </div>
      </div>
      <div class="mt-[27px]">
        <div class="w-full flex items-center justify-center flex-col">
          <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F]  text-[#0D3728] border-[3px] border-solid rounded-[10px]" :style="{background:'#1CE89F',color:'#303030'}" v-ripple>确认发布</button>
          <div class="mt-[14px]">
            <div class="text-[16px] text-[#605D75]">
              发布需要支付XXXUSDT
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script setup lang="ts">
type Props = {
  type:'normal' | 'profession',
  show:boolean
}


enum robotType {
  normal = '普通机器人',
  profession = '专业机器人',
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
