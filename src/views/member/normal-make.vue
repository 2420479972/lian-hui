<template>
  <pop-window v-model:show="showPop" :show-line="false" :title="t('public.detail')" @close="close">
    <div class="relative mt-[35px] w-[85%] m-auto header flex items-center justify-between">
      <div class="relative z-10 flex items-center">
        <div class="bg-[#22222F] absolute w-full h-[4px]"></div>
        <div :style="{background:step > 1 ?'var(--member-make-bg-active_d)': 'var(--member-make-bg-active)'}"
             class="h-[25px] w-[25px] rounded-full leading-[25px] text-center text-[18px] text-[#fff] relative"
             @click="setStep(1)">
          <span>1</span>
          <div :style="{color:step == 1 ? 'var(--member-step-text-active)' : 'var(--member-step-text)'}"
               class="absolute -left-1 -top-[30px]  text-[18px] whitespace-nowrap">
            {{ t("member.make") }}
          </div>
        </div>
      </div>
      <div :style="{background:step > 1 ?'var(--member-make-line-bg-active)': 'var(--member-make-line-bg)'}"
           class="w-[100%] h-[4px] absolute left-0 z-0"></div>
      <div class="relative z-10 flex justify-end items-center">
        <div :style="{background:step > 1 ?'var(--member-make-bg-active)': 'var(--member-make-bg)',color:step > 1 ? '#fff':'rgba(255,255,255,0.8)'}"
             class="h-[25px] w-[25px] rounded-full  leading-[25px] text-[#fff] text-center text-[18px] relative"
             @click="setStep(2)">
          <span>2</span>
          <div :style="{color:step == 2 ? 'var(--member-step-text-active)' : 'var(--member-step-text)'}"
               class="absolute -left-1 -top-[30px]  text-[18px] whitespace-nowrap">
            {{ t("public.buy") }}
          </div>
        </div>
      </div>
    </div>
      <z-form :validation-schema="makeRobotForm" @success="makeRobot" ref="makeRobotFormInstance" v-show="robotType == 'make'" v-model:form-data="makeRobotFormData">
        <z-form-item label="输入助记词" name="helpWord" placeholder="输入助记词" type="textarea">
          <template #label="{label}">
            <div class="mt-[27px]">
              <div class="text-[18px] opacity-[0.4]">{{ label }}</div>
            </div>
          </template>
        </z-form-item>
        <z-form-item label="钱包地址" name="walletAddress" placeholder="钱包地址">
          <template #label="{label}">
            <div class="mt-[27px]">
              <div class="text-[18px] opacity-[0.4]">{{ label }}</div>
            </div>
          </template>
        </z-form-item>
        <div class="my-[35px]">
          <div class="w-full flex items-center justify-center">
            <button
                v-ripple
                class="w-[147px] h-[54px] text-[24px] leading-[54px] text-[var(--color-primary)] text-center bg-[var(--member-confirm-bg)]   rounded-[10px]">{{ t("member.makeItNow") }}
            </button>
          </div>
        </div>
      </z-form>
      <z-form :validation-schema="buyRobotForm" @success="buyRobot" ref="buyRobotFormInstance" v-show="robotType == 'buy'" v-model:form-data="buyRobotFormData">
        <div class="mt-[27px]">
          <div class="text-[18px] opacity-[0.4]">选择时间</div>
        </div>
        <z-form-item name="id" type="custom">
          <template #default="{fieldValue,input}">
            <var-menu-select class="w-full" placement="bottom" same-width :model-value="fieldValue" @update:modelValue="input">
              <div
                  class="mt-[20px] flex items-center justify-between  rounded-[5px] w-full h-[45px] border-[2px] border-[var(--pop-input-border-color)] px-[15px]">
                <input :value="selectedOptions.find(item=>item.value === fieldValue)?.label" class="w-[95%] h-full bg-transparent outline-0 pr-[5px]" placeholder="请选择时间" readonly type="text"/>
                <div class="-mt-[8px]">
                  <var-icon name="chevron-down"/>
                </div>
              </div>
              <template #options>
                <var-menu-option v-for="item in selectedOptions" :key="item.value" :label="item.label" :value="item.value"></var-menu-option>
              </template>
            </var-menu-select>
          </template>
        </z-form-item>
        <div class="mt-[27px]">
          <div class="text-[18px] opacity-[0.4]">开始倒计时</div>
        </div>
        <div
            class="mt-[20px] flex items-center justify-between  rounded-[5px] w-full h-[45px] border-[2px] border-[var(--pop-input-border-color)] px-[15px]">
          <input class="w-[95%] h-full bg-transparent outline-0 pr-[5px]" :value="timeLeft" readonly type="text"/>
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
        <div class="my-[35px] ">
          <div class="w-full flex items-center justify-center">
            <button
                v-ripple
                class="w-[147px] h-[54px] text-[24px] leading-[54px] text-[var(--color-primary)] text-center bg-[var(--member-confirm-bg)]   rounded-[10px]">{{ t("member.buyItNow") }}
            </button>
          </div>
        </div>
      </z-form>
  </pop-window>
  <CardBuy v-model:show="cardShow" :type="data?.vipname" :data="data" :validityPeriod="timeLeft"></CardBuy>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import PopWindow from "@/components/pop-window.vue";
