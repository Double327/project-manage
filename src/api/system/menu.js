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
