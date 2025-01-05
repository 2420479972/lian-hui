<template>
  <div class="w-full py-[9px] flex gap-[15px]">
    <var-tabs v-model:active="active">
      <var-tab v-for="item in tabList" :key="item.label">
        <div class="flex items-center gap-[8px]" @click="checkTab(item.key)">
          <img :src="item.key == nowSelectedTab ? item.selected :item.icon" alt=""  class="h-[35px]">
          <div class="text-[24px]" :style="{color:item.key == nowSelectedTab ? 'var(--tab-color-text-selected)' : 'var(--tab-color-text)'}">{{
              item.label
            }}
          </div>
        </div>
      </var-tab>
    </var-tabs>
  </div>
</template>

<script setup lang="ts">
import {checkTab, nowSelectedTab} from "views/watch-robot/comment/index.ts";
import {getResource} from "utils/getFile.ts";
import {ThemeManager} from "store/theme.ts";

const active =ref(0);
const Theme = ThemeManager()
const tabList = ref([
  {
    label: 'BSC',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "BSC.png") : getResource('hot-token/dark/', "BSC.png")
    }),
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "selected-BSC.png") : getResource('hot-token/dark/', "selected-BSC.png")
    }),
    key: 'BSC'
  },
  {
    label: 'ETH',
    icon: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "ETH.png") : getResource('hot-token/dark/', "ETH.png")
    }),
    selected: computed(()=>{
      return Theme.theme == "lightTheme" ? getResource('hot-token/light/', "selected-ETH.png") : getResource('hot-token/dark/', "selected-ETH.png")
    }),
    key: 'ETH'
  },
])




</script>

<style lang="scss" scoped>

</style>
