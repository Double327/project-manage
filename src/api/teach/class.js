import request from '@/utils/request';
export function getClassList(info) {
    return request({
        url: '/class/list',
        method: 'get',
        params: info
    });
}
