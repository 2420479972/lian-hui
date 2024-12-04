<template>
  <div class="w-full py-[9px] flex gap-[15px]">
    <var-tabs v-model:active="active">
      <var-tab v-for="item in tabList" :key="item.label">
        <div class="flex items-center gap-[8px]" @click="checkTab(item.key)">
          <img :src="item.key == nowSelectedTab ? item.selected :item.icon" alt="">
          <div class="text-[21px]" :style="{color:item.key == nowSelectedTab ? '#fff' : '#6E6B76'}">{{
              item.label
            }}
          </div>
        </div>
      </var-tab>
    </var-tabs>
  </div>
</template>

<script setup lang="ts">
import BSC from "assets/images/hot-token/BSC.png";
import BSCED from "assets/images/hot-token/selected-BSC.png";
import ETH from "assets/images/hot-token/ETH.png";
import ETHED from "assets/images/hot-token/selected-ETH.png";
import {checkTab, nowSelectedTab} from "views/watch-robot/comment/index.ts";

const active =ref(0);

const tabList = [
  {
    label: 'BSC',
    icon: BSC,
    selected: BSCED,
    key: 'BSC'
  },
  {
    label: 'ETH',
    icon: ETH,
    selected: ETHED,
    key: 'ETH'
  },
]




</script>

<style lang="scss" scoped>

</style>
