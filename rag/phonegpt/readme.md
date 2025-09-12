# phonegpt

- chatbot
    组件、tailwindcss messages
    ai streaming  复杂  封装？
    大模型 

- 专业领域的chatbot
    RAG 手机知识库检索增强生成 
    - 知识库（爬虫）
    - 向量数据库

## 项目中用到的技术

- RAG 检索增强生成
    - embeddings openai embed 向量化
    - 相似度 cos  -> 1 倒序
    - 存到supabase 向量数据库

### package.json
- ai sdk
    build AI-powered applications
    封装了LLM的调用
    @ai-sdk/openai  调用LLM
    
    @ai-sdk/react hooks  api 式一行完成流式输出 

- supabase 
   BASS  Backend as Service
   底层  Postgres  支持  向量数据库

- langchain
    LangChain 是一个用于构建 AI 应用的框架，它连接大模型、数据源和工具，简化了从提示工程到链式调用
    、记忆管理和代理决策的开发流程。
    @langchain/community   社区提供的工具(爬虫)
    @langchain/core  核心模块
- dotenv
    环境变量

- puppeteer     无头浏览器

- lucide-react  是一个轻量、开源的 React 图标库
    提供了丰富的图标组件，支持自定义样式和大小。

- react-markdown  是一个 React 组件，用于渲染 Markdown 文本

## Next.js
- layout metadata 修改
    有关于SEO
- "use client"; 是 Next.js 中的指令，用于标记一个组件为客户端组件，
使其可以使用 React 的交互功能（如 useState、useEffect）和客户端特有的逻辑。

## tailwindcss
- max-w-3xl
  响应式的技巧
  48rem(适配) 3xl   768px  ipad 竖着拿的尺寸 
  移动设备(phone,pad) width = 100% = 100vw
  pc端 最大768px, mx-auto 
  Mobile First 移动设备优先
- 在 Tailwind CSS 中，[] 表示任意值（Arbitrary Value），允许你直接写入自定义的 
  CSS 值（如 80vh），会被转换为对应的内联样式，实现灵活布局。

- @ai-sdk/react
  hooks 封装了chatLLM的功能，方便流式输出。

## typescript
- 组件通信 类型定义