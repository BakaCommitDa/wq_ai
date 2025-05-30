const name = '旺财';
const age = 2;
// 字符串模板  template string 
// 字符串拼接告更优雅的字符串模板别
// const sentence = `My dog ${name} is ${age * 7} years old`;

const sentence = (name,age) =>`My dog ${name} is ${age * 7} years old`;
console.log(sentence(name,age));