import CardBuy from "views/member/card-buy.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";
import ZFormItem from "@/components/z-form-item.vue";
import {Snackbar} from "@varlet/ui";
import ZForm from "@/components/z-form.vue";
import {getNumber} from "utils/base.ts";
import dayjs from "dayjs";






const {t} = useI18n() // 解构出t方法

type Props = {
  show: boolean,
  robotType?: 'buy' | 'make',
  data:any
}

const props = withDefaults(defineProps<Props>(), {
  show: false,

})

const selectedOptions = ref([]);

onMounted(()=>{
  selectedOptions.value = props.data?.paid_plan.map(_item => {
    return {
      value:  1,
      label: _item.day + "天",
      price: getNumber(_item,'price',true),
      day:_item.day
    }
  })
})

const selectedTime =computed(()=>{
  console.log(buyRobotFormData.value,selectedOptions.value)
  return selectedOptions.value.find(item=>item.value === buyRobotFormData.value.id)
})

const timeLeft = computed(()=>{
  if(!selectedTime.value){
    return ''
  }
  return (dayjs().format('YYYY-MM-DD') + '至' +  dayjs().add(Number(selectedTime.value?.day),'day').format('YYYY-MM-DD'))
})

const emit = defineEmits(['update:show', 'update:robotType'])

const makeRobotFormInstance = ref<InstanceType<typeof ZForm>>()
const makeRobotForm = toTypedSchema(
    zod.object({
      helpWord: zod.string({message: '输入助记词'}).min(1, {message: '输入助记词'}),
      walletAddress: zod.string({message: '钱包地址不合法'}).min(1, {message: '钱包地址不合法'}),
    })
);

const makeRobotFormData = ref({
  helpWord: '',
  walletAddress: '',
})

const buyRobotFormInstance = ref<InstanceType<typeof ZForm>>()
const buyRobotForm = toTypedSchema(
    zod.object({
      id: zod.number({message: '选择时间'}).min(1, {message: '选择时间'}),
    })
);
const buyRobotFormData = ref({
  id: '',
})


const step = ref(1);

const setStep = (stepNumb: number) => {
  if (stepNumb == 1) {
    emit('update:robotType', 'make')
  } else {
    emit('update:robotType', 'buy')
  }
  step.value = stepNumb
}


const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show', val)
  }
})

const clear = ()=>{
  makeRobotFormInstance.value?.resetForm();
  buyRobotFormInstance.value?.resetForm();
}


const makeRobot = (value: any) => {
  makeRobotFormData.value = value;
  step.value = 2;
  emit('update:robotType', 'buy');
}

const buyRobot =(value:any)=>{
  buyRobotFormData.value = value;
  if(makeRobotFormData.value.helpWord == "" || makeRobotFormData.value.walletAddress == ""){
    step.value = 1;
    emit('update:robotType', 'make');
    return;
  }
  cardShow.value = true;
}

const cardShow = ref(false);

const close = () => {
  showPop.value = false;
  step.value = 1;
  emit('update:robotType', 'make')
  clear()
}


const getTimeList = () => {
  try {
  } catch (e) {
    Snackbar.error({
      content: "获取时间失败",
      duration: 1000,
    })
  }
}

onMounted(() => {
  getTimeList()
})

</script>

<style lang="scss" scoped>
input::placeholder {
  color: #605D75;
}

:deep(.var-counter__input) {
  @apply h-[46px] w-[64px] bg-[rgba(122,120,131,0.05)] rounded-[2px] border-2 border-[#1D1A2A] text-[24px];
}
</style>
