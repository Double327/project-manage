import request from "@/utils/request";


export function listRole(info) {
    return request({
        url: '/system/role/list',
        method: 'get',
        param: info
    })
}

export function addRole(info) {
    return request({
        url: '/system/role',
        method: 'post',
        data: info
    });
}

export function updateRole(info) {
    return request({
        url: '/system/role',
        method: 'put',
        data: info
    });
}
