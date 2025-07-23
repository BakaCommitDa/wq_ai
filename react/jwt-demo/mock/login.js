
import jwt from 'jsonwebtoken';

// 安全性  编码的时候加密
// 解码的时候用于解密
const secret = '!O:I@& !:@ *YQ: @* Y&T^ L';


// login 模块 mock 
export default [
    {
        url:'/api/login',
        method:'post',
        timeout:2000,// 请求耗时,
        response:(req,res) => {
            // req,  username,password
            if(req.body.username !== 'admin' || req.body.password !== '123456'){
                return{ 
                     code:1, 
                     msg:'登录失败', 
                     token: null 
                 }
            }
            const {username,password} = req.body;
            // JSON用户数据
                const token = jwt.sign({
                user:{
                    id:"001",
                    username:"admin",
                    
                }
            },secret,{
                expiresIn:60*60*24*7// 7天
            })
            console.log(token,'--------');

            
            // 生成token 颁发令牌
            
            return{
                token,
                username,
                password,
            }
        }
    }
]

