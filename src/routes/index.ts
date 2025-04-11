import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Layout from '../layout/Index.vue';
import { setupRouteGuard } from './hold';

// 定义路由
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/work-space/Index.vue'),
                meta: { title: '链汇方舟' }
            },
            {
                path: 'asset',
                name: 'asset',
                component: () => import('../views/asset-redemption/Index.vue'),
                meta: { title: '资产赎回', requireAuth: true }
            },
            {
                path: 'pledge',
                name: 'pledge',
                component: () => import('../views/pledge/Index.vue'),
                meta: { title: '资产质押', requireAuth: true }
            },
            {
                path: 'poly-airdrop',
                name: 'poly-airdrop',
                component: () => import('../views/poly-airdrop/Index.vue'),
                meta: { title: '聚合空投', requireAuth: true }
            },
            {
                path: 'main-airdrop',
                name: 'main-airdrop',
                component: () => import('../views/main-airdrop/Index.vue'),
                meta: { title: '链汇空投', requireAuth: true }
            },
            {
                path: 'community',
                name: 'community',
                component: () => import('../views/community/Index.vue'),
                meta: { title: '社区申请' }
            },
            {
                path: 'cooperation',
                name: 'cooperation',
                component: () => import('../views/cooperation/Index.vue'),
                meta: { title: '合作申请' }
            },
            {
                path: 'find',
                name: 'find',
                component: () => import('../views/find/Index.vue'),
                meta: { title: '发现' }
            },
            {
                path: 'release-airdrop',
                name: 'release-airdrop',
                component: () => import('../views/release-airdrop/Index.vue'),
                meta: { title: '发布空投', requireAuth: true, adminOnly: true }
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../views/user/Index.vue'),
                meta: { title: '我的', requireAuth: true }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Index.vue'),
        meta: { title: "登录" }
    },
    // 404 路由
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/error/404.vue'),
        meta: { title: '页面不存在' }
    },
    // 未授权路由
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('../views/error/Unauthorized.vue'),
        meta: { title: '无权限访问' }
    }
];


// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 设置路由拦截器
// setupRouteGuard(router);

export default router;