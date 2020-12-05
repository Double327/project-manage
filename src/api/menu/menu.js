import request from '@/utils/request';

export function listMenu(query) {
    return request({
        url: '/system/menu/list',
        method: 'get',
        params: query
    });
}

export function getMenu(menuId) {
    return request({
        url: '/system/menu/' + menuId,
        method: 'get'
    });
}

export function getTreeSelect() {
    return request({
        url: '/system/menu/treeselect',
        method: 'get'
    });
}

export function addRole(info) {
    return request({
        url: '/system/menu',
        method: 'post',
        params: info
    });
}

export function updateRole(info) {
    return request({
        url: '/system/menu',
        method: 'put',
        params: info
    });
}
