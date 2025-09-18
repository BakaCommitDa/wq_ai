const arr = [1,2,3,4,5,6];
// const removed = arr.splice(2,2);
// console.log(removed);
// console.log(arr);
// 如果不修改呢？ 移除但又不改变原数组 splice 不能用
// slice 不修改原数组
const arr2 = arr.slice(0,3).concat(arr.slice(2));
console.log(arr2);
console.log(arr);

