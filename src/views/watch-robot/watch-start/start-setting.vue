<template>
  <pop-window v-model:show="showPop"
              @close="clear"
              :title="nowSelectedRobot == 'normal' ? t('public.ordinaryRobot') : t('public.professionalRobot')">
      <z-form v-model:form-data="formData" :validationSchema="validationSchema" ref="formInstance" :is-custom="true">
        <div class="w-full">
          <div class="w-full mb-[18px]">
            <div class="text-[18px] opacity-[0.4]">{{ t('robot.startEndTime') }}</div>
          </div>
          <div class="flex items-center justify-between space-x-[14px] w-full">
            <z-form-item name="startTime" type="custom">
              <template #default="{fieldValue}">
                <div
                    class="rounded-[5px] flex items-center space-x-2 h-[45px] bg-transparent border-[2px] border-[var(--input-border-color)]  outline-0 px-[15px]">
                  <input :placeholder="t('robot.startTime')" :value="fieldValue" class="w-full h-full bg-transparent outline-0"
                         readonly type="text" @click="showStartTime = true">
                  <div class="h-[22px] w-[24px]">
                    <img alt="" class="h-full w-full" src="/images/watch-robot/time.png">
                  </div>
                </div>
              </template>
            </z-form-item>
            <z-form-item name="endTime" type="custom">
              <template #default="{fieldValue}">
                <div
                    class="rounded-[5px] flex items-center space-x-2 h-[45px] bg-transparent border-[2px] border-[var(--input-border-color)]  outline-0 px-[15px]">
                  <input :placeholder="t('robot.endTime')" :value="fieldValue" class="w-full h-full bg-transparent outline-0"
                         readonly type="text" @click="showEndTime = true">
                  <div class="h-[22px] w-[24px]">
                    <img alt="" class="h-full w-full" src="/images/watch-robot/time.png">
                  </div>
                </div>
              </template>

            </z-form-item>

          </div>
          <div class="w-full my-[18px]">
            <div class="text-[20px] opacity-[0.4]">{{ t('robot.setSlippage') }}</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <z-form-item :placeholder="t('public.please') + t('robot.setSlippage')" name="splitPoints"></z-form-item>
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[20px] opacity-[0.4]">{{ t('robot.setUpCounterBuy') }}</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <z-form-item :placeholder="t('public.please') + t('robot.setUpCounterBuy')"
                         name="reverseTime"></z-form-item>
          </div>
          <div class="w-full my-[18px]">
            <div class="text-[20px] opacity-[0.4]">{{ t('robot.setAutomatically') }}</div>
          </div>
          <div class="flex items-center space-x-[14px]">
            <z-form-item :placeholder="t('public.please') + t('robot.setAutomatically')" name="autoTime"></z-form-item>
          </div>
          <template v-if="nowSelectedRobot == 'profession'">
            <div class="w-full mt-[21px] flex items-center justify-between">
              <div class="text-[21px]">{{ t('robot.setUpMainAccountTrading') }}</div>
            </div>

              <z-form-item type="custom" name="usdMainAccount">
                <template #default="{fieldValue,input}">
                  <div class="w-full flex items-center justify-between mt-[32px]">
                  <div class="text-[20px] opacity-[0.4]">{{ t('robot.setUpTheMainAccountUSDT') }}</div>
                    <var-counter :min="0" :max="100" :model-value="fieldValue" @update:modelValue="input"/>
                  </div>

                </template>
              </z-form-item>
            <z-form-item type="custom" name="ercMainAccount">
              <template #default="{fieldValue,input}">
                <div class="w-full flex items-center justify-between mt-[32px]">
                  <div class="text-[20px] opacity-[0.4]">{{ t('robot.setUpTheMainAccountERC20Currency') }}</div>
                  <var-counter :min="0" :max="100" :model-value="fieldValue" @update:modelValue="input"/>
                </div>
              </template>
            </z-form-item>
            <z-form-item type="custom" name="model">
              <template #default="{fieldValue,input}">
                <div class="w-full mt-[21px] flex items-center space-x-[35px]">
                  <div class="text-[21px]">{{ t('robot.gather') }}</div>
                  <div class="flex items-center space-x-[20px]">
                    <div class="flex items-center space-x-[9px]" @click="input('fast')">
                      <div
                          class="h-[25px] w-[25px] rounded-full bg-[rgba(134,144,156,0.2)] flex items-center justify-center">
                        <div class="h-[11px] w-[11px]  rounded-full" :style="{background:fieldValue == 'fast' ? '#1CE89F' : '#86909C' }"></div>
                      </div>
                      <div class="opacity-[0.5] text-[18px]">{{ t('robot.quickMode') }}</div>
                    </div>
                    <div class="flex items-center space-x-[9px]" @click="input('slow')">
                      <div
                          class="h-[25px] w-[25px] rounded-full bg-[rgba(134,144,156,0.2)] flex items-center justify-center">
                        <div class="h-[11px] w-[11px]  rounded-full" :style="{background:fieldValue == 'slow' ? '#1CE89F' : '#86909C' }"></div>
                      </div>
                      <div class="opacity-[0.5] text-[18px]">{{ t('robot.slowMode') }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </z-form-item>

            <div class="mt-[27px] w-full text-[15px]">
              {{ t('robot.executedTo') }} <span class="text-[#069A68]">XX</span> {{ t('robot.subWalletsTakeTime') }}
              <span class="text-[#A121E5]">XXX</span> {{ t('robot.second') }}
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
      </z-form>
    <div class="mt-[27px]">
      <div class="w-full flex items-center justify-center space-x-[11px]">
        <div
            v-ripple
            class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[var(--watch-start-stop-bg)] text-[#303030] border-[3px] border-[rgba(255,255,255,0.2)] rounded-[10px]" @click="stopWatch">{{ t('public.stop') }}
        </div>
        <div
            v-ripple
            class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[var(--member-confirm-bg)] text-[var(--airdrop-card-dis-text)] border-[3px] border-[rgba(28,232,159,0.2)] rounded-[10px]" @click="startWatch">{{ t('public.start') }}
        </div>
      </div>
    </div>
  </pop-window>
  <pop-window v-model:show="showStartTime" :title="t('robot.selectStartTime')">
    <var-time-picker v-model="formData['startTime']" format="24hr">
      <template #actions>
        <div class="flex items-center space-x-2">
          <div v-ripple class="px-[20px] rounded-md py-[5px]" @click="close('startTime')">{{ t('public.cancel') }}</div>
          <div v-ripple class="px-[20px] rounded-md py-[5px]" @click="close()">{{ t('public.confirm') }}</div>
        </div>
      </template>
    </var-time-picker>
  </pop-window>
  <pop-window v-model:show="showEndTime" :title="t('robot.selectStartTime')">
    <var-time-picker v-model="formData['endTime']" format="24hr">
      <template #actions>
        <div class="flex items-center space-x-2">
          <div v-ripple class="px-[20px] rounded-md py-[5px]" @click="close('endTime')">{{ t('public.cancel') }}</div>
          <div v-ripple class="px-[20px] rounded-md py-[5px]" @click="close()">{{ t('public.confirm') }}</div>
        </div>
      </template>
    </var-time-picker>
  </pop-window>
</template>

<script lang="ts" setup>
import PopWindow from "@/components/pop-window.vue";
import {useI18n} from "vue-i18n";
import ZForm from "@/components/z-form.vue";
import ZFormItem from "@/components/z-form-item.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";
import {nowSelectedRobot} from "views/watch-robot/comment";

const {t} = useI18n() // 解构出t方

type Props = {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false
})
const emit = defineEmits(['update:show'])
const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show', val)
  }
})


