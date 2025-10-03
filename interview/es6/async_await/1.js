// 语法糖
async function  foo() {
    const a =  await bar();
    return a + 1;
}

function foo() {
    return new Promise((resolve, reject) => {
        bar().then(res => {
            resolve(res + 1);
        }).catch(reject)
    })
}

// 本质是语法糖， 只是写法更优雅， 更同步