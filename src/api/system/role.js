import request from "@/utils/request";


export function listRole(info) {
    return request({
        url: '/system/role/list',
        method: 'get',
        param: info
    });
}

export function getRole(id) {
    return request({
        url: '/system/role/' + id,
        method: 'get'
    });
}

export function roleMenuTreeselect(id) {
    return request({
        url: '/system/menu/roleMenuTreeselect/' + id,
        method: 'get'
    });
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
