<template>
  <div class="px-[23px] h-full overflow-y-auto">
    <var-collapse v-model="value" @change="handleChange" :accordion="true" :elevation="false">
      <var-collapse-item :name="index" v-for="(item,index) in introductionList" :key="item.label">
        <template #title>
          <div class="flex items-center space-x-[6px] py-[20px]">
            <div
                class="h-[28px] w-[28px] rounded-full leading-[28px] text-center bg-[#0F3636] text-[21px] text-[#1CE89F]">
              {{index+1}}
            </div>
            <div class="text-[21px]">{{item.label}}</div>
          </div>
        </template>
        <div class="bg-[#201C2A] p-[16px] rounded-[5px] text-[24px]">
          {{item.content}}
        </div>
      </var-collapse-item>
    </var-collapse>
  </div>

</template>

<script setup lang="ts">

const value = ref();

const handleChange = () => {

}


const introductionList = [
  {
    label: '什么是去中心化平台',
    content: '没有服务器，所有交易与连接交互都由智能合约触来完成，每次触在公链上都有记录可查可追源到单次事件的起始点，完全公开可查。'
  },
  {
    label: '怎么购买AI机器人?',
    content: 'AI机器人是基于人工智能和自然语言处理的基础设施，可以让您的应用快速拥有机器人功能，并让您的应用快速拥有机器人功能。'
  },
  {
    label: 'AI机器人可以带来什么好处?',
    content: 'AI机器人是基于人工智能和自然语言处理的基础设施，可以让您的应用快速拥有机器人功能，并让您的应用快速拥有机器人功能。'
  },
  {
    label: '参与AI机器人资产是否安全?',
    content: 'AI机器人是基于人工智能和自然语言处理的基础设施，可以让您的应用快速拥有机器人功能，并让您的应用快速拥有机器人功能。'
  },
  {
    label: 'AI机器人怎么产生推广收益?',
    content: 'AI机器人是基于人工智能和自然语言处理的基础设施，可以让您的应用快速拥有机器人功能，并让您的应用快速拥有机器人功能。'
  },
  {
    label: 'AI机器人平台的空投怎么玩?',
    content: 'AI机器人是基于人工智能和自然语言处理的基础设施，可以让您的应用快速拥有机器人功能，并让您的应用快速拥有机器人功能。'
  },
]

</script>

<style lang="scss" scoped>
:deep(.var-collapse-item){
  border-bottom: 3px solid #262131;
}
</style>
