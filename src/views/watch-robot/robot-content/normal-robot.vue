<template>
  <div class="w-full mt-[27px]">
    <div class="text-[18px] mb-[16px] text-[var(--watch-robot-title)]">
      {{ t('member.helpWords') }}
    </div>
    <z-form :validation-schema="linkForm" @success="linkPurse">
      <z-form-item class="mt-1" name="mnemonic"
                   placeholder="test test test test test test test test test test test"></z-form-item>
      <div class="text-[18px] mb-[16px] text-[var(--watch-robot-title)]  mt-[18px]">
        {{ t('robot.LPAddress') }}
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
                  @change="e=>input(e.target?.value)"
              >
              <template #options>
                <var-menu-option label="12341234123412341341234" @click="input('123123123123123')"/>
              </template>
            </var-menu-select>
          </template>
        </z-form-item>
        <button
            v-ripple="{disabled:isLinked}"
            class="w-[138px] h-[45px] border-[2px] border-[var(--input-border-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]">
          {{ !isLinked ? t('robot.linkPurse') : t('robot.linked') }}
        </button>
      </div>
    </z-form>
  </div>
  <div class="w-full mt-[27px]">
    <div class=" text-[18px] mb-[16px] text-[var(--watch-robot-title)]">
      {{ t('robot.newTreading') }}
    </div>
    <z-form ref="tradingFrom" :validation-schema="trading" class="w-full flex space-x-2" is-custom>
      <z-form-item name="subNumber" placeholder="0x8f3490a7385e9ac2df31e267199df6e7c6525200"
                   type="number"></z-form-item>
      <div class="space-x-[8px] flex  text-[18px]">
        <div
            v-ripple
            class="w-[100px] h-[45px] border-[2px] px-[5px] border-[var(--watch-robot-stop-border)] text-[var(--watch-robot-stop-text-color)] bg-[rgba(122,120,131,0.05)] flex items-center justify-center rounded-[5px]" @click="stopListening">
          {{ t('robot.stopListening') }}
        </div>
        <button
            v-ripple
            class="w-[100px] h-[45px] border-[var(--watch-robot-start-border)]  text-[var(--watch-robot-start-text-color)] px-[5px] bg-[var(--watch-robot-start-bg)] flex items-center justify-center rounded-[5px]" @click="startListening">
          {{ t('robot.startListening') }}
        </button>
      </div>
    </z-form>
  </div>
</template>

<script lang="ts" setup>
import {Snackbar} from "@varlet/ui";
import {useI18n} from "vue-i18n";
import ZFormItem from "@/components/z-form-item.vue";
import {Contract, ethers, HDNodeWallet, Mnemonic} from 'ethers'
import {useSwapInfo} from "store/swap.ts";
import ZForm from "@/components/z-form.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from "zod";
import abiinfo from "@/localinfo/abi.json"

const emit = defineEmits(["now-type-status", "LinkSuccess"]);

const {t} = useI18n() // 解构出t方法

const swap = useSwapInfo();

const linkForm = toTypedSchema(
    zod.object({
      s_pair_add: zod.string({message: '请输入LP pair地址'}).min(1, {message: '请输入LP pair地址'}).default('0xD99D1c33F9fC3444f8101754aBC46c52416550D1'),
      mnemonic: zod.string({message: '请输入助记词'}).min(1, {message: '请输入助记词'}).default('test test test test test test test test test test test junk'),
    })
);

const trading = toTypedSchema(
    zod.object({
      subNumber: zod.number({message: '请输入最新事件显示数量'}).min(1, {message: '请输入最新事件显示数量'}),
    })
);

const contract: any = {
  "pairs": null,
  "router": null,
  "token0": null,
  "token1": null,
}

const subWalletsAddress = ref<any>();

const isLinked = ref(false);
const swapEvents = ref([]); // 存储 swap 事件信息
const sub_swapEvents = ref([]); // 存储 swap 事件信息
const linkPurse = async (value: any) => {
  if (isLinked.value) return;
  try {
    {
      contract.pairs = new Contract(
          value.s_pair_add,
          abiinfo.pairs,
          subWalletsAddress.value
      );
    }
    const mnemonicInstance = Mnemonic.fromPhrase(value.mnemonic);
    const path = "m/44'/60'/0'/0/" + 1;
    const wallect = HDNodeWallet.fromMnemonic(mnemonicInstance, path).connect(swap.etherProvider);
    subWalletsAddress.value = Object.assign(wallect);
    Snackbar.success({
      content: "链接成功！",
      duration: 1000,
    })
    emit('LinkSuccess',Object.assign(wallect));
    isLinked.value = true;
  } catch (e) {
    Snackbar.error({
      content: "链接失败！请检查助记词和LP地址！",
      duration: 1000,
    })
  }
}

