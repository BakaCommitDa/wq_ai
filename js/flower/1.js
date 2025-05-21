// 声明了一个对象常量
// 内存中开辟了一个空间，里面存放了一个对象
// pingci 取址 & 变量名是地址的标记
// js是一个弱类型语言 变量的类型由值决定
// = 赋值 Object
// 对象字面量(字面意义上) JSON
///JS 太灵活，不需要new，通过一个{}就可以创建一个对象   []拿到数组

// js灵活
const pingci={
    name:'平次',
    age:17,
    tall:174,
    hometown:'大阪',
    isSingle:false
};
// js灵活
const kenan={
    name:'柯南',// key:value  String
    age:17,// Number    数值类型
    tall:130,
    hometown:'米花町',
    isSingle:false,// Boolean  布尔类型
    // 送花
    // 形参
    sendFlower:function(girl){
        console.log(kenan.name + '给'+ girl.name + '送了99朵玫瑰')
        girl.receiveFlower(kenan)
    }
}

const xiaolan={
    xq:30,//心情指数
    name:'小兰',
    room:'408',
    receiveFlower:function(sender){
        console.log('收到了' + sender.name + '99朵玫瑰')
        if(xiaolan.xq>90){
            console.log('走，一起吃大阪烧！');
        }
        else{
            console.log('哼，谁要理你～');
        }

    }
}

//帮柯南的  小兰的闺蜜
const yuanzi={
    name:'园子',
    room:'408',
    hometown:'米花町', // 老乡
    // 送小兰， 送园子，都具有receiveFlower
    // 对象互换
    // 接口 interface 
    receiveFlower:function(sender){
        // if(sender.name ==='柯南'){
        //     console.log('柯南，让我们在一起吧');
        //     return
        // }
    setTimeout(() => {//定时器
        xiaolan.xq=99;
        xiaolan.receiveFlower(sender)
    }, 3000);//3s钟后
    // xiaolan.receiveFlower(sender)
    }
}
kenan.sendFlower(xiaolan)
// pyc.sendFlower(xm)









