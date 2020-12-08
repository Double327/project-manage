import request from '@/utils/request';

export function getCourseList(info) {
    return request({
        url: '/course/list',
        method: 'get',
        params: info
    });
}


export function addCourse(info) {
    return request({
        url: '/course',
        method: 'post',
        data: info
    });
}

export function editCourse(info) {
    return request({
        url: '/course',
        method: 'put',
        data: info
    });
}

export function deleteCourse(ids) {
    return request({
        url: '/course/' + ids,
        method: 'delete'
    });
}
