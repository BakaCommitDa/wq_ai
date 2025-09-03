// reduce   [] => 1项
// 多维数组 =》 1项1维数组
// reduce 方法把数组合并成一个值

const flattten = arr =>
    arr.reduce((acc,cur)=> {
        acc.concat(Array.isArray(cur) ?flattten(cur):cur)
    },[] )