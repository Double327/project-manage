import request from '@/utils/request';

export function getUserProfile() {
    return request({
        url: '/system/user/profile',
        method: 'get'
    })
}

export function updateProfile(info) {
    return request({
        url: '/system/user/profile',
        method: 'put',
        data: info
    })
}

export function resetPassword(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    };
    return request({
        url: '/system/user/profile/updatePwd',
        method: 'put',
        params: data
    })
}
