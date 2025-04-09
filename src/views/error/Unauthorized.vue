<template>
  <div class="flex flex-col items-center justify-center h-screen bg-darkBlue text-white p-4 relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <div class="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-3xl"></div>
      <div class="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl"></div>
      <div class="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl"></div>
    </div>
    
    <!-- 主要内容 -->
    <div class="z-10 text-center flex flex-col items-center">
      <!-- 403数字和图标 -->
      <div class="relative mb-8">
        <div class="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
          403
        </div>
        <div class="absolute -bottom-6 left-0 right-0 text-xl font-medium text-gray-400">
          {{ $t('error.unauthorized') }}
        </div>
      </div>
      
      <!-- 锁图标装饰 -->
      <div class="relative w-20 h-20 mb-6 mt-4">
        <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-ping"></div>
        <div class="absolute inset-2 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
          <i class="fas fa-lock text-white text-2xl"></i>
        </div>
      </div>
      
      <!-- 分隔线 -->
      <div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full my-6"></div>
      
      <!-- 错误描述 -->
      <p class="text-gray-400 mb-10 text-center max-w-md leading-relaxed">
        {{ $t('error.unauthorizedDesc') }}
      </p>
      
      <!-- 按钮 -->
      <div class="flex flex-wrap justify-center gap-4">
        <router-link
          to="/login"
          class="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 transition transform hover:-translate-y-1"
        >
          <i class="fas fa-sign-in-alt mr-2"></i>
          {{ $t('auth.login') }}
        </router-link>
        
        <router-link
          to="/home"
          class="px-8 py-3 bg-gray-800 text-white rounded-full font-bold hover:bg-gray-700 transition transform hover:-translate-y-1"
        >
          <i class="fas fa-home mr-2"></i>
          {{ $t('error.backToHome') }}
        </router-link>
        
        <button 
          @click="goBack" 
          class="px-8 py-3 bg-gray-700 text-white rounded-full font-bold hover:bg-gray-600 transition transform hover:-translate-y-1"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          {{ $t('common.back') }}
        </button>
      </div>
      
      <!-- 额外提示 -->
      <div class="mt-10 text-sm text-gray-500">
        <p>{{ $t('error.reportIssue') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

// 返回上一页
const goBack = () => {
  router.back();
};

onMounted(() => {
  document.title = t('error.unauthorized');
});
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.4;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  70%, 100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.absolute {
  animation: pulse 6s ease-in-out infinite;
}

.absolute:nth-child(1) {
  animation-delay: 0s;
}

.absolute:nth-child(2) {
  animation-delay: 2s;
}

.absolute:nth-child(3) {
  animation-delay: 4s;
}
</style> 