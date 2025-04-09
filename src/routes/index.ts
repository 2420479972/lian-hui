import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Layout from '../layout/Index.vue';

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
                meta: { title: '资产赎回' }
            },
            {
                path: 'pledge',
                name: 'pledge',
                component: () => import('../views/pledge/Index.vue'),
                meta: { title: '资产质押' }
            },
            {
                path: 'poly-airdrop',
                name: 'poly-airdrop',
                component: () => import('../views/poly-airdrop/Index.vue'),
                meta: { title: '聚合空投' }
            },
            {
                path: 'main-airdrop',
                name: 'main-airdrop',
                component: () => import('../views/main-airdrop/Index.vue'),
                meta: { title: '链汇空投' }
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
                meta: { title: '发布空投' }
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../views/user/Index.vue'),
                meta: { title: '我的' }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/Index.vue'),
        meta: { title: "登录" }
    }
];


// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;