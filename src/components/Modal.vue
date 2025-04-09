<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="fixed inset-0 bg-black bg-opacity-80" aria-hidden="true" @click="closeModal"></div>
        <div class="bg-[#1A1A1A] rounded-lg p-6 flex flex-col relative z-10" 
             :class="[{'w-[85%]': !width, 'max-h-[500px]': !height},customClass]"
             :style="{width: width, height: height}">
          <div v-if="!hideHeader" class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium gradient-text">{{ title }}</h3>
            <button @click="closeModal" class="text-[#00F5FF] hover:text-pink-500 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto flex flex-col overflow-x-hidden">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  width?: string;
  height?: string;
  hideHeader?: boolean;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '标题',
  width: '',
  height: '',
  hideHeader: false,
  customClass: ''
});

const emit = defineEmits(['update:modelValue', 'close']);

const closeModal = () => {
  emit('update:modelValue', false);
  emit('close');
};

// 锁定背景滚动
const lockScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
};

// 解锁背景滚动
const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

// 监听modelValue变化以锁定/解锁背景滚动
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    lockScroll();
  } else {
    unlockScroll();
  }
});

// 确保在组件卸载前解锁滚动
onBeforeUnmount(() => {
  unlockScroll();
});

// 如果弹窗初始是打开的，立即锁定滚动
onMounted(() => {
  if (props.modelValue) {
    lockScroll();
  }
});
</script>

<style lang="scss" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
