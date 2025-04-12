<template>
  <div class="min-h-screen bg-darkBlue text-white relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="fixed inset-0 overflow-hidden opacity-5">
      <div class="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl"></div>
      <div class="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl"></div>
      <div class="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 blur-3xl"></div>
    </div>
    
    <!-- 语言切换按钮 -->
    <div class="absolute top-4 right-4 z-20">
      <LanguageSwitcher />
    </div>
    
    <!-- 主要内容容器 -->
    <div class="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div class="w-full max-w-sm relative z-10">
        <!-- 标题区域 -->
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-lg mb-2">
            {{ $t('login.title') }}
          </h1>
          <p class="text-base md:text-lg text-gray-400">
            {{ $t('login.subtitle') }}
          </p>
        </div>
        
        <!-- 分隔线 -->
        <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-8"></div>
        
        <!-- 未连接钱包状态 -->
        <div v-if="!isConnected" class="space-y-4">
          <button class="w-full glass-effect p-4 rounded-lg flex items-center space-x-3 hover:bg-opacity-80 transition-all duration-300 group" @click="connect({ connector: connectors[0] })">
            <div class="w-8 h-8 min-w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
              <i class="fab fa-ethereum text-white text-lg"></i>
            </div>
            <span class="text-base font-medium">{{ $t('login.metamask') }}</span>
          </button>
          
          <button class="w-full glass-effect p-4 rounded-lg flex items-center space-x-3 hover:bg-opacity-80 transition-all duration-300 group">
            <div class="w-8 h-8 min-w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
              <i class="fas fa-wallet text-white text-lg"></i>
            </div>
            <span class="text-base font-medium">{{ $t('login.walletconnect') }}</span>
          </button>
          
          <button class="w-full glass-effect p-4 rounded-lg flex items-center space-x-3 hover:bg-opacity-80 transition-all duration-300 group">
            <div class="w-8 h-8 min-w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
              <i class="fas fa-coins text-white text-lg"></i>
            </div>
            <span class="text-base font-medium">{{ $t('login.coinbase') }}</span>
          </button>
        </div>

        <!-- 已连接钱包状态 -->
        <div v-else class="space-y-4">
          <!-- 未注册且无邀请码 -->
          <div v-if="!isRegistered && !inviteCode" class="text-center">
            <p class="text-gray-400 mb-4">{{ $t('login.needInviteCode') }}</p>
            <div class="glass-effect p-4 rounded-lg">
              <input 
                v-model="inputInviteCode"
                type="text" 
                class="w-full bg-transparent border-b border-gray-600 focus:border-primary outline-none text-white text-center py-2 tracking-widest"
                :placeholder="$t('login.enterInviteCode')"
                @input="handleInput"
                @paste="handlePaste"
                maxlength="20"
                :disabled="hasUrlInviteCode"
              />
            </div>
          </div>

          <!-- 有邀请码但无效 -->
          <div v-else-if="!isRegistered && inviteCode && !isValidInviteCode" class="text-center">
            <p class="text-gray-400 mb-4">{{ $t('login.invalidInviteCode') }}</p>
            <div class="glass-effect p-4 rounded-lg">
              <input 
                v-model="inputInviteCode"
                type="text" 
                class="w-full bg-transparent border-b border-gray-600 focus:border-primary outline-none text-white text-center py-2 tracking-widest"
                :placeholder="$t('login.enterInviteCode')"
                @input="handleInput"
                @paste="handlePaste"
                maxlength="20"
                :disabled="hasUrlInviteCode"
              />
            </div>
          </div>

          <!-- 有有效邀请码 -->
          <div v-else-if="!isRegistered && inviteCode && isValidInviteCode" class="text-center">
            <p class="text-primary mb-4">{{ $t('login.validInviteCode') }}</p>
            <button 
              class="w-full glass-effect p-4 rounded-lg text-white hover:bg-opacity-80 transition-all duration-300"
              @click="handleRegister"
            >
              {{ $t('login.registerNow') }}
            </button>
          </div>

          <!-- 已注册 -->
          <div v-else class="text-center">
            <div class="glass-effect p-4 rounded-lg">
              <p class="text-primary mb-4">{{ $t('login.alreadyRegistered') }}</p>
              <button 
                class="w-full glass-effect p-4 rounded-lg text-white hover:bg-opacity-80 transition-all duration-300"
                @click="goToHome"
              >
                {{ $t('login.goToHome') }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- 底部提示 -->
        <p class="text-gray-400 mt-6 text-xs text-center">
          {{ $t('login.terms') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAccount, useConnect} from '@wagmi/vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const router = useRouter();
const route = useRoute();
const { connect, connectors } = useConnect();
const { isConnected, address } = useAccount();

// 状态管理
const isRegistered = ref(false);
const inviteCode = ref('');
const isValidInviteCode = ref(false);
const inputInviteCode = ref('');
const hasUrlInviteCode = ref(false);
let debounceTimer: number | null = null;

// 从URL获取邀请码
const getInviteCodeFromUrl = () => {
  const code = route.query.code as string;
  if (code) {
    // 清理邀请码，只保留英文和数字，并转换为大写
    const cleanCode = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    inputInviteCode.value = cleanCode;
    inviteCode.value = cleanCode;
    hasUrlInviteCode.value = true;
    // 自动验证邀请码
    validateInviteCode(cleanCode);
  }
};

// 处理输入
const handleInput = (event: Event) => {
  if (hasUrlInviteCode.value) return;
  
  const input = event.target as HTMLInputElement;
  // 只允许英文和数字
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  // 转换为大写
  input.value = input.value.toUpperCase();
  inputInviteCode.value = input.value;
};

// 处理粘贴
const handlePaste = (event: ClipboardEvent) => {
  if (hasUrlInviteCode.value) {
    event.preventDefault();
    return;
  }
  
  event.preventDefault();
  const pastedText = event.clipboardData?.getData('text') || '';
  // 只保留英文和数字，并转换为大写
  inputInviteCode.value = pastedText.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
};

// 模拟状态切换
const simulateState = () => {
  // 模拟已注册状态
  if (inputInviteCode.value === 'REGISTERED') {
    isRegistered.value = true;
    return;
  }
  
  // 模拟有效邀请码
  if (inputInviteCode.value === 'VALID') {
    isValidInviteCode.value = true;
    return;
  }
  
  // 模拟无效邀请码
  isValidInviteCode.value = false;
};

// 检查用户是否已注册
const checkUserRegistration = async () => {
  if (!address.value) return;
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 500));
  isRegistered.value = inputInviteCode.value === 'REGISTERED';
  
  // 如果已注册，跳转到首页
  if (isRegistered.value) {
    await router.push('/home');
  }
};

