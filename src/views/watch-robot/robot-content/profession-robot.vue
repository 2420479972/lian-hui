<template>
  <div class="w-full mt-[27px]">
    <div class="text-[18px] mb-[16px] text-[var(--watch-robot-title)]">
      {{ t('member.helpWords') }}
    </div>
    <z-form ref="linkFormRef" v-model:formData="linkFormData" :validation-schema="linkForm" is-custom>
      <z-form-item class="mt-1" name="mnemonic"
                   placeholder="test test test test test test test test test test test"></z-form-item>
      <div class="flex items-center justify-between  mb-[16px] mt-[18px]">
        <div class="text-[var(--watch-robot-title)] text-[18px]">{{ t('robot.LPAddress') }}</div>
        <div class="flex items-center space-x-[9px]">
          <div class="text-[18px] opacity-[0.4]  whitespace-nowrap">{{ t('robot.numberOfSubWallets') }}</div>
          <div class="w-[150px]">
            <z-form-item :validation="yup.string().required(t('robot.numberOfSubWallets'))" name="subNumber"
                         placeholder="test test test test test test test test test test test"
                         type="number"></z-form-item>
          </div>
        </div>
      </div>
      <div class="w-full flex  space-x-2">
        <z-form-item class="w-[370px]" name="s_pair_add" placeholder="test test test test test test test test test test test"
                     type="custom">
          <template #default="{fieldValue,input}">
            <var-menu-select :placement="'bottom-start'"
                             class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[var(--pop-input-border-color)] outline-0 px-[15px]">
              <input
                  :value="fieldValue"
                  class="w-full bg-transparent h-full"
              >
              <template #options>
                <var-menu-option label="12341234123412341234123412341234123412341234"
                                 @click="input('12341234123412341234123412341234123412341234')"/>
              </template>
            </var-menu-select>
          </template>
        </z-form-item>
        <button
            v-ripple="{disabled:isLinked}"
            class="w-[138px] h-[45px] border-[2px] border-[var(--input-border-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" @click="linkWallet">
          <template v-if="isLinkLoading">
            <var-loading class="opacity-[0.4]" color="#FFFFFF" size="small"/>
            <span class="text-[#605D75] text-[18px] ml-[5px]">{{ t('public.loading') }}</span>
          </template>
          <span v-else>{{ !isLinkLoading && !isLinked ? t('robot.linkPurse') : t('robot.linked') }}</span>
        </button>
      </div>
    </z-form>
  </div>
  <div class="w-full mt-[27px]">
    <div class="opacity-[0.4] text-[18px] mb-[16px]">
      {{ t('robot.newTreading') }}
    </div>
    <z-form class="w-full flex space-x-2" ref="subFormRef" v-model:formData="sbuFormData" :validation-schema="subForm" is-custom>
      <z-form-item  class="w-[302px]" name="showMount" type="number"
                   placeholder="test test test test test test test test test test test"></z-form-item>
      <div class="space-x-[8px] flex  text-[18px]">
        <div
            v-ripple
            class="w-[100px] h-[45px] border-[2px] px-[5px] border-[var(--watch-robot-stop-border)] text-[var(--watch-robot-stop-text-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" @click="stopListening">
          {{ t('robot.stopListening') }}
        </div>
        <div
            v-ripple
            class="w-[100px] h-[45px] border-[var(--watch-robot-start-border)]  text-[var(--watch-robot-start-text-color)] px-[5px] bg-[var(--watch-robot-start-bg)] flex items-center justify-center rounded-[5px]" @click="startListening">
          <template v-if="listenStartLoading">
            <var-loading color="var(--watch-robot-start-text-color)" />
          </template>
          <template v-else>
            {{ listenStartFlag ? t('robot.listening') : t('robot.startListening') }}
          </template>
        </div>
      </div>
    </z-form>
    <div
        v-if="walletShowList.length > 0"
        class="w-full p-[13px] min-h-[85px] border-[var(--input-border-color)]  border-2 mt-[24px] space-y-4 flex justify-between items-end">
      <div class="w-[95%]">
        <template v-for="(item) in walletShowList.slice(0,5)" :key="item.address">
          <div class="text-[21px] text-[var(--watch-robot-more-color)]">
            {{ t('robot.SubWalletsAddress') }}：{{ formatAddress(item.address) }}
          </div>
        </template>
      </div>
      <div
          v-if="walletList.length > 5"
          v-ripple class="w-[100px]  text-[18px] h-[45px] border-[2px] border-[var(--input-border-color)]  bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" @click="showMore = true">
        <span class="opacity-[0.4]">{{ t('public.more') }}</span>
      </div>
    </div>
  </div>
  <pop-window v-model:show="showMore" :showLine="false" :title="t('public.more')">
    <div class="w-[95%] space-y-4 min-h-[300px] max-h-[600px]">
      <div v-for="item in walletList" :key="item.address"
           class="text-[22px] text-[#605D75] w-full flex items-center justify-between">
        <span>{{ t('robot.SubWalletsAddress') }}</span>
        <span>{{ formatAddress(item.address) }}</span>
      </div>
    </div>
  </pop-window>
