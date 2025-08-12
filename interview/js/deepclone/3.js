const target = {
    a:1
}

const source = {
    // 对象的嵌套
    b:{
        name:'小安',
        hobbbies:['篮球','足球']
    },
    c:1
}

// 浅拷贝
Object.assign(target,source);
target.b.name = '安安'
target.b.hobbbies.push('唱歌');
target.c = 2;



console.log(source.b.name,source.b.hobbbies,source.c);

