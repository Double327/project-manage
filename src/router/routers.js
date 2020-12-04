import Vue from 'vue';
import VueRouter from "vue-router";


import Layout from '@/layout/index';

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: '',
        redirect: 'index',
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/views/Login/index'),
        hidden: true
    },
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
];


export default new VueRouter({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
});
