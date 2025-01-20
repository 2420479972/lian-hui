<template>
  <div class="p-[23px] flex flex-col h-full">
    <div class="pt-[15px] w-full text-[#297EFE]  text-[15px] p-[16px] bg-[var(--pop-text-bg)] space-y-2">
      <div class="flex items-center">
        <span>{{ t("node.speed") }}</span>
        <div class="ml-[30px] flex items-center space-x-4">
          <div class="flex space-x-1 items-center ">
            <div class="h-[9px] w-[9px] bg-[#1CE89F] rounded-full"></div>
            <span>{{ t("node.fast") }}</span>
          </div>
          <div class="flex space-x-1 items-center">
            <div class="h-[9px] w-[9px] bg-[#FFC513] rounded-full"></div>
            <span>{{ t("node.in") }}</span>
          </div>
          <div class="flex space-x-1 items-center">
            <div class="h-[9px] w-[9px] bg-[#FF3D3D] rounded-full"></div>
            <span>{{ t("node.slow") }}</span>
          </div>
        </div>
      </div>
      <div class="">
        {{ t("node.blockText") }}
      </div>
      <div class="">
        {{ t("node.blockText2") }}
      </div>
    </div>
    <div class="pt-[23px] w-full pb-[25px] opacity-[0.4] text-[21px]">
      {{ t("node.recommendedNodes") }}
    </div>
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div class="h-[90%] overflow-y-auto content w-full space-y-[12px]">
        <div
            v-for="(nodeItem,index) in nodeList"
            :key="index + '//'"
            class="w-[100%] h-[90px] rounded card-shadow bg-[var(--node-card-bg)] px-[16px] flex items-center justify-between"
            @click="selectNode(nodeItem)">
          <div class="text-[24px] w-[60%]">
            {{ nodeItem.address }}
          </div>
          <div class="flex-1 flex flex-col items-end">
            <template  v-if="nodeItem.ping != 0">
            <div class="text-[24px] flex items-center space-x-[11px]">
              <span>{{ nodeItem.ping }}</span>
                <div class="text-[18px]">ms</div>
                <div class="h-[9px] w-[9px] bg-[#1CE89F] rounded-full" :style="{background:nodeItem.ping < 500 ? '#1CE89F' : nodeItem.ping > 500 && nodeItem.ping < 1000 ? '#FFC513' : '#FF3D3D'}"></div>
            </div>
            </template>
            <template v-else>
              <div class="text-[18px] text-[#FF3D3D]">获取节点失败</div>
            </template>
          </div>
        </div>
      </div>
      <div class="flex-1 pt-[30px]">
        <div
            v-ripple
            class="w-[70%] m-auto h-[54px] flex items-center justify-center rounded-[10px] text-[24px] bg-[var(--member-confirm-bg)] text-[var(--color-primary)]"
            @click="addNode">{{ t("node.addCustomNode") }}
        </div>
      </div>
    </div>
  </div>
  <pop-window v-model:show="showCustomNode" :show-line="false" :title="t('node.addCustomNode')"  @close="clear">
    <z-form :validationSchema="validationSchema" @success="addNodeDefine" ref="formInstance">
      <template v-for="item in formItemList" :key="item.name">
        <z-form-item v-bind="item"  class="mb-2"></z-form-item>
      </template>
      <div class="w-full my-[10px] flex items-center justify-center">
        <button
            v-ripple
            class="w-[147px] h-[54px] text-[24px] leading-[54px] text-center bg-[var(--member-confirm-bg)] text-[var(--color-primary)] rounded-[10px]">
          {{ t("public.confirm") }}
        </button>
      </div>
    </z-form>
  </pop-window>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import PopWindow from "@/components/pop-window.vue";
import {Snackbar} from "@varlet/ui";
import {toTypedSchema} from "@vee-validate/zod";
import * as zod from 'zod';
import ZFormItem from "@/components/z-form-item.vue";
import ZForm from "@/components/z-form.vue";
import {pingTest} from "utils/base.ts";
import { LoadingBar } from '@varlet/ui'
import {useUserInfo} from "store/userInfo.ts";
import {useSwapInfo} from "store/swap.ts";

const {t} = useI18n() // 解构出t方法
const showCustomNode = ref(false);
const userInfo =  useUserInfo()
const swap = useSwapInfo();



LoadingBar.setDefaultOptions({
  errorColor: '#ff8800',
  color: '#10afef',
  height: '5px',
})

//节点列表
const nodeList = ref()

async function getPingSpeeds(list:any) {
  LoadingBar.start()
  nodeList.value = [];
  for (const node of list) {
    const ping = await pingTest(node.url);
    nodeList.value.push({
      address: node.address,
      url: node.url,
      ping: ping,
    });
  }
  LoadingBar.finish()
}
onMounted(()=>{
  getPingSpeeds(userInfo.nodeList);
})


//选择节点
const selectNode = (nodeItem:any) => {
  swap.etherInfo.selectedNodeUrl = nodeItem.url;
  Snackbar.success({
    content: "切换节点成功",
  })
}


const validationSchema = toTypedSchema(
    zod.object({
      nodeName: zod.string({message: t('node.inputAddress')}).min(1, {message: t('node.inputAddress')}),
      nodeUrl: zod.string({message: t('node.inputUrl')}).min(1, {message: t('node.inputUrl')}).refine(isValidDomain,{message:'链接地址错误'})
    })
);

function isValidDomain(domain:string) {
  // 先检查是否以 http:// 或 https:// 开头
  const protocolRegex = /^(https?:\/\/)/;
  if (!protocolRegex.test(domain)) {
    return false; // 不包含 http:// 或 https://
  }

  // 域名格式检查
  const domainRegex = /^(?!:\/\/)(?=.{1,255}$)(?![0-9]+$)(?!.*\.$)[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})*(?:\.[A-Za-z]{2,})$/;
  return domainRegex.test(domain.replace(protocolRegex, '')); // 去除协议部分进行域名验证
}

const formItemList = [
  {
    name: 'nodeName',
    placeholder: t('node.inputAddress'),
  },
  {
    name: 'nodeUrl',
    placeholder: t('node.inputUrl'),
    type:"textarea"
  }
]

const formInstance = ref<InstanceType<typeof ZForm>>();

// 添加
const addNode = () => {
  showCustomNode.value = true;
}

// 确定添加节点
const addNodeDefine = async (values: any) => {
  try {
    //添加节点的逻辑
    Snackbar.loading({
      content: t('public.loading'),
    })
    const ping = await pingTest(values.nodeUrl);
    if(ping == 0){
      throw new Error('获取节点失败')
    }
    const item = {
      address: values.nodeName,
      url: values.nodeUrl,
      ping
    }
    nodeList.value.push(item)
    Snackbar.success({
      content: t('node.success'),
      duration: 1000,
    })
    userInfo.nodeList.push(item)
    showCustomNode.value = false;
    clear()
  } catch (e) {
    Snackbar.error({
      content: t('node.failed'),
      duration: 1000,
    })
  }
}

const clear = ()=>{
  formInstance.value?.resetForm();
}


</script>

<style lang="scss" scoped>

.content {
  -ms-overflow-style: none; /* 隐藏滚动条 */
  scrollbar-width: none; /* 隐藏滚动条 */
}

textarea {
  resize: none;
}
</style>
