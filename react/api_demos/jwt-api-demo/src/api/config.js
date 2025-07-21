// 标准的http请求库， vue/react都用它
import axios from 'axios';
// mock 地址
// axios.defaults.baseURL = 'http://localhost:5173';
// 线上地址有了
axios.defaults.baseURL = 'https://api.github.com/users/BakaCommitDa';


export default axios;