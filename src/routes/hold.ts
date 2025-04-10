import { Router, RouteLocationNormalized } from 'vue-router';
import { LocalStorage } from '../utils/storage';

// 用户角色枚举
export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin'
}

// 路由访问配置接口
interface RouteAccess {
  path: string;       // 路由路径
  roles: UserRole[];  // 允许访问的角色
  redirect?: string;  // 未授权时重定向路径
}

// 获取当前用户角色
const getUserRole = (): UserRole => {
  const token = LocalStorage.getItem('token');
  const userInfo = LocalStorage.getItem('userInfo');

  if (!token) {
    return UserRole.GUEST;
  }

  try {
    // 如果有用户信息，从中获取角色
    if (userInfo) {
      const info = JSON.parse(userInfo);
      return info.role || UserRole.USER;
    }
  } catch (error) {
    console.error('解析用户信息失败:', error);
  }

  return UserRole.USER; // 默认已登录用户
};

// 需要权限控制的路由配置
const protectedRoutes: RouteAccess[] = [
  {
    path: '/user',
    roles: [UserRole.USER, UserRole.ADMIN],
    redirect: '/unauthorized'
  },
  {
    path: '/asset',
    roles: [UserRole.USER, UserRole.ADMIN],
    redirect: '/unauthorized'
  },
  {
    path: '/pledge',
    roles: [UserRole.USER, UserRole.ADMIN],
    redirect: '/unauthorized'
  },
  {
    path: '/poly-airdrop',
    roles: [UserRole.USER, UserRole.ADMIN],
    redirect: '/unauthorized'
  },
  {
    path: '/main-airdrop',
    roles: [UserRole.USER, UserRole.ADMIN],
    redirect: '/unauthorized'
  },
  {
    path: '/release-airdrop',
    roles: [UserRole.ADMIN], // 仅管理员可访问
    redirect: '/unauthorized'
  }
];

// 检查用户是否有权限访问特定路由
const hasPermission = (route: RouteLocationNormalized, userRole: UserRole): boolean => {
  // 获取当前路由路径
  const path = route.path;
  
  // 查找匹配的保护路由
  const matchedRoute = protectedRoutes.find(r => 
    path === r.path || path.startsWith(`${r.path}/`)
  );

  // 如果没有匹配的保护路由，则允许访问
  if (!matchedRoute) {
    return true;
  }

  // 检查用户角色是否在允许的角色列表中
  return matchedRoute.roles.includes(userRole);
};

// 获取重定向路径
const getRedirectPath = (route: RouteLocationNormalized): string => {
  const path = route.path;
  const matchedRoute = protectedRoutes.find(r => 
    path === r.path || path.startsWith(`${r.path}/`)
  );

  return matchedRoute?.redirect || '/login';
};

// 设置全局导航守卫
export const setupRouteGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    // 获取当前用户角色
    const userRole = getUserRole();
    
    // 如果目标路由是登录页且用户已登录，则重定向到首页
    if (to.path === '/login' && userRole !== UserRole.GUEST) {
      next('/home');
      return;
    }

    // 检查用户是否有权限访问目标路由
    if (hasPermission(to, userRole)) {
      next();
    } else {
      // 没有权限，重定向到指定路径
      next(getRedirectPath(to));
    }
  });

  // 路由错误处理
  router.onError((error) => {
    console.error('路由错误:', error);
  });
};

// 权限检查函数，可用于组件内部
export const checkAccess = (path: string): boolean => {
  const userRole = getUserRole();
  const matchedRoute = protectedRoutes.find(r => 
    path === r.path || path.startsWith(`${r.path}/`)
  );

  if (!matchedRoute) {
    return true;
  }

  return matchedRoute.roles.includes(userRole);
};

// 用于在组件中显示/隐藏元素的辅助函数
export const hasRole = (requiredRoles: UserRole[]): boolean => {
  const userRole = getUserRole();
  return requiredRoles.includes(userRole);
};