// 验证邀请码
const validateInviteCode = async (code: string) => {
  if (!code) return;
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 500));
  simulateState();
};

// 处理注册
const handleRegister = async () => {
  if (!address.value || !inviteCode.value) return;
  // 模拟注册API调用
  isRegistered.value = true;
  await new Promise(resolve => setTimeout(resolve, 5000));
  await router.push('/home');
};

// 跳转到首页
const goToHome = () => {
  router.push('/home');
};

// 监听邀请码输入
watch(inputInviteCode, (newCode) => {
  // 清除之前的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  // 设置新的定时器，1秒后执行验证
  debounceTimer = window.setTimeout(() => {
    inviteCode.value = newCode;
    if (newCode) {
      validateInviteCode(newCode);
    }
  }, 1000);
});

// 监听钱包连接状态
watch(isConnected, (newValue) => {
  if (newValue) {
    checkUserRegistration();
  }
});

// 组件挂载时获取URL中的邀请码
onMounted(() => {
  getInviteCodeFromUrl();
});

// 监听路由变化
watch(() => route.query.code, (newCode) => {
  if (newCode) {
    getInviteCodeFromUrl();
  }
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<style lang="scss" scoped>
.glass-effect {
  background: rgba(26, 26, 29, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.1);
}

.glass-effect:hover {
  border-color: rgba(0, 240, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.2);
  transform: translateY(-2px);
}

input {
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    &::placeholder {
      color: rgba(0, 240, 255, 0.5);
    }
  }
  
  // 添加字母间距
  letter-spacing: 0.1em;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
