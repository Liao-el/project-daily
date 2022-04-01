import axios from 'axios'
import {notification} from 'ant-design-vue'; // 信息提示
import {getLocal, clearLocal ,clearSession} from './storage'
import router from './routes'
import { debounce } from 'lodash'

axios.defaults.baseURL = import.meta.env.VITE_HTTP_URL // 通过 .env 文件配置动态路径
axios.defaults.timeout = 30*1000
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true

// 错误提示 防抖
const noticeTxt = debounce( txt =>{
    notification.warning({
        message: txt || "服务器错误"
    })
},1000)


// 请求拦截器
axios.interceptors.request.use(
    config => {
        const userMsg = getLocal("userInfo_end")
        if (userMsg && userMsg.token) {
            // 添加token
            config.headers['Authorization'] = "Bearer " + userMsg.token
        }

        return config;
    },
    error => {
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(response => {
    // console.log(response)
    if (['application/octet-stream', 'application/vnd.ms-excel', 'image/jpeg'].includes(response.headers["content-type"].split(';')[0])) {
        // 文件流的格式
        return Promise.resolve(response);

    } else if (response.status == 200) {
        if (response.data.code == 200) {
            return Promise.resolve(response.data);

        } else if (response.data.code == 40107) {
            //  token过期
            clearLocal()
            clearSession()
            noticeTxt(response.data.message)
            router.push('/login')

        }else if (response.data.code == '50000') { // 无权限
            // router.push({name:'403'})
            return Promise.reject(response)
        }else {

            noticeTxt(response.data.message)
            return Promise.reject(response)
        }
    } else {
        console.error(response.data.message || '服务错误')
        return Promise.reject(response)
    }
}, err => {
    if (err && err.response && err.response.data.message) {
        let status = err.response.status;
        if ([403, 404, 500].includes(status)) {
            // 跳转错误页
            // router.push({name:status.toString()})
            return Promise.reject(err)
        }
        noticeTxt(err.response.data.message)

    } else {
        console.error('连接到服务器失败')
    }
    return Promise.reject(err)
});


export default axios
