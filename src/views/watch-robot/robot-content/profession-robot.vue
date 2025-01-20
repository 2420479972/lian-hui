<template>
  <div class="w-full mt-[27px]">
    <div class="text-[18px] mb-[16px] text-[var(--watch-robot-title)]">
      {{t('member.helpWords')}}
    </div>
    <z-form-item name="mnemonic" :validation="yup.string().required(t('member.helpWords'))" placeholder="test test test test test test test test test test test" class="mt-1"></z-form-item>
    <div class="flex items-center justify-between  mb-[16px] mt-[18px]">
      <div class="text-[var(--watch-robot-title)] text-[18px]">{{t('robot.LPAddress')}}</div>
      <div class="flex items-center space-x-[9px]">
        <div class="text-[18px] opacity-[0.4]  whitespace-nowrap">{{t('robot.numberOfSubWallets')}}</div>
        <div class="w-[120px]">
          <z-form-item name="subNumber" :validation="yup.string().required(t('robot.numberOfSubWallets'))" placeholder="test test test test test test test test test test test"></z-form-item>
        </div>
      </div>
    </div>
    <div class="w-full flex  space-x-2">
      <z-form-item type="custom" name="s_pair_add"  :validation="yup.string().required(t('robot.LPAddress'))" class="w-[370px]" placeholder="test test test test test test test test test test test">
        <template #default="{fieldValue,input}">
          <var-menu-select :placement="'bottom-start'" class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[var(--pop-input-border-color)] outline-0 px-[15px]">
            <input
                :value="fieldValue"
                class="w-full bg-transparent h-full"
                >
            <template #options>
              <var-menu-option label="12341234123412341234123412341234123412341234" @click="input('12341234123412341234123412341234123412341234')"/>
            </template>
          </var-menu-select>
        </template>
      </z-form-item>
      <div class="w-[138px] h-[45px] border-[2px] border-[var(--input-border-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]"  v-ripple="{disabled:isLinked}" @click="linkWallet">
        <template v-if="isLinkLoading">
          <var-loading size="small" color="#FFFFFF" class="opacity-[0.4]"/>
          <span class="text-[#605D75] text-[18px] ml-[5px]">{{t('public.loading')}}</span>
        </template>
        <span v-else>{{ !isLinkLoading && !isLinked ? t('robot.linkPurse') :  t('robot.linked')}}</span>
      </div>
    </div>
  </div>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      {{t('robot.newTreading')}}
    </div>
    <div class="w-full flex space-x-2">
      <z-form-item name="showamount" :validation="yup.string().required(t('robot.newTreading'))" class="w-[302px]" placeholder="test test test test test test test test test test test"></z-form-item>
      <div class="space-x-[8px] flex  text-[18px]">
        <div class="w-[100px] h-[45px] border-[2px] px-[5px] border-[var(--watch-robot-stop-border)] text-[var(--watch-robot-stop-text-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple  @click="stopListening">
          {{t('robot.stopListening')}}
        </div>
        <div class="w-[100px] h-[45px] border-[var(--watch-robot-start-border)]  text-[var(--watch-robot-start-text-color)] px-[5px] bg-[var(--watch-robot-start-bg)] flex items-center justify-center rounded-[5px]"  v-ripple @click="startListening">
          {{t('robot.startListening')}}
        </div>
      </div>

    </div>
    <div class="w-full p-[13px] min-h-[85px] border-[var(--input-border-color)]  border-2 mt-[24px] space-y-4 flex justify-between items-end" v-if="subWalletsAddressList.length > 0">
      <div class="w-[95%]">
        <template v-for="(item) in subWalletsAddressList.slice(0,5)" :key="item.address">
          <div class="text-[21px] text-[var(--watch-robot-more-color)]">{{t('robot.SubWalletsAddress')}}：{{formatAddress(item.address)}}</div>
        </template>
      </div>
      <div class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[var(--input-border-color)]  bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" v-ripple @click="showMore = true" v-if="subWalletsAddressList.length > 5">
        <span class="opacity-[0.4]">{{t('public.more')}}</span>
      </div>
    </div>
  </div>
  <pop-window :title="t('public.more')" v-model:show="showMore" :showLine="false">
    <div class="w-[95%] space-y-4 min-h-[300px] max-h-[600px]">
      <div class="text-[22px] text-[#605D75] w-full flex items-center justify-between" v-for="item in subWalletsAddressList" :key="item.address">
        <span>{{t('robot.SubWalletsAddress')}}</span>
        <span>{{formatAddress(item.address)}}</span>
      </div>
    </div>
  </pop-window>
</template>

<script setup lang="ts">
import PopWindow from "@/components/pop-window.vue";

const emit = defineEmits(["now-type-status"]);
import {useI18n} from "vue-i18n";
import ZFormItem from "@/components/z-form-item.vue";
import {useForm} from "vee-validate";
import abiinfo from "@/localinfo/abi.json"
import * as yup from "yup";
import {Contract, HDNodeWallet, Mnemonic} from 'ethers'
import {useSwapInfo} from "store/swap.ts";
import {formatAddress} from "utils/base.ts";
const { t } = useI18n() // 解构出t方法
const showMore = ref(false);
const swap = useSwapInfo();
const {values,validate,setFieldValue} = useForm();

const contract:any = {
  "pairs" : null,
  "router": null,
  "token0": null,
  "token1": null,
}

const options = [
  {
    value:'1234',
    label:'1234',
  }
]
const subWalletsAddressList = ref<any[]>([]);
const isLinkLoading = ref(false);
const isLinked = ref(false);
const linkWallet =async ()=>{
  if(isLinked.value) return;
  isLinkLoading.value = true;
  const { valid } = await validate();
  if(!valid) {
    isLinkLoading.value = false;
    return ;
  }
  subWalletsAddressList.value = [];
  const mnemonicInstance = Mnemonic.fromPhrase(values.mnemonic);
  for (let i = 0; i < values.subNumber; i++) {
    const path = "m/44'/60'/0'/0/" + i;
    let wallect = HDNodeWallet.fromMnemonic(mnemonicInstance, path).connect(swap.etherProvider)
    subWalletsAddressList.value.push(
        Object.assign(
            wallect
        )
    );
  }
  isLinked.value = true;
  isLinkLoading.value = false;
}

const setDetails = ()=>{
  Object.keys(swap.MonitorDetails).forEach((item:any)=>{
    if(swap.MonitorDetails[item]){
      setFieldValue(item,swap.MonitorDetails[item])
    }
  })
}

onMounted(()=>{
  setDetails()
})

const startListening =async ()=>{
  if(!isLinked.value) return;
  {
    contract.pairs = new Contract(
        values.s_pair_add,
        abiinfo.pairs,
        subWalletsAddressList.value[0]
    );
    contract.router = new Contract(
        mainrouter.value,
        abiinfo.router,
        subWalletsAddressList.value[0]
    );
  }
}


const selectMenu = (tab,input)=>{
  console.log(tab)
}

const stopListening = ()=>{

}



</script>

<style lang="scss" scoped>


</style>
