import axios from 'axios';
import store from "@/store";
import router from 'vue-router';
import {MessageBox, Notification} from "element-ui";
import {getToken} from "@/utils/token";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 4000
});

service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['Authorization'] = getToken();
    }
    return config;
});

// 响应拦截器
service.interceptors.response.use(response => {
        const code = response.data.code;
        if (code < 200 || code > 300) {
            Notification.error({
                title: response.data.msg
            });
            return Promise.reject('error')
        } else {
            return response.data
        }
    }, error => {
        let code = 0;
        try {
            code = error.response.data.code
        } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
                Notification.error({
                    title: '网络请求超时',
                    duration: 2500
                });
                return Promise.reject(error)
            }
            if (error.toString().indexOf('Error: Network Error') !== -1) {
                Notification.error({
                    title: '网络请求错误',
                    duration: 2500
                });
                return Promise.reject(error)
            }
            if (error.toString().indexOf('INTERNAL_SERVER_ERROR') !== -1) {
                Notification.error({
                    title: '错误',
                    message: error.msg,
                    duration: 3000
                });
            }
        }
        if (code === 401) {
            MessageBox.confirm(
                '登录状态已过期，您可以继续留在该页面，或者重新登录',
                '系统提示',
                {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            })
        } else if (code === 403) {
            router.push({path: '/401'});
        } else {
            console.log(error);
            Notification.error({
                title: '错误',
                message: error.msg,
                duration: 3000
            });
        }
        return Promise.reject(error);
    }
);


export default service;
