<template>
  <pop-window v-model:show="showPop" :title="nowSelectedRobot == 'normal' ? t('public.ordinaryRobot') : t('public.professionalRobot')" @close="clear">
      <div class="flex-1 overflow-y-auto ">
        <z-form :validationSchema="validationSchema" ref="formInstance" v-model:form-data="formData" :is-custom="true">
          <div class="w-full  flex items-center justify-between">
            <div class="text-[21px]"> {{t('robot.watchSetting1')}}</div>
          </div>
          <div class="mt-[21px] w-full">
            <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[18px] p-[16px] bg-[var(--pop-text-bg)]  space-y-1">
              <div class="">
                USDT {{t('public.buy')}} ERC20{{t('public.token')}}【XXX】
              </div>
              <div class="">USDT 1 {{t('public.realTimePrice')}}：100 ERC20{{t('public.token')}}【XXX】</div>
              <div class="">USDT 1 {{t('public.atLeast')}}{{t('public.exchange')}}20{{t('public.token')}}</div>
            </div>
            <div class="w-full my-[18px]">
              <div class="text-[18px] opacity-[0.4]">{{t('robot.priceLimit')}}</div>
            </div>
            <div class="flex space-x-[14px]">
              <z-form-item  type="number" :placeholder="t('robot.upperLimit')" name="usdPriceUpperLimit"></z-form-item>
              <z-form-item  type="number" :placeholder="t('robot.lowerLimit')" name="usdPriceLowerLimit"></z-form-item>
            </div>
            <template  v-if="nowSelectedRobot == 'profession'">
              <div class="w-full my-[18px]">
                <div class="text-[18px] opacity-[0.4]">单次交易数量随机上限/下限值</div>
              </div>
              <div class="flex  space-x-[14px]">
                <z-form-item type="number"  :placeholder="t('robot.upperLimit')" name="A2BTopLimit"></z-form-item>
                <z-form-item type="number"  :placeholder="t('robot.lowerLimit')" name="A2BLowLimit"></z-form-item>
              </div>
              <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
            </template>
            <div class="w-full my-[18px]">
              <div class="text-[21px]">{{t('robot.buySellNum')}}</div>
            </div>
            <div class="flex mt-[23px] items-center space-x-[14px]">
              <z-form-item type="number"  :placeholder="t('robot.buy')" name="usdBuyNumber"></z-form-item>
              <z-form-item type="number"  :placeholder="t('robot.sell')" name="usdSellNumber"></z-form-item>
            </div>
            <template v-if="nowSelectedRobot == 'profession'">
              <div class="flex items-center space-x-[14px]">
              <z-form-item type="custom" name="usdMaxLossPercent">
                <template #default="{fieldValue,input}">
                  <div class="flex items-center justify-between">
                    <div class="w-full flex items-center mt-[32px]">
                      <div class="text-[18px] whitespace-nowrap opacity-[0.4]">最大亏损</div>
                      <var-counter :min="0" :max="100" :model-value="fieldValue" @update:modelValue="input"/>
                    </div>
                  </div>
                </template>
              </z-form-item>
              <z-form-item type="custom" name="usdMaxProfitPercent">
                <template #default="{fieldValue,input}">
                  <div class="flex items-center justify-between">
                    <div class="w-full flex items-center mt-[32px]">
                      <div class="text-[18px] whitespace-nowrap opacity-[0.4]">最大盈利</div>
                      <var-counter :min="0" :max="100" :model-value="fieldValue" @update:modelValue="input"/>
                    </div>
                  </div>
                </template>
              </z-form-item>
              </div>
            </template>

            <div class="w-full mt-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>

            <div class="w-full my-[18px]">
              <div class="text-[21px]">{{t('robot.watchSetting2')}}</div>
            </div>

            <div class="pt-[15px] w-full text-[#297EFE] rounded-[5px]  text-[18px] p-[16px] bg-[var(--pop-text-bg)]  space-y-1">
              <div class="">
                USDT {{t('public.buy')}} ERC20{{t('public.token')}}【XXX】
              </div>
              <div class="">USDT 1 {{t('public.realTimePrice')}}：100 ERC20{{t('public.token')}}【XXX】</div>
              <div class="">USDT 1 {{t('public.atLeast')}}{{t('public.exchange')}}20{{t('public.token')}}</div>
            </div>
            <div class="w-full my-[18px]">
              <div class="text-[18px] opacity-[0.4]">{{t('robot.priceLimit')}}</div>
            </div>
            <div class="flex  space-x-[14px]">
              <z-form-item  type="number" :placeholder="t('robot.upperLimit')" name="ercPriceUpperLimit"></z-form-item>
              <z-form-item type="number" :placeholder="t('robot.lowerLimit')" name="ercPriceLowerLimit"></z-form-item>
            </div>
            <template  v-if="nowSelectedRobot == 'profession'">
              <div class="w-full my-[18px]">
                <div class="text-[18px] opacity-[0.4]">单次交易数量随机上限/下限值</div>
              </div>
              <div class="flex items-center space-x-[14px]">
                <z-form-item type="number" :placeholder="t('robot.upperLimit')" name="B2ATopLimit"></z-form-item>
                <z-form-item type="number" :placeholder="t('robot.lowerLimit')" name="B2ALowLimit"></z-form-item>
              </div>
              <div class="w-full my-[23px] h-[2px] bg-[#92A0AE] opacity-[0.2]"></div>
            </template>
            <div class="w-full my-[18px]">
              <div class="text-[21px]">{{t('robot.buySellNum')}}</div>
            </div>
            <div class="flex mt-[23px]  space-x-[14px]">
              <z-form-item type="number" :placeholder="t('robot.buy')" name="ercBuyNumber"></z-form-item>
              <z-form-item type="number" :placeholder="t('robot.sell')" name="ercSellNumber"></z-form-item>
            </div>
            <template v-if="nowSelectedRobot == 'profession'">
              <div class="flex items-center space-x-[14px]">
              <z-form-item type="custom" name="ercMaxLossPercent">
                <template #default="{fieldValue,input}">
                  <div class="flex items-center justify-between">
                    <div class="w-full flex items-center mt-[32px]">
                      <div class="text-[18px] whitespace-nowrap opacity-[0.4]">最大亏损</div>
                      <var-counter :min="0" :max="100" :model-value="fieldValue" @update:modelValue="input"/>
                    </div>
                  </div>
                </template>
              </z-form-item>
              <z-form-item type="custom" name="ercMaxProfitPercent">
                <template #default="{fieldValue,input}">
                  <div class="flex items-center justify-between">
                    <div class="w-full flex items-center mt-[32px]">
                      <div class="text-[18px] whitespace-nowrap opacity-[0.4]">最大盈利</div>
                      <var-counter :min="0" :max="100" :model-value="fieldValue" @update:modelValue="input"/>
                    </div>
                  </div>
                </template>
              </z-form-item>
              </div>
            </template>
          </div>
          <div class="mt-[27px]">
            <div class="w-full flex items-center justify-center">
              <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[var(--member-confirm-bg)] text-[var(--airdrop-card-dis-text)] border-[3px] border-[rgba(28,232,159,0.2)] rounded-[10px]" v-ripple @click="success">确定</button>
            </div>
          </div>
        </z-form>
      </div>
  </pop-window>
