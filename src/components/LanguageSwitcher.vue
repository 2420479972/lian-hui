<template>
  <div class="language-switcher">
    <button 
      @click="toggleLanguage" 
      class="flex items-center justify-center w-8 h-8 rounded-full text-primary hover:text-[#00F5FF] transition"
    >
      <i class="fas fa-language text-xl"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const toggleLanguage = () => {
  // 切换语言并保存到localStorage
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
  localStorage.setItem('language', locale.value);
};
</script> 