</template>

<script lang="ts" setup>
import PopWindow from "@/components/pop-window.vue";
import {useI18n} from "vue-i18n";
import ZFormItem from "@/components/z-form-item.vue";
import * as yup from "yup";
import {ethers, HDNodeWallet, Mnemonic} from 'ethers'
import {formatAddress} from "utils/base.ts";
import ZForm from "@/components/z-form.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";
import {Snackbar} from "@varlet/ui";
import {useSwapInfo} from "store/swap.ts";

const swapStore = useSwapInfo();
const emit = defineEmits(["LinkSuccess"]);

const {t} = useI18n() // 解构出t方法
const showMore = ref(false);

const {walletList, loadSwapInfo,listenStartFlag,listenStartLoading} = inject('useSwap',{
  useSwap:{}as any
})['useSwap']

const isLinkLoading = ref(false);
const isLinked = ref(false);

const linkForm = toTypedSchema(zod.object({
      s_pair_add: zod.string({message: '请输入LP pair地址'}).min(1, {message: '请输入LP pair地址'}),
      mnemonic: zod.string({message: '请输入助记词'}).min(1, {message: '请输入助记词'}),
      subNumber: zod.number({message: '请输入子钱包数量'}).min(1, {message: '请输入子钱包数量'}),
    }));

const linkFormData = swapStore.monitorDetails
const walletShowList = ref<any[]>([])
const linkFormRef = ref<InstanceType<typeof ZForm>>();
const linkWallet = async () => {
  if (isLinked.value) return;
  walletList.length = 0;
  linkFormRef.value?.validateForm(async () => {
    try {
      const mnemonicInstance = Mnemonic.fromPhrase(linkFormData.mnemonic);
      const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-2-s1.bnbchain.org:8545");
      for (let i = 0; i < linkFormData.subNumber; i++) {
        const path = "m/44'/60'/0'/0/" + i;
        let wallet = HDNodeWallet.fromMnemonic(mnemonicInstance, path).connect(provider)
        walletList.push(
            Object.assign(
                wallet
            )
        );
      }
      walletShowList.value = walletList;
      emit('LinkSuccess', walletList[0]);
      Snackbar.success({
        content: "链接成功！",
        duration: 1000,
      })
    } catch (e) {
      console.error(e)
      Snackbar.error({
        content: "链接失败！请检查助记词和LP地址！",
        duration: 1000,
      })
    }

    isLinked.value = true;
    isLinkLoading.value = false;
  })
}

const subFormRef = ref<InstanceType<typeof ZForm>>();
const sbuFormData = ref({
  showMount:5
});
const subForm = toTypedSchema(
    zod.object({
      showMount: zod.number({message: '请输入最新事件显示数量'}).min(1, {message: '请输入最新事件显示数量'}),
    })
);
const startListening = async () => {
  // if (!isLinked.value) return;
  subFormRef.value?.validateForm(async ()=>{
    await loadSwapInfo({
      s_pair_add: linkFormData.s_pair_add,
      mainRouter: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
      sub_number: linkFormData.subNumber
    });
  })

}


const selectMenu = (tab, input) => {
  console.log(tab)
}

const stopListening = () => {

}


</script>

<style lang="scss" scoped>


</style>
