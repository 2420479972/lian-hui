<template>
  <var-popup v-model:show="showPop">
    <div class="max-h-[90vh] w-[90vw] p-[20px] rounded-[20px] border-[#0E2C2C] border-[3px] flex flex-col content">
      <div class="w-full flex items-center justify-between">
        <div class="text-[21px]">{{robotType[type]}}</div>
        <var-icon name="window-close" @click="showPop = false"/>
      </div>
      <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
      <div class="flex-1 overflow-y-auto">
        <div class="w-full">
          <div class="w-full mb-[18px]">
            <div class="text-[18px] opacity-[0.4]">启动/结束时间</div>
          </div>
          <div class="flex items-center justify-between space-x-[14px] w-full">
            <div class="rounded-[5px] flex items-center space-x-2 h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]">
              <input type="text" class="w-full h-full bg-transparent outline-0" placeholder="启动时间" readonly>
              <div class="h-[22px] w-[24px]">
                <img src="assets/images/watch-robot/time.png" class="h-full w-full" alt="">
              </div>
            </div>
            <div class="rounded-[5px] flex items-center space-x-2 h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]">
              <input type="text" class="w-full h-full bg-transparent outline-0" placeholder="结束时间" readonly>
              <div class="h-[22px] w-[24px]">
                <img src="assets/images/watch-robot/time.png" class="h-full w-full" alt="">
              </div>
            </div>
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[20px] opacity-[0.4]">设置滑点（%）</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请设置滑点">
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[20px] opacity-[0.4]">设置反买反卖交易延迟时间（S）</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请设置反买反卖交易延迟时间">
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[20px] opacity-[0.4]">设置自动买卖时间（min）</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <input type="text" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[#1D1A2A] outline-0 px-[15px]" placeholder="请设置自动买卖时间">
          </div>

          <template v-if="type == 'profession'">
            <div class="w-full mt-[21px] flex items-center justify-between">
              <div class="text-[21px]">监听买卖并反向交易设置【USDT】</div>
            </div>
            <div class="w-full flex items-center justify-between mt-[32px]">
              <div class="text-[20px] opacity-[0.4]">设置主账户USDT（%）</div>
              <var-counter v-model="value"/>
            </div>
            <div class="w-full flex items-center justify-between mt-[32px]">
              <div class="text-[20px] opacity-[0.4]">设置主账户ERC20币（%）</div>
              <var-counter v-model="value"/>
            </div>
            <div class="w-full mt-[21px] flex items-center space-x-[35px]">
              <div class="text-[21px]">归集</div>
              <div class="flex items-center space-x-[20px]">
                <div class="flex items-center space-x-[9px]">
                  <div class="h-[25px] w-[25px] rounded-full bg-[#143A39] flex items-center justify-center">
                    <div class="h-[11px] w-[11px] bg-[#1CE89F] rounded-full"></div>
                  </div>
                  <div class="opacity-[0.5] text-[18px]">快速模式</div>
                </div>
                <div class="flex items-center space-x-[9px]">
                  <div class="h-[25px] w-[25px] rounded-full bg-[#666] flex items-center justify-center">
                    <div class="h-[11px] w-[11px] bg-[#0D081A] rounded-full"></div>
                  </div>
                  <div class="opacity-[0.5] text-[18px]">慢速模式</div>
                </div>

              </div>
            </div>
            <div class="mt-[27px] w-full text-[15px]">
              执行到 <span class="text-[#069A68]">XX</span> 个子钱包需要花费时间 <span class="text-[#A121E5]">XXX</span> 秒
            </div>
            <div class="w-full mt-[57px] flex items-center justify-between">
              <div class="w-[146px] text-[18px] h-[54px] flex flex-col items-center justify-center relative">
                <div class="mb-[10px] opacity-[0.4]">
                  USDT
                </div>
                <div class="text-[30px] text-[#65B6FF]"><span class="text-[40px]">0</span>.0000</div>
                <div class="absolute -right-[20px] h-[43px] w-[3px] bg-[#92A0AE] opacity-[0.2]"></div>
              </div>
              <div class="w-[146px] text-[18px] h-[54px] flex flex-col items-center justify-center relative">
                <div class="mb-[10px] opacity-[0.4]">
                  ERC20代币
                </div>
                <div class="text-[30px] text-[#FF964E]"><span class="text-[40px]">0</span>.0000</div>
                <div class="absolute -right-[20px] h-[43px] w-[3px] bg-[#92A0AE] opacity-[0.2]"></div>
              </div>
              <div class="w-[146px] text-[18px] h-[54px] flex flex-col items-center justify-center">
                <div class="mb-[10px] opacity-[0.4]">
                  预估产值USDT
                </div>
                <div class="text-[30px] text-[#1CE89F]"><span class="text-[40px]">0</span>.0000</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="mt-[27px]">
        <div class="w-full flex items-center justify-center space-x-[11px]">
          <div class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#919094] text-[#303030] border-[3px] border-[rgba(255,255,255,0.2)] rounded-[10px]" v-ripple>停止</div>
          <div class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[#1CE89F] text-[#0D3728] border-[3px] border-[rgba(28,232,159,0.2)] rounded-[10px]" v-ripple>确定</div>
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
.content{
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
