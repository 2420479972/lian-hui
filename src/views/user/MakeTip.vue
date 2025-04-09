<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 ">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-900 rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-white">创世中心</h3>
        <button class="text-gray-400">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="text-sm text-gray-300 mb-4">
        你当前权限不够，如需要参与请到社区了解更多详情
      </div>
      <button class="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-button">
        确定
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>

</style>
