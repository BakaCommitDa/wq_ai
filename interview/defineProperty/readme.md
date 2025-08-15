# 响应式底层原理

- DOM api  -> 响应式业务， 自动化
- Object.defineProperty(obj,"value",{

})
    对象上的某个属性的某些行为（get、set）进行定义，在完成本来的职责同时去做dom 更新，
    既是响应式

- 缺点呢？ 有点麻烦，每次只能定义一个属性
    拦截行为
- obj.value
- REACT,VUE 现代前端MVVM框架， 早期用Object.defineProperty() 
  实现响应式，现在使用Proxy
- es6 Proxy 可以一次性代理整个对象


- 属性描述符(property descriptor)
    configurable 可配置修改或删除
    enumerable: true,
    value: 1,
    writable: true,
    get: undefined,
    set: undefined



