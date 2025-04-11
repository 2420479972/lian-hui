<template>
  <main class="p-4">
    <div class="rounded-lg overflow-hidden mb-6 relative">
      <img src="https://ai-public.mastergo.com/ai/img_res/39b73e8b230b03ec7209e8f6dcb71035.jpg"
           class="w-full h-[200px] object-cover" :alt="t('cooperation.banner_title')">
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h1 class="text-2xl font-bold mb-2">{{ t('cooperation.banner_title') }}</h1>
        <p class="text-sm text-gray-200">{{ t('cooperation.banner_desc') }}</p>
      </div>
    </div>
    <div class="w-full">
      <div class="flex items-center gap-2 mb-6">
        <i class="fas fa-rocket text-primary"></i>
        <h2 class="text-xl font-bold gradient-text">{{ t('cooperation.apply_cooperation') }}</h2>
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3 mb-4">
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="exchange">
            <i class="fas fa-exchange-alt text-gray-400"></i>
            <span>{{ t('cooperation.category.exchange') }}</span>
          </button>
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="tools">
            <i class="fas fa-tools text-gray-400"></i>
            <span>{{ t('cooperation.category.tools') }}</span>
          </button>
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="game">
            <i class="fas fa-gamepad text-gray-400"></i>
            <span>{{ t('cooperation.category.game') }}</span>
          </button>
          <button class="neon-input rounded p-3 text-center flex items-center justify-center gap-2 category-btn" data-category="store">
            <i class="fas fa-store text-gray-400"></i>
            <span>{{ t('cooperation.category.store') }}</span>
          </button>
        </div>
        <div class="space-y-4">
          <div class="relative">
            <input type="text" :placeholder="t('cooperation.app_name')" class="neon-input w-full rounded p-3 pl-10">
            <i class="fas fa-cube absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" :placeholder="t('cooperation.contact')" class="neon-input w-full rounded p-3 pl-10">
            <i class="fab fa-telegram absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" :placeholder="t('cooperation.register_url')" class="neon-input w-full rounded p-3 pl-10">
            <i class="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" :placeholder="t('cooperation.connect_url')" class="neon-input w-full rounded p-3 pl-10">
            <i class="fas fa-globe absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
          </div>
          <div class="relative">
            <input type="text" :placeholder="t('cooperation.bounty')" class="neon-input w-full rounded p-3 pl-10 pr-10">
            <i class="fas fa-coins absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-primary" @click="showModal = true">
              <i class="fas fa-calculator"></i>
            </button>
          </div>
          <div class="relative">
            <input type="file" class="hidden" id="logo-upload">
            <label for="logo-upload" class="neon-input w-full rounded p-3 pl-10 block cursor-pointer">
              <i class="fas fa-image absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <span class="text-gray-400">{{ t('cooperation.logo') }}</span>
            </label>
          </div>
          <div class="flex justify-between items-center neon-input rounded p-3">
            <span>{{ t('cooperation.cooperation_fee') }}</span>
            <span class="text-primary font-bold">$12.00</span>
          </div>
          <div class="mt-4 neon-input rounded p-4 cursor-pointer" @click="showTip = !showTip">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <i class="fas fa-exclamation-circle text-primary"></i>
                <span class="text-sm">{{ t('cooperation.notice_title') }}</span>
              </div>
              <i class="fas fa-chevron-down text-primary transition-transform duration-200" id="notice-icon"></i>
            </div>
            <div class="mt-3" v-show="showTip">
              <ul class="list-disc pl-5 space-y-1 text-xs text-gray-300">
                <li>{{ t('cooperation.notice_items.item1') }}</li>
                <li>{{ t('cooperation.notice_items.item2') }}</li>
                <li>{{ t('cooperation.notice_items.item3') }}</li>
                <li>{{ t('cooperation.notice_items.item4') }}</li>
                <li>{{ t('cooperation.notice_items.item5') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="w-full mt-6 py-4 rounded-button bg-gradient-to-r from-primary via-secondary to-primary text-white font-bold animate-gradient-x">
        {{ t('cooperation.submit') }}
      </button>
    </div>
  </main>
  <Modal :title="t('cooperation.bounty_hunter')" v-model="showModal">
    <div class="space-y-4">
      <div class="relative">
        <input type="number" :placeholder="t('cooperation.address_count')" class="neon-input w-full rounded p-3" id="address-count">
      </div>
      <div class="relative">
        <input type="number" :placeholder="t('cooperation.single_bounty')" class="neon-input w-full rounded p-3" id="single-bounty">
      </div>
      <button id="calculate-bounty" class="w-full py-3 rounded-button bg-gradient-to-r from-primary via-secondary to-primary text-white font-bold">
        {{ t('cooperation.calculate') }}
      </button>
      <p class="text-xs text-gray-400 text-center">{{ t('cooperation.bounty_note') }}</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const showTip = ref(false);
const showModal = ref(false);
</script>

<style lang="scss" scoped>
.neon-card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}
.neon-input {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 229, 255, 0.3);
  color: white;
}
.gradient-text {
  background: linear-gradient(90deg, #00E5FF, #FF1493);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
