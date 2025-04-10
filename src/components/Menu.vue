<template>
  <Teleport to="body">
    <Transition name="menu-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        @click="closeMenu"
      >
        <Transition name="menu-slide">
          <div
            v-if="modelValue"
            class="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 p-4 flex flex-col h-full"
            @click.stop
          >
            <div class="flex justify-between items-center mb-4">
              <div class="font-['Pacifico'] text-xl text-white">logo</div>
              <button
                class="text-gray-400 hover:text-white transition"
                @click="closeMenu"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <router-link to="/user" @click="closeMenu" class="mb-4">
              <div class="flex items-center p-2 rounded-lg bg-gray-800">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-3"
                >
                  <i class="fas fa-user text-white"></i>
                </div>
                <div>
                  <div class="text-sm text-white">我的账户</div>
                  <div class="text-xs text-gray-400">0x7a...3d4f</div>
                </div>
              </div>
            </router-link>
            <div class="border-t border-gray-800 pt-4 overflow-y-auto flex-grow scrollbar-thin">
              <div class="space-y-1 pr-2">
                <router-link
                  v-for="item in menuItems"
                  :key="item.path"
                  :to="`/${item.path}`"
                  :class="[
                    'flex items-center space-x-2 mb-3 p-2 rounded-lg transition',
                    isActiveMenuItem(item.path) ? 'bg-gray-800 shadow-md' : 'hover:bg-gray-800'
                  ]"
                  @click="closeMenu"
                >
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                    :class="getMenuItemBgClass(item.path)"
                  >
                    <i
                      :class="getMenuItemIcon(item.path)"
                      class="text-white text-xs"
                    ></i>
                  </div>
                  <div class="text-sm" :class="isActiveMenuItem(item.path) ? 'text-primary font-medium' : 'text-white'">
                    {{ item.meta.title }}
                  </div>
                </router-link>
              </div>
            </div>
            <div class="border-t border-gray-800 pt-4 mt-2">
              <div
                class="flex items-center space-x-2 mb-3 p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                @click="toggleLanguage"
              >
                <div
                  class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                >
                  <i class="fas fa-language text-white text-xs"></i>
                </div>
                <div class="text-sm text-white">{{ currentLanguage }}</div>
              </div>
              <div
                class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                @click="logout"
              >
                <div
                  class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                >
                  <i class="fas fa-sign-out-alt text-white text-xs"></i>
                </div>
                <div class="text-sm text-white">断开链接</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

// 定义属性
interface Props {
  modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
});

// 定义事件
const emit = defineEmits(["update:modelValue", "close"]);

// 使用路由和国际化
const router = useRouter();
const route = useRoute();
const { locale } = useI18n();

// 获取当前路由路径（去除前导斜杠）
const currentPath = computed(() => {
  // 获取当前路由路径或当前路由name
   // 去除前导斜杠
  return route.path.substring(1);
});

// 判断菜单项是否为当前选中项
const isActiveMenuItem = (path: string) => {
  // 精确匹配路径
  if (path === currentPath.value) return true;
  
  // 匹配路径前缀（如果当前路径是子路由）
  if (currentPath.value.startsWith(path + '/')) return true;
  
  return false;
};

// 关闭菜单
const closeMenu = () => {
  emit("update:modelValue", false);
  emit("close");
};


// 计算当前语言显示文本
const currentLanguage = computed(() => {
  return locale.value === "zh" ? "中文" : "English";
});

// 切换语言
const toggleLanguage = () => {
  locale.value = locale.value === "zh" ? "en" : "zh";
  localStorage.setItem("language", locale.value);
};

// 登出
const logout = () => {
  console.log("Logout");
  router.push("/login");
  closeMenu();
};

const menu = [
  {
    path: "home",
    name: "home",
    component: () => import("../views/work-space/Index.vue"),
    meta: { title: "链汇方舟" },
  },
  {
    path: "cooperation",
    name: "cooperation",
    component: () => import("../views/cooperation/Index.vue"),
    meta: { title: "合作申请" },
  },
  {
    path: "community",
    name: "community",
    component: () => import("../views/community/Index.vue"),
    meta: { title: "社区申请" },
  },
  {
    path: "pledge",
    name: "pledge",
    component: () => import("../views/pledge/Index.vue"),
    meta: { title: "质押取现" },
  },
  {
    path: "asset",
    name: "asset",
    component: () => import("../views/asset-redemption/Index.vue"),
    meta: { title: "赎回空投" },
  },

  {
    path: "release-airdrop",
    name: "release-airdrop",
    component: () => import("../views/release-airdrop/Index.vue"),
    meta: { title: "创世中心" },
  },
  {
    path: "home1",
    name: "home2",
    component: () => import("../views/work-space/Index.vue"),
    meta: { title: "电报" },
  },

  {
    path: "pledge",
    name: "pledge",
    component: () => import("../views/pledge/Index.vue"),
    meta: { title: "推特" },
  },
];

// 菜单项数据
const menuItems = menu;

// 根据路径获取菜单项图标
const getMenuItemIcon = (path: string) => {
  const iconMap: Record<string, string> = {
    asset:"fas fa-parachute-box",
    pledge: "fas fa-coins",
    "poly-airdrop": "fas fa-gifts",
    "main-airdrop": "fas fa-parachute-box",
    community: "fas fa-users",
    cooperation: "fas fa-handshake",
    find: "fas fa-search",
    "release-airdrop": "fas fa-globe",
    user: "fas fa-user",
  };

  return iconMap[path] || "fas fa-link";
};

// 根据路径获取菜单项背景渐变
const getMenuItemBgClass = (path: string) => {
  const bgClassMap: Record<string, string> = {
    home: "bg-gradient-to-r from-blue-500 to-green-500",
    asset: "bg-gradient-to-r from-blue-500 to-green-500",
    pledge: "bg-gradient-to-r from-pink-500 to-purple-500",
    "poly-airdrop": "bg-gradient-to-r from-green-500 to-blue-500",
    "main-airdrop": "bg-gradient-to-r from-yellow-500 to-orange-500",
    community: "bg-gradient-to-r from-indigo-500 to-purple-500",
    cooperation: "bg-gradient-to-r from-red-500 to-pink-500",
    find: "bg-gradient-to-r from-cyan-500 to-blue-500",
    "release-airdrop": "bg-gradient-to-r from-orange-500 to-red-500",
    user: "bg-gradient-to-r from-primary to-secondary",
  };

  return bgClassMap[path] || "bg-gradient-to-r from-gray-500 to-gray-700";
};
</script>

<style lang="scss" scoped>
// 背景淡入淡出过渡
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

// 菜单滑入滑出过渡
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateX(-100%);
}

// 确保菜单项图标正确显示
.rounded-full {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 自定义滚动条样式
.scrollbar-thin {
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

// 小屏幕优化
@media (max-height: 600px) {
  .space-y-4 > div {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .mb-6 {
    margin-bottom: 0.75rem;
  }

  .pt-4 {
    padding-top: 0.75rem;
  }

  .mb-4 {
    margin-bottom: 0.75rem;
  }
}

// 删除这个可能导致图标问题的选中菜单项样式
/*.router-link-active {
  @apply bg-gray-800;
  
  // 内部文本颜色
  .text-white {
    @apply text-primary font-medium;
  }
}*/
</style>
