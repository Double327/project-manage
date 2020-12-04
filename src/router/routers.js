import Vue from 'vue';
import VueRouter from "vue-router";


import Layout from '@/layout/index';

Vue.use(VueRouter);

export const routes = [
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
        component: () => Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/Index')
            }
        ]
    }
];


export default new VueRouter({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: routes
});
