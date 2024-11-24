<template>
<div class="w-full text-[26px] text-center pt-[26px]">代币安全检测</div>
  <div class="w-full px-[19px]">
    <div class="mt-[43px]">
      <img src="assets/images/hot-token/logo.png" alt="" class="w-[102px] h-[30px]">
    </div>
    <div class="mt-[21px] h-[323px] w-full">
      <img src="assets/images/login/login-bg.png" class="w-full h-full" alt="">
    </div>
    <div class="mt-[23px]">
      <var-menu class="w-full" placement="bottom" same-width v-model:show="menuShow">
        <div class="mt-[20px] flex items-center justify-between  rounded-[5px] w-full h-[45px] border-[2px] border-[#1D1A2A] px-[15px]">
          <input type="text" class="w-[95%] h-full bg-transparent outline-0 pr-[5px]" placeholder="请输入助记词" v-model="optionsValue"/>
          <div class="-mt-[8px]">
            <var-icon name="chevron-down" />
          </div>
        </div>
        <template #menu>
          <div class="max-h-[260px] overflow-y-auto">
            <template v-for="item in options" :key="item">
              <var-cell @click="selectMnemonic(item)">
                {{ item.value }}
              </var-cell>
            </template>
          </div>

        </template>
      </var-menu>
    </div>
    <div class="mt-[16px] flex items-center w-full rounded-[5px] h-[45px]  border-[2px] border-[#1D1A2A]">
      <div class="w-[98%]">
        <input type="text" class="w-full bg-transparent outline-0 px-[15px]" placeholder="请设置自动买卖时间" v-model="mnemonicPhrase">
      </div>
      <div class="flex-1 px-[10px] flex justify-center items-center"><var-icon name="window-close" size="18" color="#605D75" v-if="mnemonicPhrase.length > 0" @click="reset"/></div>
    </div>
    <div class="mt-[117px]">
      <div class="w-full h-[58px]">
        <ai-button></ai-button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import AiButton from "@/components/ai-button.vue";

// 下拉选项
const options = ref([
  {
    value:'123',
    key: 1
  },
  {
    value:'124',
    key: 2
  },
  {
    value:'134',
    key: 3
  },
  {
    value:'234',
    key: 4
  },
  {
    value:'123',
    key: 1
  },
  {
    value:'124',
    key: 2
  },
  {
    value:'134',
    key: 3
  },
  {
    value:'234',
    key: 4
  },
  {
    value:'123',
    key: 1
  },
  {
    value:'124',
    key: 2
  },
  {
    value:'134',
    key: 3
  },
  {
    value:'234',
    key: 4
  },
  {
    value:'123',
    key: 1
  },
  {
    value:'124',
    key: 2
  },
  {
    value:'134',
    key: 3
  },
  {
    value:'234',
    key: 4
  },
]);

const menuShow = ref(false);


const optionsValue = ref("");
const optionsKey = ref("");
const selectMnemonic = (item:any)=>{
  optionsValue.value = item.value;
  optionsKey.value = item.key;
  menuShow.value = false;
}



const mnemonicPhrase = ref("");


// 重置
const reset = ()=>{
  mnemonicPhrase.value = "";
}
</script>

<style lang="scss" scoped>

</style>
