<template>
  <!-- 主内容区 -->
  <Main>
    <!-- 主标题 -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <i class="fas fa-users text-primary w-4 h-4"></i>
        <h1 class="text-lg font-bold gradient-text">{{ t('find.alliance_community') }}</h1>
      </div>
      <div class="flex space-x-2">
        <button class="w-8 h-8 bg-darkLighter rounded-full flex items-center justify-center" @click="showSearch = true">
          <i class="fas fa-search text-primary w-4 h-4"></i>
        </button>
        <button class="w-8 h-8 bg-darkLighter rounded-full flex items-center justify-center">
          <i class="fas fa-sliders-h text-primary w-4 h-4"></i>
        </button>
      </div>
    </div>
    <!-- 社区模块 -->
    <div class="mb-8">
      <div class="grid grid-cols-1 gap-4">
        <!-- 社区卡片1 -->
        <div class="glass-effect rounded-xl p-4 fault-effect">
          <div class="flex mb-3">
            <div class="w-16 h-16 rounded-lg overflow-hidden mr-3">
              <img :alt="t('find.community.logo')"
                   class="w-full h-full object-cover"
                   src="https://ai-public.mastergo.com/ai/img_res/f45a2240c6748baa7ec73b6ab2c79e41.jpg">
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium mb-1 flex items-center">
                {{ t('find.community.name') }}
                <span
                    id="successRate1"
                    class="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white"></span>
              </div>
              <div class="text-xs text-gray-400 mb-1 flex items-center">
                <i class="fas fa-user-shield mr-1 w-3 h-3 text-primary"></i>
                {{ t('find.community.founder') }}: 中本聪
              </div>
              <div class="text-xs text-gray-400 mb-1 flex items-center">
                <i class="fas fa-map-marker-alt mr-1 w-3 h-3 text-primary"></i>
                {{ t('find.community.location') }}: 香港中银国际中心
              </div>
              <div class="text-xs text-primary flex items-center">
                <i class="fas fa-users mr-1 w-3 h-3"></i>
                23,567{{ t('find.community.members') }}
              </div>
            </div>
          </div>
          <div class="text-xs text-gray-300 mb-3">
            <div class="font-medium mb-1">{{ t('find.community.intro') }}</div>
            <div class="line-clamp-3">
              我们是一群以发展为使命的创富先锋，聚焦"微博山"生态共建。通过深度挖掘微博价值，我们探索内容变现、流量转化、资源整合的创新路径，构建去中心化的协作网络...
            </div>
          </div>
          <button
              class="w-full bg-primary text-dark font-medium rounded-button py-2 text-sm flex items-center justify-center space-x-1">
            <span>{{ t('find.community.join') }}</span>
            <i class="fas fa-arrow-right w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- 应用模块 -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <i class="fas fa-rocket text-primary w-3 h-3"></i>
          <h2 class="text-base font-bold gradient-text">{{ t('find.alliance_apps') }}</h2>
        </div>
        <div class="flex items-center space-x-2">
          <button class="text-primary" @click="showTip = true">
            <i class="fas fa-bell w-4 h-4"></i>
          </button>
        </div>
      </div>
      <FindTabs></FindTabs>
      <div class="relative">
        <div class="flex space-x-3 overflow-x-auto scrollbar-hide pb-4">
          <!-- 应用卡片1 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="trading">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 rounded-full overflow-hidden mb-2">
                <img :alt="t('find.app.name')"
                     class="w-full h-full object-cover"
                     src="https://ai-public.mastergo.com/ai/img_res/b45f51038ac037c429dd242ed487f2fe.jpg">
              </div>
              <div class="text-sm font-medium text-center mb-1">{{ t('find.app.name') }}</div>
              <div
                  class="text-xs text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                {{ t('find.app.contact') }}
              </div>
              <div class="text-xs text-primary mb-2 flex items-center space-x-2">
                <span class="flex items-center">
                  <i class="fas fa-coins mr-1 w-3 h-3 text-secondary"></i>
                  $2.5
                </span>
                <span class="flex items-center">
                  <i class="fas fa-wallet mr-1 w-3 h-3 text-secondary"></i>
                  $50
                </span>
              </div>
              <button
                  class="w-full bg-secondary text-dark font-medium rounded-button py-1 text-xs flex items-center justify-center space-x-1">
                <span>{{ t('find.app.claim') }}</span>
                <i class="fas fa-external-link-alt w-3 h-3"></i>
              </button>
            </div>
            <div class="text-xs text-gray-400 mt-2 text-center"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 发现模块 -->
    <div>
      <div class="flex items-center space-x-2 mb-3">
        <i class="fas fa-compass text-secondary w-4 h-4"></i>
        <h2 class="text-lg font-bold gradient-text">{{ t('find.alliance_discover') }}</h2>
      </div>
      <!-- 统计图表区 -->
      <div class="glass-effect rounded-xl p-4 mb-8 fault-effect">
        <h3 class="text-sm font-medium mb-3 neon-pink">{{ t('find.explorer') }}</h3>
        <div class="w-full h-40">
          <LineCharts></LineCharts>
        </div>
      </div>
      <!-- 合作详情区 -->
      <div class="mt-4">
        <FindTabs></FindTabs>
        <div class="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          <!-- 交易类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="trading">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img :alt="t('find.cooperation.name')"
                   class="w-full h-full object-cover"
                   src="https://ai-public.mastergo.com/ai/img_res/5e821efa14dae8abf81850d1bb030246.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">{{ t('find.cooperation.name') }}</div>
            <div class="text-xs text-gray-400 text-center mb-2">{{ t('find.cooperation.category_text') }}</div>
            <div class="text-xs text-primary text-center py-1 px-2 bg-darkLighter rounded-full">{{ t('find.cooperation.status.applying') }}</div>
          </div>
          <!-- 工具类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="tools">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img :alt="t('find.cooperation.name')"
                   class="w-full h-full object-cover"
                   src="https://ai-public.mastergo.com/ai/img_res/01e3165f7e2701311c7b4a2c4d3d0a2f.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">{{ t('find.cooperation.name') }}</div>
            <div class="text-xs text-gray-400 text-center mb-2">{{ t('find.cooperation.category_text') }}</div>
            <div class="text-xs text-primary text-center py-1 px-2 bg-darkLighter rounded-full">{{ t('find.cooperation.status.applying') }}</div>
          </div>
          <!-- 游戏类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="games">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img :alt="t('find.cooperation.name')"
                   class="w-full h-full object-cover"
                   src="https://ai-public.mastergo.com/ai/img_res/860e3a7be7ae69a392511b82e10ca310.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">{{ t('find.cooperation.name') }}</div>
            <div class="text-xs text-gray-400 text-center mb-2">{{ t('find.cooperation.category_text') }}</div>
            <div class="text-xs text-secondary text-center py-1 px-2 bg-darkLighter rounded-full">{{ t('find.cooperation.status.pending') }}</div>
          </div>
          <!-- 商城类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="shops">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img :alt="t('find.cooperation.name')"
                   class="w-full h-full object-cover"
                   src="https://ai-public.mastergo.com/ai/img_res/bd281a7c5e5e2e4ecdc1f8c02621f2a5.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">{{ t('find.cooperation.name') }}</div>
            <div class="text-xs text-gray-400 text-center mb-2">{{ t('find.cooperation.category_text') }}</div>
            <div class="text-xs text-secondary text-center py-1 px-2 bg-darkLighter rounded-full">{{ t('find.cooperation.status.completed') }}</div>
          </div>
        </div>
      </div>
    </div>
  </Main>
  <Modal v-model="showTip" :title="t('find.bounty_hunter.title')">
    <div class="text-sm text-gray-300 mb-4 space-y-2">
      <div>{{ t('find.bounty_hunter.steps.step1') }}</div>
      <div>{{ t('find.bounty_hunter.steps.step2') }}</div>
      <div>{{ t('find.bounty_hunter.steps.step3') }}</div>
      <div class="text-xs text-secondary mt-3">{{ t('find.bounty_hunter.steps.step4') }}</div>
      <div class="text-xs text-center text-primary mt-2">{{ t('find.bounty_hunter.steps.note') }}</div>
    </div>
    <button class="w-full bg-gradient-to-r from-primary to-secondary text-dark font-medium rounded-button py-2 text-sm">
      {{ t('find.bounty_hunter.got_it') }}
    </button>
  </Modal>
  <Modal v-model="showSearch" :title="t('find.search_community.title')">
    <div class="flex items-center mb-4">
      <input class="flex-1 bg-darkLighter text-white rounded-button py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
             :placeholder="t('find.search_community.placeholder')"
             type="text">
      <button class="ml-2 w-10 h-10 bg-primary rounded-button flex items-center justify-center">
        <i class="fas fa-search text-dark w-4 h-4"></i>
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Main from "@/layout/Main.vue";
import FindTabs from "views/find/FindTabs.vue";
import LineCharts from "@/components/LineCharts.vue";
import Modal from "@/components/Modal.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const showTip = ref(false);
const showSearch = ref(false);
</script>

<style lang="scss" scoped>
.glass-effect {
  background: rgba(30, 30, 32, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.neon-text {
  text-shadow: 0 0 5px #00F0FF, 0 0 10px #00F0FF;
}

.neon-pink {
  text-shadow: 0 0 5px #FF3366, 0 0 10px #FF3366;
}

.gradient-text {
  background: linear-gradient(90deg, #00F0FF, #FF3366);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.fault-effect {
  position: relative;
  overflow: hidden;
}

.fault-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
          to right,
          transparent,
          transparent 20%,
          rgba(0, 240, 255, 0.1) 20%,
          rgba(0, 240, 255, 0.1) 40%,
          transparent 40%,
          transparent 60%,
          rgba(255, 51, 102, 0.1) 60%,
          rgba(255, 51, 102, 0.1) 80%,
          transparent 80%,
          transparent
  );
  pointer-events: none;
  animation: fault 3s infinite;
}

@keyframes fault {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

i {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
