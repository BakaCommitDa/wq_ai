
import jwt from 'jsonwebtoken';

// 安全性  编码的时候加密
// 解码的时候用于解密
// 加盐
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
    },
    {
        url:'/api/user',
        method:'get',
        response:(req,res) => {
            // 用户端 token headers 

            const token = req.headers['authorization'].split(' ')[1];
            console.log(token);
            
            try{
                const decode = jwt.decode(token,secret);
                console.log(decode);
                
                return {
                    code:0,
                    date:decode.user
                }
            }catch(err){
                return{
                    code:1,
                    message:'Invalid token'
                }
                
            }
            return {
                token
            }
        }
    }
]

