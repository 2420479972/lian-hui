<template>
  <div class="px-4 py-2 flex items-center" @click="showAnnouncement = true">
    <i class="fas fa-bullhorn text-neonPurple w-4 h-4 mr-2"></i>
    <div class="text-xs truncate">
      <span class="text-neonBlue">公告：</span>系统将于2023-08-20 02:00-04:00进行维护升级，期间可能无法领取空投
    </div>
  </div>
  <Modal title="公告" v-model="showAnnouncement">
    系统将于2023-08-20 02:00-04:00进行维护升级，期间可能无法领取空投
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";

const showAnnouncement = ref(false);
</script>

<style lang="scss" scoped>

</style>
