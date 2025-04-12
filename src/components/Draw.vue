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
        class="fixed inset-x-0 top-0 z-50 flex flex-col w-full max-h-[90vh] bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,240,255,0.15)] rounded-b-2xl glass-effect"
      >
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
  maskClosable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
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
  transform: translateY(-100%);
}
</style>