const showStartTime = ref(false);
const showEndTime = ref(false);
const formData = ref({
  startTime: "00:00",
  endTime: "00:00",
  splitPoints: "",
  reverseTime: "",
  autoTime: ""
});

const validationSchema = toTypedSchema(
    (()=>{
     const normal =  zod.object({
        startTime: zod.string({message: t('robot.startTime')}),
        endTime: zod.string({message: t('robot.endTime')}).min(1, {message: t('robot.endTime')}),
        splitPoints: zod.string({message: t('robot.setSlippage')}).min(1, {message: t('robot.setSlippage')}).regex(/^[1-9]\d*$/,{
          message: '数字不合法！'
        }),
        reverseTime: zod.string({message: t('robot.setUpCounterBuy')}).min(1, {message: t('robot.setUpCounterBuy')}).regex(/^[1-9]\d*$/,{
          message: '数字不合法！'
        }),
        autoTime: zod.string({message: t('robot.setAutomatically')}).min(1, {message: t('robot.setAutomatically')}).regex(/^[1-9]\d*$/,{
          message: '数字不合法！'
        }),
      })

      const pro = zod.object({
        usdMainAccount:zod.number({message: t('robot.setUpTheMainAccountUSDT')}),
        ercMainAccount:zod.number({message: t('robot.setUpTheMainAccountERC20Currency')}),
        model: zod.string({message: t('robot.gather')}).min(1, {message: t('robot.gather')}),
      })
      if(nowSelectedRobot.value == 'profession'){
        return zod.intersection(normal,pro)
      }
      return normal
    })()
);

const close = (type?: 'startTime' | 'endTime') => {
  if (type) {
    formData.value[type] = "00:00";
  }
  showStartTime.value = false;
  showEndTime.value = false;
}

const formInstance = ref<InstanceType<typeof ZForm>>();


const stopWatch = ()=>{

}

const startWatch =()=>{
  formInstance.value?.validateForm((value)=>{
    console.log(value);
  })
}

const clear = ()=>{
  formInstance.value?.resetForm();
}



</script>

<style lang="scss" scoped>
input::placeholder {
  color: #605D75;
}

:deep(.var-counter__input) {
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[var(--input-border-color)]  text-[24px];
}

.content {
  ::-webkit-scrollbar {
    display: none;
  }
}

:deep(.var-time-picker__title-hint) {
  display: none;
}

:deep(.var-counter__input) {
  border: 3px solid var(--input-border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
}

:deep(.var-elevation--2) {
  box-shadow: none;
}

:deep(.var-counter__controller) {
  border-radius: 0;
}

</style>
