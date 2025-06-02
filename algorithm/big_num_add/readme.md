# 大数相加

- 高精度 
  js 只有Number 类型，不分整数、浮点数、高精度...
  js 不太适合计算  python  适合计算
  js的表现力强
- 大数字
  存在一个边界问题
  Infinity
  -Infinity
  Number.MAX_VALUE

- 先字符串化
  

- es6  提供了bigInt  大数类型

## BigInt  
  安全 2^53 - 1   9007199254740991
  es6 新增的第六种简单数据类型
  后面加 n 
  BigInt('123456789012345678901234567890123456789'),不能new
  无限大， 无溢出问题
  不能混合BigInt 和 Number 运算
  js 适合大型项目开发