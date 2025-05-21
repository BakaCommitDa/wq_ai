// 数组对象
const arr = [1, 2, 3, 4, 5];
console.log(typeof arr);
const date=new Date();
console.log(typeof date);
// 如何区分区分Object 的这些类型？
//[object Array]
//[object Date]
console.log(typeof Object.prototype.toString.call(arr));
console.log(Object.prototype.toString.call(date));

// 会在MDN 文档看一些资料
function getType(value) {
    // string api 的选择
    // split + substring
    return Object.prototype.toString.call(arr).slice(8,-1);//负值表示索引从字符串末尾开始计数 从-1开始
}
console.log(getType(arr));
