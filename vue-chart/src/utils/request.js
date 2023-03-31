import axios from "axios";
import { ElMessage} from "element-plus";

// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true;
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    (config) =>{
    
    },
    (error)=>{
        ElMessage('请求异常：' + JSON.stringify(error));
        return Promise.reject(error)
    }
)

axios.interceptors.response.use((response)=>{
    if (typeof res.data !== 'object') {
        ElMessage.error('服务端异常！')
        return Promise.reject(res)
    }
    return response
},
(error)=>{
    return Promise.reject(error)
})

export default axios