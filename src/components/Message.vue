<template>
  <div
    :id="id"
    class="message glass-effect"
    :class="{
      'message-success': type === 'success',
      'message-error': type === 'error',
      'message-warning': type === 'warning',
      'message-info': type === 'info'
    }"
  >
    <div class="message-icon">
      <i
        class="text-white text-sm"
        :class="{
          'fas fa-check': type === 'success',
          'fas fa-times': type === 'error',
          'fas fa-exclamation': type === 'warning',
          'fas fa-info': type === 'info'
        }"
      ></i>
    </div>
    <div class="message-content">
      <p class="text-white font-medium">{{ content }}</p>
    </div>
    <button
      class="message-close"
      @click="handleClose"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface Props {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  content: string;
  duration?: number;
  onClose?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000
});

let timer: number | null = null;

const handleClose = () => {
  props.onClose?.();
};

onMounted(() => {
  if (props.duration > 0) {
    timer = window.setTimeout(() => {
      handleClose();
    }, props.duration);
  }
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  min-width: 280px;
  max-width: 360px;
  border-radius: 8px;
  background: rgba(26, 26, 29, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 240, 255, 0.15);
  animation: message-enter 0.3s ease-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 240, 255, 0.2);
  }
  
  &.message-leave {
    animation: message-leave 0.3s ease-in forwards;
  }
  
  &.message-success {
    border-color: rgba(0, 240, 255, 0.3);
    .message-icon {
      background: linear-gradient(135deg, rgba(0, 240, 255, 0.8), rgba(0, 240, 255, 0.4));
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
    }
  }
  
  &.message-error {
    border-color: rgba(255, 51, 102, 0.3);
    .message-icon {
      background: linear-gradient(135deg, rgba(255, 51, 102, 0.8), rgba(255, 51, 102, 0.4));
      box-shadow: 0 0 20px rgba(255, 51, 102, 0.3);
    }
  }
  
  &.message-warning {
    border-color: rgba(255, 165, 0, 0.3);
    .message-icon {
      background: linear-gradient(135deg, rgba(255, 165, 0, 0.8), rgba(255, 165, 0, 0.4));
      box-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
    }
  }
  
  &.message-info {
    border-color: rgba(0, 240, 255, 0.3);
    .message-icon {
      background: linear-gradient(135deg, rgba(0, 240, 255, 0.8), rgba(0, 240, 255, 0.4));
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
    }
  }
}

.message-icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
}

.message-content {
  flex: 1;
  margin-right: 12px;
  
  p {
    font-size: 16px;
    line-height: 1.5;
  }
}

.message-close {
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
}

@keyframes message-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes message-leave {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
