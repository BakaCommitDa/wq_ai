const target = {
    a:1,
    b:2,

}

const source = {
    b:3,
    c:4,
}

// 后面的覆盖前面的
Object.assign(target,source);
console.log(target);
