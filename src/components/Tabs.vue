<template>
  <div class="relative overflow-hidden px-4">
    <div class="flex overflow-x-auto scrollbar-hide py-3" id="title-slider" ref="tabsContainer">
      <div 
        v-for="(tab, index) in tabs" 
        :key="tab.path" 
        :ref="el => { if (tab.path === route.path) activeTabEls[index] = el }"
        class="flex-shrink-0 mx-2"
      >
        <router-link 
          :to="tab.path"
          class="block px-4 py-1 rounded-full font-bold text-sm transition"
          :class="[
            isActive(tab.path) 
              ? 'bg-gradient-to-r from-primary to-secondary text-white' 
              : 'bg-darkBlue text-gray-300 border border-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white'
          ]"
        >
          {{ $t(tab.i18n) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch, nextTick, onUpdated } from 'vue';

const route = useRoute();
const router = useRouter();
const tabsContainer = ref<HTMLElement | null>(null);
const activeTabEls = ref<HTMLElement[]>([]);

// 定义与路由对应的tabs
const tabs = [
  { path: '/home', i18n: 'tab.home' },
  { path: '/main-airdrop', i18n: 'tab.airdrop' },
  { path: '/poly-airdrop', i18n: 'tab.pledge' },
  { path: '/asset', i18n: 'asset.title' }
  // 如果将来添加更多路由，可以在这里添加对应的tab
];

// 判断当前tab是否激活
const isActive = (path: string) => {
  return route.path === path;
};

// 滚动到当前激活的tab
const scrollToActiveTab = () => {
  // 确保DOM已更新
  nextTick(() => {
    if (!tabsContainer.value) return;
    
    // 找到激活的tab元素
    const activeTab = activeTabEls.value.find(el => el);
    if (!activeTab) return;
    
    const container = tabsContainer.value;
    const tabRect = activeTab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // 检查tab是否在可视区域内
    const isVisible = 
      tabRect.left >= containerRect.left && 
      tabRect.right <= containerRect.right;
    
    if (!isVisible) {
      // 计算需要滚动的位置
      // 将tab滚动到中间位置，这样更容易看到
      const scrollLeft = 
        activeTab.offsetLeft - 
        (container.clientWidth / 2) + 
        (activeTab.offsetWidth / 2);
      
      // 滚动到该位置
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }
  });
};

// 在组件挂载后滚动到激活的tab
onMounted(() => {
  // 给一点时间让DOM完全渲染
  setTimeout(scrollToActiveTab, 100);
});

// 在组件更新后也滚动到激活的tab
onUpdated(() => {
  scrollToActiveTab();
});

// 监听路由变化
watch(
  () => route.path,
  () => {
    // 重置引用数组
    activeTabEls.value = [];
    // 在下一个tick滚动到激活tab
    setTimeout(scrollToActiveTab, 50);
  }
);

// 监听全局路由事件
router.afterEach(() => {
  setTimeout(scrollToActiveTab, 50);
});
</script>

<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
