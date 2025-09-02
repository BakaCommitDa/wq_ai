export const emailRegex = /^.+@.+\..+$/; // RegExp;
export const passwordRegex = /^(?!^\d+$)^[a-zA-Z0-9!@#$%^&*]{6,18}$/
// resutful
// 匹配规则， 符号数学
// . 通配符 什么都匹配，匹配一个
// + 一次或多次
// @ email 必须要有的字符
// .+@ 在@前面至少要有一个字符
// \. 转义 一定要有一个.   