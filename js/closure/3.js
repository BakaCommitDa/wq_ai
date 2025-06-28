function add(...args){
    console.log(args);
    return (...newArgs)=>{
        const arr =  add(...args,...newArgs);
        console.log(arr);
    }
}
add(1,2,3)(4,5,6)