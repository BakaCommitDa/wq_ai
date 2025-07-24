import{
    create
}from 'zustand'
import {
    doLogin
} from '../api/user'


export const useUserStore = create(set=>({
    user:null,
    isLogin:false,
    login:async({username="",password=""})=>{
        const res = await doLogin({username,password});
        console.log(res);
        const {token,data:user} = res.data;
        localStorage.setItem('token',token);
        set({
            user,
            isLogin:true,
        })

    },
        logout:()=>{
        localStorage.removeItem('token');
        set({
            user:null,
            isLogin:false,
        })
    }

}))