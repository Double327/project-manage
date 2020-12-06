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

export function deleteRole(ids) {
    return request({
        url: '/system/role/' + ids,
        method: 'delete'
    })
}

export function updateRole(info) {
    return request({
        url: '/system/role',
        method: 'put',
        data: info
    });
}

export function changeRoleStatus(info) {
    return request({
        url: '/system/role/',
        method: 'put',
        data: info
    })
}
