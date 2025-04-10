<template>
    <main class="p-4">
      <section class="mb-6">
        <div class="h-48 rounded-lg overflow-hidden neon-border">
          <img src="https://ai-public.mastergo.com/ai/img_res/1a27f16bfa0988959db4e32f724c65f3.jpg"
               alt="社区中心"
               class="w-full h-full object-cover">
        </div>
      </section>
      <section class="space-y-6">
        <div class="w-full">
          <div class="space-y-4">
            <div class="relative">
              <i class="fas fa-users absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <input type="text" placeholder="输入社区名称" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
            </div>
            <div class="relative">
              <i class="fas fa-chart-pie absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <input type="text" placeholder="项目完成率 (例: 75%)" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
            </div>
            <div class="relative">
              <i class="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <input type="text" placeholder="创始人名字" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
            </div>
            <div class="relative">
              <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <input type="text" placeholder="社区详细地址" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
            </div>
            <div class="relative">
              <i class="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <input type="text" placeholder="社区链接" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
            </div>
            <div class="space-y-3">
              <div class="relative">
                <i class="fas fa-heading absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
                <input type="text" placeholder="社区简介标题" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
              </div>
              <div class="relative">
                <i class="fas fa-image absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
                <input type="text" placeholder="项目logo URL" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm">
              </div>
              <div class="relative">
                <i class="fas fa-align-left absolute left-3 top-3 text-primary"></i>
                <textarea placeholder="社区简介内容" class="w-full pl-10 pr-4 py-3 input-cyber rounded-button text-sm min-h-[100px]"></textarea>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4">
            <div class="text-primary text-lg">
              发布价格: <span class="text-secondary">$50</span>
            </div>
            <button class="cyber-gradient px-8 py-3 rounded-button text-white font-medium">
              确认发布
            </button>
          </div>
        </div>
      </section>
    </main>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.neon-border {
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}
.cyber-gradient {
  background: linear-gradient(45deg, #00F0FF, #FF3366);
}
.input-cyber {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.3);
}
.input-cyber:focus {
  border-color: #00F0FF;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
}
</style>
