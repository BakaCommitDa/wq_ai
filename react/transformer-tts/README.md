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
        高效解决适配问题  w-full + max-w-xl
    - webworker nlp 任务
       1.延迟加载大模型
       2.在现实组件后再实例化 性能好
       3.下载时移除事件 避免内存泄漏
    - 封装组件

- 项目的难点 
   -  单例模式封装 MyTextSpeechPieline
   -  getInstance 只实例化一次
   -  懒执行 
   - Promise.all + nlp 流程的理解 (tokenizer 、 model 、 vocoder)


- audio 标签的url 《- Object.createObjectURL(blob) 《- 二进制数据位 《- ttsModel 生成 《-
    input_ids(tokenizer 分词) + speakeing_embeddings + vocoder(合成器) 《- tokenizer + speaking
    blob 二进制文件
    Object.createObjectURL 根据文件返回一个本地浏览的地址
    大模型不负责给你全局访问的地址
    Object.createObjectURL 是一个用于创建一个唯一 URL，该 URL 可以引用由浏览器内部生成的对象（如 Blob 或 File 对象）的方法，常用于在网页中显示本地文件内容，如图片预览。
