<template>
<div class="w-full h-full flex flex-col">
    <Announcement></Announcement>
    <Tabs></Tabs>
  <div class="flex-1 overflow-x-hidden overflow-y-auto p-4">
    <slot></slot>
  </div>
</div>
</template>

<script setup lang="ts">


import Tabs from "@/components/Tabs.vue";
import Announcement from "@/components/Announcement.vue";
</script>

<style lang="scss" scoped>

</style>
