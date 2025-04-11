<template>
  <div class="tabs-wrapper relative">
    <div class="flex space-x-3 overflow-x-auto scrollbar-hide py-3" id="title-slider" ref="tabsContainer">
      <div 
        v-for="(tab, index) in tabs" 
        :key="tab.path" 
        class="flex-shrink-0"
      >
        <router-link 
          :to="tab.path"
          class="block px-4 py-1.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap"
          :class="[
            isActive(tab.path) 
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
              : 'bg-darkBlue text-gray-300 border border-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white'
          ]"
          @click="handleTabClick(tab, index)"
        >
          {{ $t(tab.i18n) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

interface Tab {
  path: string;
  i18n: string;
  disabled?: boolean;
}

const route = useRoute();
const tabsContainer = ref<HTMLElement | null>(null);
const isUserScrolling = ref(false);
const scrollTimeout = ref<number | null>(null);

// 定义与路由对应的tabs
const tabs: Tab[] = [
  { path: '/home', i18n: 'tab.home' },
  { path: '/main-airdrop', i18n: 'tab.airdrop' },
  { path: '/poly-airdrop', i18n: 'tab.pledge' },
  { path: '/asset', i18n: 'asset.title' },
  { path: '/find', i18n: 'asset.find' }
];

// 判断当前tab是否激活
const isActive = (path: string) => {
  return route.path === path;
};

// 处理标签点击
const handleTabClick = (tab: Tab, index: number) => {
  if (tab.disabled) return;
  
  // 触发自定义事件
  emit('tab-click', { tab, index });
  
  // 滚动到可见区域
  nextTick(() => {
    scrollToTab(index);
  });
};

// 处理滚动事件
const handleScroll = () => {
  if (!tabsContainer.value) return;
  
  isUserScrolling.value = true;
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  
  scrollTimeout.value = window.setTimeout(() => {
    isUserScrolling.value = false;
  }, 150);
};

// 滚动到指定标签
const scrollToTab = (index: number) => {
  if (!tabsContainer.value || isUserScrolling.value) return;
  
  const tabElements = tabsContainer.value.querySelectorAll('.flex-shrink-0');
  const targetTab = tabElements[index];
  
  if (targetTab) {
    const containerWidth = tabsContainer.value.offsetWidth;
    const tabLeft = targetTab.getBoundingClientRect().left;
    const containerLeft = tabsContainer.value.getBoundingClientRect().left;
    const scrollLeft = tabsContainer.value.scrollLeft;
    
    const targetScroll = scrollLeft + (tabLeft - containerLeft) - (containerWidth / 2) + (targetTab.offsetWidth / 2);
    
    const isTabVisible = tabLeft >= containerLeft && tabLeft <= (containerLeft + containerWidth);
    if (!isTabVisible) {
      tabsContainer.value.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }
};

// 监听路由变化
watch(() => route.path, () => {
  const index = tabs.findIndex(tab => tab.path === route.path);
  if (index !== -1) {
    nextTick(() => {
      scrollToTab(index);
    });
  }
});

// 组件挂载后初始化
onMounted(() => {
  if (tabsContainer.value) {
    tabsContainer.value.addEventListener('scroll', handleScroll);
    // 初始化滚动位置
    const index = tabs.findIndex(tab => tab.path === route.path);
    if (index !== -1) {
      scrollToTab(index);
    }
  }
});

// 组件卸载时清理
onUnmounted(() => {
  if (tabsContainer.value) {
    tabsContainer.value.removeEventListener('scroll', handleScroll);
  }
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
});

// 定义事件
const emit = defineEmits<{
  (e: 'tab-click', payload: { tab: Tab; index: number }): void
}>();
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background: linear-gradient(to right, transparent, var(--color-bg));
    pointer-events: none;
    z-index: 1;
  }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

#title-slider {
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  
  > div {
    scroll-snap-align: center;
  }
}
</style>
