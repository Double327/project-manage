import request from '@/utils/request';

export function login(info) {
    return request({
        url: '/login',
        method: 'post',
        params: info
    });
}

export function getCaptchaImg() {
    return request({
        url: '/captchaImage',
        method: 'get'
    });
}
