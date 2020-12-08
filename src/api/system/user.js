import request from '@/utils/request';

export function getStudentList(info) {
    return request({
        url: '/student/list',
        method: 'get',
        params: info
    });
}

export function getTeacherList(info) {
    return request({
        url: '/teacher/list',
        method: 'get',
        params: info
    });
}

export function getAdminList(info) {
    return request({
        url: '/admin/list',
        method: 'get',
        params: info
    });
}

export function addUser(info) {
    return request({
        url: '/system/user/',
        method: 'post',
        data: info
    });
}

export function editUser(info) {
    return request({
        url: '/system/user',
        method: 'put',
        data: info
    });
}

export function deleteUser(ids) {
    return request({
        url: '/system/user/' + ids,
        method: 'delete'
    })
}

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
