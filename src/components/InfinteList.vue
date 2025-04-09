<template>
    <vue3ScrollSeamless
        class="scroll-wrap"
        :classOptions="classOptions"
        :dataList="list"
    >

    </vue3ScrollSeamless>
</template>

<script setup lang="ts">
const classOptions = {
  limitMoveNum: 6,
  step: 2
};
const list = Array.from({ length: 20 }, (_, i) => ({
  id: Date.now() + i + 1,
  title: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll-wrap {
  height:400px;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;
}
.ui-wrap {
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
.li-item {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
}
</style>
