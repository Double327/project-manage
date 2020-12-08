import request from '@/utils/request';

export function getCurriculumList(info) {
    return request({
        url: '/curriculumProject/list',
        method: 'get',
        params: info
    });
}


export function addCurriculum(info) {
    return request({
        url: '/curriculumProject',
        method: 'post',
        data: info
    });
}

export function editCurriculum(info) {
    return request({
        url: '/curriculumProject',
        method: 'put',
        data: info
    });
}

export function deleteCurriculum(ids) {
    return request({
        url: '/curriculumProject/' + ids,
        method: 'delete'
    });
}
