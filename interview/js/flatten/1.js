const flattten = (arr) => {
    let res = [];
    for(let item of arr) {
        if(Array.isArray(item)) {
            res = res.concat(flattten(item));
        }else {
            res.push(item);
        }
    }
    return res;
}