</template>

<script setup lang="ts">
import ZForm from "@/components/z-form.vue";
import {useI18n} from "vue-i18n";
import ZFormItem from "@/components/z-form-item.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";
import {nowSelectedRobot} from "views/watch-robot/comment";
import PopWindow from "@/components/pop-window.vue";
import {useSwapInfo} from "store/swap.ts";

const { t } = useI18n() // 解构出t方法
type Props = {
  show:boolean
}

const props = withDefaults(defineProps<Props>(),{
  show:false
})

const emit = defineEmits(['update:show','changeRobot'])

const swapStore = useSwapInfo();

const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show',val)
  }
})

const formInstance = ref<InstanceType<typeof ZForm>>();

const formData = ref(swapStore.watchSettings);


let validationSchema = null as any;
watch(()=>nowSelectedRobot.value,(newVal)=>{
  validationSchema = toTypedSchema(
      (()=>{
        const normal = zod.object({
          usdPriceUpperLimit: zod.number({message: '请输入价格上限'}).min(1, {message: '请输入价格上限'}),
          usdPriceLowerLimit: zod.number({message: '请输入价格下限'}).min(1, {message: '请输入价格下限'}),
          usdBuyNumber: zod.number({message: '请输入单次买入数量'}).min(1, {message: '请输入单次买入数量'}),
          usdSellNumber: zod.number({message: '请输入单次卖入数量'}).min(1, {message: '请输入单次卖入数量'}),
          ercPriceUpperLimit: zod.number({message: '请输入价格上限'}).min(1, {message: '请输入价格上限'}),
          ercPriceLowerLimit: zod.number({message: '请输入价格下限'}).min(1, {message: '请输入价格下限'}),
          ercBuyNumber: zod.number({message: '请输入单次买入数量'}).min(1, {message: '请输入单次买入数量'}),
          ercSellNumber: zod.number({message: '请输入单次卖入数量'}).min(1, {message: '请输入单次卖入数量'}),
        })
        const pro = zod.object({
          usdMaxLossPercent:zod.number({message: '最大亏损'}),
          usdMaxProfitPercent:zod.number({message: '最大盈利'}),
          ercMaxLossPercent:zod.number({message: '最大亏损'}),
          ercMaxProfitPercent:zod.number({message: '最大盈利'}),
          A2BTopLimit: zod.number({message: '请输入数量上限'}).min(1, {message: '请输入数量上限'}),
          A2BLowLimit: zod.number({message: '请输入数量下限'}).min(1, {message: '请输入数量下限'}),
          B2ATopLimit: zod.number({message: '请输入数量上限'}).min(1, {message: '请输入数量上限'}),
          B2ALowLimit: zod.number({message: '请输入数量下限'}).min(1, {message: '请输入数量下限'}),
        })
        if(newVal == 'profession'){
          return zod.intersection(normal,pro)
        }
        return normal
      })())
},{
  deep:true,
  immediate: true
})

const router = useRouter()
const success = ()=>{
  formInstance.value?.validateForm(()=>{
    swapStore.watchSettings = {...formData.value}
    router.push('/watch-robot');
  })
}

const clear = ()=>{
  formInstance.value?.resetForm()
}

</script>

<style lang="scss" scoped>
input::placeholder{
  color: #605D75;
}
:deep(.var-counter__input){
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[var(--pop-input-border-color)] text-[24px];
}

:deep(.var-elevation--2){
  box-shadow: none;
}
:deep(.var-counter__controller){
  border-radius: 0;
}
:deep(.var-counter__input){
  border: 3px solid var(--input-border-color);
  background: rgba(255,255,255,0.05);
  color: var(--color-text);
}
</style>
