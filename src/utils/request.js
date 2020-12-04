import axios from 'axios';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 4000
});

service.interceptors.response.use(response => {
    return response.data;
})

export default service;
