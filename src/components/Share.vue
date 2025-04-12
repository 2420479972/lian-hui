<template>
    <!-- 用户信息卡片 -->
    <div class="">
      <!-- 用户基本信息 -->
      <div class="flex items-start mb-4">
        <div class="mr-3">
          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <i class="fas fa-seedling text-white text-xl"></i>
          </div>
        </div>
        <div class="flex-1">
          <div class="text-base font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
            当前等级：种子会员
          </div>
          <div class="flex items-center text-sm text-gray-400">
            <i class="fas fa-users mr-1"></i>
            团队人数：15 个
          </div>
        </div>
      </div>

      <!-- 收益数据网格 -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="bg-gray-800 rounded-lg p-3 text-center">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-opacity-20 mb-2">
            <i class="fas fa-shopping-cart text-primary"></i>
          </div>
          <div class="text-xs text-gray-400">购买收益</div>
          <div class="text-sm font-medium text-white mt-1">2,458.65</div>
        </div>
        <div class="bg-gray-800 rounded-lg p-3 text-center">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-opacity-20 mb-2">
            <i class="fas fa-parachute-box text-primary"></i>
          </div>
          <div class="text-xs text-gray-400">空投收益</div>
          <div class="text-sm font-medium text-white mt-1">1,289.32</div>
        </div>
        <div class="bg-gray-800 rounded-lg p-3 text-center">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-opacity-20 mb-2">
            <i class="fas fa-chart-line text-primary"></i>
          </div>
          <div class="text-xs text-gray-400">其他收益</div>
          <div class="text-sm font-medium text-white mt-1">856.90</div>
        </div>
      </div>

      <!-- 地址信息 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
          <div class="text-sm text-gray-300 truncate flex-1">推广地址：https://mastergo.com/file/15595327721968</div>
          <button class="text-primary ml-2">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
          <div class="text-sm text-gray-300">上级地址：0x7a3...d4f</div>
          <button class="text-primary ml-2">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
          <div class="text-sm text-gray-300">下级地址：0x9b2...e5c</div>
          <button class="text-primary ml-2">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>

</style>
