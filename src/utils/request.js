import axios from 'axios'
// import store from '@/store'
import router from '@/router'
const baseURL = process.env.NODE_ENV !== "production" ? "/proxyApi" : "/api/pan"
const request = axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true
});
request.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers["token"] = token // 
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
request.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code !== 401) {
        return res
    } else {
        router.replace('/login')
    }
}, (err) => {
    return err
});
export default request;
