// 如何遍历数组
// - for(let i =0..)计算循环 性能好  可读性不好  不是人脑 ，电脑
// - while
// - foreach
// - map filter find some every
// - for of

 const names = Array.of('Alice','Bob','Charlie','David');
names.forEach((name)=>{
    if(name == 'Charlie'){
        console.log('Charlie is here,stop...');
        return;
    }
}
)

 