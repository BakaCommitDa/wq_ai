# colab
- 魔搭 = colab(在线nlp实验室) + huggingface(大模型社区，发布)
- .ipynb python 机器学习文件类型后缀
 - 边写边运行
 - 更适用于科学计算


- finetuned
  - 微调  喂数据给 CNN
    在文字类nlp 有优势
    专业， opeanai ，还要有huggingface
  - large size model 





未保存
!pip install transformers

# 引入 requests 模块 相当于js fetch
import requests

# 数据可视化 Python 图像库
# 自动驾驶 纯视觉识别 画框框  图像识别
# 车牌识别
from PIL import Image
url ="https://img.huxiucdn.com/article/cover/202506/19/212701954319.jpg?imageView2/1/w/1070/h/640/|imageMogr2/strip/interlace/1/quality/85/format/webp"

# JS 和其他语言的区别 重要 异步
# JS 不一样 网页端语言 ，JS单线程，一旦卡住，页面无法交互，结束还要负责页面交互
im = Image.open(requests.get(url,stream=True).raw)
im

from transformers import pipeline
# 模型
checkpoint = "google/owlvit-base-patch32"
detector = pipeline(model=checkpoint,task="zero-shot-object-detection")

predictions = detector(
    im,
    candidate_labels=["girl","candle"]
)
predictions