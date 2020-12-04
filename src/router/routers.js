import Vue from 'vue';
import VueRouter from "vue-router";


import Layout from '@/layout/index';

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
    },
    // {
    //     path: '/404',
    //     component: () => import('@/views/error/404'),
    //     hidden: true
    // },
    // {
    //     path: '/401',
    //     component: () => import('@/views/error/401'),
    //     hidden: true
    // },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/Index'),
                name: '首页',
                meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true}
            },
        ]
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noRedirect',
        children: [
            {
                path: 'profile',
                component: () => import('@/views/profile/index'),
                name: '个人中心',
                meta: {title: '个人中心', icon: 'user'}
            }
        ]
    }
];


export default new VueRouter({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
});
