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

export function addMenu(info) {
    return request({
        url: '/system/menu/',
        method: 'post',
        data: info
    });
}

export function deleteMenu(ids) {
    return request({
        url: '/system/menu/' + ids,
        method: 'delete'
    });
}

export function updateMenu(info) {
    return request({
        url: '/system/menu/',
        method: 'put',
        data: info
    });
}
