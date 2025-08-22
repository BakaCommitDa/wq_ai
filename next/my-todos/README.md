# Next.js

## supbase

## 数据库开发
- ORM 工具
    不需要写SQL, 像操作对象一样去操作数据库
    Prisma 是一个 ORM 工具, 可以帮助我们操作数据库     pnpm i prisma @prisma/client
## Prisma?  数据库的工程化 
是命名行工具， 用于工具数据库 schema、迁移。
schema  是数据库的结构蓝图， 定义了表、字段、数据类型、关系和约束等组织方式
Migration 是数据库结构的变更（建表、改字段）等
不止可以帮助我们操作数据库，还可以为我们的数据库操作留下记录
引入pnpm i prisma @prisma/client
npx prisma init
npx prisma migrate dev --name init