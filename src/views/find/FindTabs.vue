<template>
  <div class="flex space-x-2 mb-3">
    <button
        class="px-3 py-1 text-xs rounded-button bg-gradient-to-r from-primary to-secondary text-dark font-medium app-category-btn"
        data-category="trading">{{ t('cooperation.category.exchange') }}
    </button>
    <button class="px-3 py-1 text-xs rounded-button bg-darkLighter text-white font-medium app-category-btn"
            data-category="tools">{{ t('cooperation.category.tools') }}
    </button>
    <button class="px-3 py-1 text-xs rounded-button bg-darkLighter text-white font-medium app-category-btn"
            data-category="games">{{ t('cooperation.category.game') }}
    </button>
    <button class="px-3 py-1 text-xs rounded-button bg-darkLighter text-white font-medium app-category-btn"
            data-category="shops">{{ t('cooperation.category.store') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>

</style>
