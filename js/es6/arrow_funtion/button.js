// 业务流水账代码
// 学会封装
function Button(id){
    this.element = document.querySelector(`#${id}`);
    console.log(this.element);
    this.bindEvent();
}

Button.prototype.bindEvent = function(){
    //this 丢失问题 // 这里thisButton
    // this.element.addEventListener('click',function () {
    //     // this=>this.element
    //     this.element.style.backgroundColor = 'red'; 
    // }.bind(this));
    this.element.addEventListener('click',this.setBgColor.bind(this));
    //不用call，必须是返回一个全新的函数
}


Button.prototype.setBgColor = function(){
    this.element.style.backgroundColor = '#1abc9c';
    
}