# React Transformer TextTOSpeech

- transformer
    transformer.js JS AI 机器学习库
    来自于huggingface  来自全球最大开源大模型社区  
    将模型下载到浏览器端， JS 开发者的智能战场未来 
    安装 pnpm i @xenova/transformers

- 项目的亮点
    - 使用transformer.js 的 端模型
    - 使用taillwindcss 原子css 几乎不需要写样式了
    pnpm i tailwindcss @tailwindcss/vite
        类名文档语义化很好，特别适合AI 生成
    - webworker nlp 任务
       1.延迟加载大模型
       2.在现实组件后再实例化 性能好
       3.下载时移除事件 避免内存泄漏
    - 封装组件

- 项目的难点 