import {
    NextResponse,
    NextRequest
} from "next/server"; 
import {
    prisma
} from "@/lib/db";
import { error } from "console";
import bcrypt from 'bcryptjs'
import {
    emailRegex,
    passwordRegex
} from "@/lib/regexp";





export async function POST(request: NextRequest) {
    // 容错处理 稳定为主
    try{
        const {
            email,
            password
        } = await request.json();
        // 需要用正则表达式验证格式
        if(!email || !emailRegex.test(email)) {
             return NextResponse.json({ error: '邮箱格式无效' }, { status: 400 })
        }
        if (!password || !passwordRegex.test(password)) {
            return Response.json(
                { error: '密码需6-18位，且不能全为数字' },
                { status: 400 }
            )
        }
        // 检测用户名是否已经注册？
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser) {
            return NextResponse.json({
                error:'user already exists'
            },{
                status:409
            })
        }


        // 密码的单向加密
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{
                email,
                password:hashPassword
            }
        })
        return NextResponse.json({
            message:'Register Successful'
        },{
            status:201
        })
    }catch(err){
        console.log(err);
        return NextResponse.json({
            error:'Inter server error'
        },{
            status:500
        })
    }finally {
        // 释放数据库对象
        await prisma.$disconnect();
    }
}

