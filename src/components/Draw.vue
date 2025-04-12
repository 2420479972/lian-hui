<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-sm z-50"
        @click="handleMaskClick"
      ></div>
    </Transition>
    <Transition name="drawer-slide">
      <div
        v-if="modelValue"
        class="fixed inset-x-0 bottom-0 z-50 flex flex-col w-full max-h-[90vh] bg-gray-900 rounded-lg border-t border-white/10 shadow-[0_-8px_32px_rgba(0,240,255,0.15)] rounded-t-2xl glass-effect"
      >
        <div class="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 class="text-lg font-medium text-white">{{ title }}</h3>
          <button
            class="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
            @click="handleClose"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="flex-1 p-5 overflow-y-auto -webkit-overflow-scrolling-touch">
          <slot></slot>
        </div>
        <div
          v-if="$slots.footer"
          class="px-5 py-4 border-t border-white/10 text-right"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  maskClosable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maskClosable: true
});

const emit = defineEmits(['update:modelValue', 'close']);

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose();
  }
};

// 禁止滚动
watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style lang="scss" scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateY(100%);
}
</style>
