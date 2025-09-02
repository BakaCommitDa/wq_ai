import {
    PrismaClient
} from "@prisma/client";


// 不直接和数据库大交道
// 用prisma
const prisma = new PrismaClient(); 