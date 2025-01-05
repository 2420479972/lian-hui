<template>
  <pop-window v-model:show="showPop" :title="t('airdrop.launchAirdrop')" :showLine="false" @close="clear">
    <z-form :validationSchema="validationSchema" ref="formInstance" @success="define">
      <z-form-item type="custom" name="type" class="mb-[18px]" #default="{input,fieldValue}">
          <div class="flex items-center space-x-[20px] mt-[18px] ">
            <div class="flex items-center space-x-[9px]" @click="input('bsc')">
              <div class="h-[25px] w-[25px] rounded-full bg-[rgba(134,144,156,0.2)] flex items-center justify-center" >
                <div class="h-[11px] w-[11px]  rounded-full" :style="{background:fieldValue == 'bsc' ?  '#1CE89F' : '#86909C'}" ></div>
              </div>
              <div class="text-[20px] opacity-[0.65]">BSC</div>
            </div>
            <div class="flex items-center space-x-[9px]" @click="input('eth')">
              <div class="h-[25px] w-[25px] rounded-full bg-[rgba(134,144,156,0.2)] flex items-center justify-center" >
                <div class="h-[11px] w-[11px] bg-[#86909C] rounded-full" :style="{background:fieldValue == 'eth' ?  '#1CE89F' : '#86909C'}" ></div>
              </div>
              <div class="text-[20px] opacity-[0.65]">ETH</div>
            </div>
          </div>
      </z-form-item>
      <div class="space-y-[18px]">
        <template v-for="item in formList" :key="item.name">
          <z-form-item v-bind="item"></z-form-item>
        </template>
        <div class="w-full flex items-center space-x-[14px]">
          <div class="text-[18px] opacity-[0.4]">{{t('airdrop.inputAirdropContract')}}</div>
          <div class="text-[16px] text-[#605D75]">{{t('airdrop.inputTip')}}</div>
        </div>
          <z-form-item name="makeAddress" class="flex-1"></z-form-item>

        <z-form-item type="textarea" name="introduction" :label="t('airdrop.introductionToInputTokens')">
          <template #label="{label}">
            <div class="text-[21px] opacity-[0.6]">{{label}}</div>
          </template>
        </z-form-item>
            <div class="space-x-[22px] flex mt-[18px]">
              <div class="text-[18px] opacity-[0.6]">{{t('airdrop.whetherToHold')}}ERC20</div>
              <div class="w-[207px]">
                <z-form-item name="tokenNumber" :placeholder="t('airdrop.numberOfTokens')"></z-form-item>
              </div>
            </div>

          <div class="space-x-[22px] flex  mt-[18px]">
            <div class="w-ful">
              <div class="text-[18px] opacity-[0.6]">{{t('airdrop.pickUpAtASingleAddress')}}</div>
            </div>
            <div class="w-[80px]">
              <z-form-item name="howMany"></z-form-item>
            </div>
            <div class="text-[18px] opacity-[0.6]">{{t('airdrop.hoursDay')}}</div>
            <div class="w-[80px]">
              <z-form-item name="severalTimes"></z-form-item>
            </div>
            <div class="text-[18px] opacity-[0.6]">{{t('public.times')}}</div>
          </div>
      </div>
      <div class="w-full mt-5 flex items-center justify-center flex-col">
        <button class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center  border-[3px] border-solid rounded-[10px]" :style="{background:'var(--airdrop-card-receive)',color:'var(--airdrop-card-dis-text)'}" v-ripple>{{t('airdrop.confirmRelease')}}</button>
        <div class="mt-[14px]">
          <div class="text-[16px] text-[#605D75]">
            {{t('airdrop.defray')}} {{money}} USDT
          </div>
        </div>
      </div>
    </z-form>
  </pop-window>
</template>

<script setup lang="ts">
import PopWindow from "@/components/pop-window.vue";

type Props = {
  show:boolean
}
import {useI18n} from "vue-i18n";
import {Snackbar} from "@varlet/ui";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";
import ZForm from "@/components/z-form.vue";
import ZFormItem from "@/components/z-form-item.vue";

const { t } = useI18n() // 解构出t方法



const props = withDefaults(defineProps<Props>(),{
  show:false
})



const emit = defineEmits(['update:show','success'])

const showPop = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show',val)
  }
})


const money = ref(0);


const validationSchema = toTypedSchema(
    zod.object({
      type: zod.string({message: '请选择代币类型'}),
      tokenName: zod.string({message: '请输入代币名称'}).min(1, {message: '请输入代币名称'}),
      airdropQuantity: zod.string({message: '请输入空投数量'}).min(1, {message: '请输入空投数量'}).regex(/^[1-9]\d*$/,{
        message: '数字不合法！'
      }),
      airdropQuantityNumber: zod.string({message: '请输入空投份数'}).min(1, {message: '请输入空投份数'}).regex(/^[1-9]\d*$/,{
        message: '数字不合法！'
      }),
      tokenAddress: zod.string({message: '请输入代币地址'}).min(1, {message: '请输入代币地址'}),
      introduction: zod.string({message: '请输入代币介绍'}).min(1, {message: '请输入代币介绍'}),
      tokenNumber: zod.string({message: '请输入代币数量'}).regex(/^[1-9]\d*$/,{
        message: '数字不合法！'
      }),
      howMany: zod.string({message: '输入时间'}).min(1, {message: '输入时间'}).regex(/^[1-9]\d*$/,{
        message: '数字不合法！'
      }),
      severalTimes: zod.string({message: '输入次数'}).min(1, {message: '输入次数'}).regex(/^[1-9]\d*$/,{
        message: '数字不合法！'
      }),
      makeAddress: zod.string({message: '未生成合约地址'}),
    })
);

const formList = [
  {
    name: 'tokenName',
    placeholder: t('node.inputAddress'),
    label:t( 'airdrop.inputTokenName')
  },
  {
    name: 'airdropQuantity',
    placeholder: t( 'public.please') + t( 'airdrop.inputAirdropQuantity'),
    label:t( 'airdrop.inputAirdropQuantity'),
  },
  {
    name: 'airdropQuantityNumber',
    placeholder: t( 'public.please') + t( 'airdrop.inputAirdropQuantityCopy'),
    label:t( 'airdrop.inputAirdropQuantityCopy'),
  },
  {
    name: 'tokenAddress',
    placeholder: t( 'public.please') + t( 'airdrop.inputTokenAddress'),
    label:t( 'airdrop.inputTokenAddress'),
  },
]

const formInstance = ref<InstanceType<typeof ZForm>>()

// 确认发布
const define = (values:any)=>{
  try{
    console.log(values)
    emit('success',values)
    Snackbar.success({
      content: t('airdrop.PublishSuccess'),
      duration: 1000,
    })
    clear()
  }catch (e) {
    Snackbar.error({
      content: t('airdrop.PublishFailed'),
      duration: 1000,
    })
  }
}
const clear = ()=>{
  formInstance.value?.resetForm();
}

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
