import {createRouter, createWebHashHistory} from 'vue-router';
// 定义路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/layout/defaultLayout.vue'),
        redirect: '/hot-token',
        meta: {requiresAuth: true},
        children: [
            {
                path: '/hot-token',
                name: 'hot-token',
                component: () => import('@/views/hot-token/hot-token.vue'),
                meta: {title: "热门代币", requiresAuth: true},
            },
            {
                path: '/search-token',
                name: 'search-token',
                component: () => import('@/views/search-token/search-token.vue'),
                meta: {title: "代币搜索", requiresAuth: true},
            },
            {
                path: '/watch-robot',
                name: 'watch-robot',
                component: () => import('views/watch-robot/robot-content/watch-robot.vue'),
                meta: {title: "监听SWAP", requiresAuth: true},
            },
            {
                path: '/watch-setting',
                name: 'watch-setting',
                component: () => import('views/watch-robot/watch-setting/watch-setting.vue'),
                meta: {title: "设置", requiresAuth: true},
            },
            {
                path: '/watch-start',
                name: 'watch-start',
                component: () => import('views/watch-robot/watch-start/watch-start.vue'),
                meta: {title: "启动", requiresAuth: true},
            },
            {
                path: '/alliance',
                name: 'alliance',
                component: () => import('@/views/alliance/alliance.vue'),
                meta: {title: "联盟", requiresAuth: true},
            },
            {
                path: '/intro',
                name: 'intro',
                component: () => import('@/views/intro/intro.vue'),
                meta: {title: "简介", requiresAuth: true},
            },
            {
                path: '/node-cut',
                name: 'node-cut',
                component: () => import('@/views/node-cut/node-cut.vue'),
                meta: {title: "节点切换", requiresAuth: true},
            },
            {
                path: '/airdrop',
                name: 'airdrop',
                component: () => import('@/views/airdrop/airdrop.vue'),
                meta: {title: "空投", requiresAuth: true},
            },
            {
                path: '/member',
                name: 'member',
                component: () => import('@/views/member/member.vue'),
                meta: {title: "账户", requiresAuth: true},
            }
        ]
    },
    {
        path:'/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {title: "登录"},
    }
];

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;