import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import nProgress from 'nprogress'

const service = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 3000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers || {}

    //将 token存在本地
    // if (getToken()) {
    //     config.headers.token = getToken()
    // }

    //nprogress.start()
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use((res: AxiosResponse) => {
    // nprogress.done()
    return res.data
}, err => {
    return Promise.reject(err)
})

export default service