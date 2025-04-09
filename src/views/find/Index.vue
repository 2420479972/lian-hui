<template>
  <!-- 主内容区 -->
  <Main>
    <!-- 主标题 -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <i class="fas fa-users text-primary w-4 h-4"></i>
        <h1 class="text-lg font-bold gradient-text">联盟社区</h1>
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
              <img alt="社区Logo"
                   class="w-full h-full object-cover" src="https://ai-public.mastergo.com/ai/img_res/f45a2240c6748baa7ec73b6ab2c79e41.jpg">
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium mb-1 flex items-center">
                创富社区
                <span
                    id="successRate1"
                    class="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white"></span>
              </div>
              <div class="text-xs text-gray-400 mb-1 flex items-center">
                <i class="fas fa-user-shield mr-1 w-3 h-3 text-primary"></i>
                创始人: 中本聪
              </div>
              <div class="text-xs text-gray-400 mb-1 flex items-center">
                <i class="fas fa-map-marker-alt mr-1 w-3 h-3 text-primary"></i>
                香港中银国际中心
              </div>
              <div class="text-xs text-primary flex items-center">
                <i class="fas fa-users mr-1 w-3 h-3"></i>
                23,567人
              </div>
            </div>
          </div>
          <div class="text-xs text-gray-300 mb-3">
            <div class="font-medium mb-1">社区简介</div>
            <div class="line-clamp-3">
              我们是一群以发展为使命的创富先锋，聚焦"微博山"生态共建。通过深度挖掘微博价值，我们探索内容变现、流量转化、资源整合的创新路径，构建去中心化的协作网络...
            </div>
          </div>
          <button
              class="w-full bg-primary text-dark font-medium rounded-button py-2 text-sm flex items-center justify-center space-x-1">
            <span>申请加入</span>
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
          <h2 class="text-base font-bold gradient-text">联盟应用</h2>
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
                <img alt="应用Logo"
                     class="w-full h-full object-cover" src="https://ai-public.mastergo.com/ai/img_res/b45f51038ac037c429dd242ed487f2fe.jpg">
              </div>
              <div class="text-sm font-medium text-center mb-1">DEX聚合器</div>
              <div
                  class="text-xs text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                官方TG:HKM36988
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
                <span>领取赏金</span>
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
        <h2 class="text-lg font-bold gradient-text">联盟发现</h2>
      </div>
      <!-- 统计图表区 -->
      <div class="glass-effect rounded-xl p-4 mb-4 fault-effect">
        <h3 class="text-sm font-medium mb-3 neon-pink">Web3.0探索者</h3>
        <div class="w-full h-40">
          <LineCharts></LineCharts>
        </div>
      </div>
      <!-- 合作详情区 -->
      <div>
        <FindTabs></FindTabs>
        <div class="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          <!-- 交易类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="trading">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img alt="合作Logo"
                   class="w-full h-full object-cover" src="https://ai-public.mastergo.com/ai/img_res/5e821efa14dae8abf81850d1bb030246.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">数字交易所</div>
            <div class="text-xs text-gray-400 text-center mb-2">交易类</div>
            <div class="text-xs text-primary text-center py-1 px-2 bg-darkLighter rounded-full">申请中</div>
          </div>
          <!-- 工具类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="tools">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img alt="合作Logo"
                   class="w-full h-full object-cover" src="https://ai-public.mastergo.com/ai/img_res/01e3165f7e2701311c7b4a2c4d3d0a2f.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">区块浏览器</div>
            <div class="text-xs text-gray-400 text-center mb-2">工具类</div>
            <div class="text-xs text-primary text-center py-1 px-2 bg-darkLighter rounded-full">申请中</div>
          </div>
          <!-- 游戏类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="games">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img alt="合作Logo"
                   class="w-full h-full object-cover" src="https://ai-public.mastergo.com/ai/img_res/860e3a7be7ae69a392511b82e10ca310.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">元宇宙游戏</div>
            <div class="text-xs text-gray-400 text-center mb-2">游戏类</div>
            <div class="text-xs text-secondary text-center py-1 px-2 bg-darkLighter rounded-full">待审核</div>
          </div>
          <!-- 商城类卡片 -->
          <div class="flex-shrink-0 w-40 glass-effect rounded-xl p-3 fault-effect" data-category="shops">
            <div class="w-10 h-10 rounded-full overflow-hidden mb-2 mx-auto">
              <img alt="合作Logo"
                   class="w-full h-full object-cover" src="https://ai-public.mastergo.com/ai/img_res/bd281a7c5e5e2e4ecdc1f8c02621f2a5.jpg">
            </div>
            <div class="text-xs font-medium text-center mb-1">数字商城</div>
            <div class="text-xs text-gray-400 text-center mb-2">商城类</div>
            <div class="text-xs text-secondary text-center py-1 px-2 bg-darkLighter rounded-full">已完成</div>
          </div>
        </div>
      </div>
    </div>
  </Main>
  <Modal title="应用赏金猎人" v-model="showTip">
    <div class="text-sm text-gray-300 mb-4 space-y-2">
      <div>① 参与此应用连接并注册</div>
      <div>② 向应用官方申请奖金</div>
      <div>③ 具体时间详情咨询应用官方客服</div>
      <div class="text-xs text-secondary mt-3">④ 请谨慎参入，投资有风险，平台不会介入任何事件</div>
      <div class="text-xs text-center text-primary mt-2">————注意风险————</div>
    </div>
    <button class="w-full bg-gradient-to-r from-primary to-secondary text-dark font-medium rounded-button py-2 text-sm">
      我知道了
    </button>
  </Modal>
  <Modal title="发现社区" v-model="showSearch">
    <div class="flex items-center mb-4">
      <input type="text" placeholder="请输入名称" class="flex-1 bg-darkLighter text-white rounded-button py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
      <button class="ml-2 w-10 h-10 bg-primary rounded-button flex items-center justify-center">
        <i class="fas fa-search text-dark w-4 h-4"></i>
      </button>
    </div>
  </Modal>
</template>

<script lang="ts" setup>


import Main from "@/layout/Main.vue";
import FindTabs from "views/find/FindTabs.vue";
import LineCharts from "@/components/LineCharts.vue";
import Modal from "@/components/Modal.vue";

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