onMounted(() => {
  // setDetails()
})

const tokenAinfo = ref({
  symbol: '',
  balance: ''
});

const tokenBinfo = ref({
  symbol: '',
  balance: ''
});

let provider:any = null;
watch(()=>swap.etherInfo.selectedNodeUrl,(newVal)=>{
  provider = new ethers.JsonRpcProvider(newVal)
},{
  immediate:true,
  deep:true,
})

const tradingFrom = ref<InstanceType<typeof ZForm>>();
const startListening = async () => {
  if (!tradingFrom.value?.validateForm) return;
  tradingFrom.value?.validateForm(async (values:any) => {
    contract.router = new Contract(
        "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
        abiinfo.router,
        subWalletsAddress.value
    );

    let [reserve0, reserve1] = await contract.pairs.getReserves()

    {
      async function loadtoken0() {
        let token0_add = await contract.pairs.token0()
        contract.token0 = new Contract(
            token0_add,
            abiinfo.IERC20,
            subWalletsAddress.value
        );
        let [decimals, symbol, balance] =
            await Promise.all([contract.token0.decimals(), contract.token0.symbol(), contract.token0.balanceOf(subWalletsAddress.value.address)])

        tokenAinfo.value = {
          symbol: symbol,
          decimals: decimals,
          balance: ethers.formatUnits(balance, decimals),
          address: token0_add,
          price: Number(reserve1) / Number(reserve0)
        }
      }
      async function loadtoken1() {//deal token1
        let token1_add = await contract.pairs.token1()
        contract.token1 = new Contract(
            token1_add,
            abiinfo.IERC20,
            subWalletsAddress.value
        );
        let [decimals, symbol, balance] =
            await Promise.all([contract.token1.decimals(), contract.token1.symbol(), contract.token1.balanceOf(subWalletsAddress.value.address)])
        tokenBinfo.value = {
          symbol: symbol,
          decimals: decimals,
          balance: ethers.formatUnits(balance, decimals),
          address: token1_add,
          price: Number(reserve0) / Number(reserve1)
        }
      }

      await Promise.all([
        loadtoken0(), loadtoken1()
      ])
    }

    var factory_add = await contract.pairs.factory()
    var factory_add2 = await contract.router.factory()
    if (factory_add != factory_add2) {
      console.log(factory_add, factory_add2);
      alert('环境不符合要求：配对合约和路由合约不相关')
      return;
    }

    async function pushswapevent(event:any) {
      const { to, amount0In, amount1In, amount0Out, amount1Out } = event.args; // 提取参数
      const block = await provider.getBlock(event.blockNumber);
      const date = new Date(block.timestamp * 1000); // 将 Unix 时间戳转换为 JS 日期
      let baseinfo = {
        transferhash: options[selectedEnvironment.value].blockexplorer + event.log.transactionHash,
        to: to,
        time: date.toLocaleString(), // 转换为本地时间格式
      }
      let info = Object.assign(baseinfo, {
        intoken: amount0In > 0 ? tokenAinfo.value.symbol : tokenBinfo.value.symbol, // 根据输入和输出判断是哪个代币
        amountin: amount0In > 0 ? ethers.formatUnits(amount0In, tokenAinfo.value.decimals) : ethers.formatUnits(amount1In, tokenBinfo.value.decimals),
        outtoken: amount0In > 0 ? tokenBinfo.value.symbol : tokenAinfo.value.symbol,
        amountout: amount0In > 0 ? ethers.formatUnits(amount1Out, tokenBinfo.value.decimals) : ethers.formatUnits(amount0Out, tokenAinfo.value.decimals),
      })
      const isToInWallects = subWalletsAddress.value.address.toLowerCase() === to.toLowerCase();
      if (isToInWallects) {
        sub_swapEvents.value.push(info);
      } else {
        swapEvents.value.push(info);
        let random_num = Math.floor(Math.random() * (values.sub_number - 1)) + 1;
        console.log("event swap");
        if (amount0In > 0) {
          // await swap(false, wallects[random_num]);
        } else {
         // await swap(true, wallects[random_num]);
        }
      }

    }
  })
  // {
  //   contract.pairs = new Contract(
  //       values.s_pair_add,
  //       abiinfo.pairs,
  //       subWalletsAddressList.value[0]
  //   );
  //   contract.router = new Contract(
  //       "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
  //       abiinfo.router,
  //       subWalletsAddressList.value[0]
  //   );
  // }
}

const stopListening = () => {

}

</script>

<style lang="scss" scoped>

</style>
