<template>
  <pop-window v-model:show="showPop" :show-line="false" :title="t('public.detail')" @close="close">
    <z-form :validation-schema="buyRobotForm" @success="buyRobot" ref="buyRobotFormInstance" v-model:form-data="buyRobotFormData">
      <div class="mt-[27px]">
        <div class="text-[18px] opacity-[0.4]">选择时间</div>
      </div>
      <z-form-item name="id" type="custom">
        <template #default="{fieldValue,input}">
          <var-menu-select class="w-full" placement="bottom" same-width :model-value="fieldValue" @update:modelValue="input">
            <div
                class="mt-[20px] flex items-center justify-between  rounded-[5px] w-full h-[45px] border-[2px] border-[var(--pop-input-border-color)] px-[15px]">
              <input :value="options.find(item=>item.value === fieldValue)?.label" class="w-[95%] h-full bg-transparent outline-0 pr-[5px]" placeholder="请选择时间" readonly type="text"/>
              <div class="-mt-[8px]">
                <var-icon name="chevron-down"/>
              </div>
            </div>
            <template #options>
              <var-menu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></var-menu-option>
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
  <CardBuy v-model:show="cardShow" :data="data" :validityPeriod="timeLeft" :price="selectedTime?.price" :id="buyRobotFormData.id"></CardBuy>
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
import dayjs from "dayjs";
const {t} = useI18n() // 解构出t方法

type Props = {
  show: boolean,
  data:{},
  options:{
    value:string,
    label:string,
    price:number,
    day: number,
  }[
  ]
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  data:()=>({}),
  options:()=>[]
})

const emit = defineEmits(['update:show','close'])

const buyRobotFormInstance = ref<InstanceType<typeof ZForm>>()

const buyRobotForm = toTypedSchema(
    zod.object({
      id: zod.number({message: '选择时间'}).min(1, {message: '选择时间'}),
    })
);

const buyRobotFormData = ref({
  id: '',
})


const selectedTime =computed(()=>{
  return props.options.find(item=>item.value === buyRobotFormData.value.id)
})

const timeLeft = computed(()=>{
  if(!selectedTime.value){
    return ''
  }
  return (dayjs().format('YYYY-MM-DD') + '至' +  dayjs().add(Number(selectedTime.value?.day),'day').format('YYYY-MM-DD'))
})


const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show', val)
  }
})

const clear = ()=>{
  buyRobotFormInstance.value?.resetForm();
}

const buyRobot =()=>{
  cardShow.value = true;
}

const cardShow = ref(false);

const close = () => {
  showPop.value = false;
  emit('close')
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
