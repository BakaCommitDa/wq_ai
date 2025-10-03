const sleep = ms => new Promise( reslove => setTimeout(reslove,ms) );

async function trafficLight() {
    const seq = [
        { color: 'red',ms: 1000 },
        { color: 'green',ms: 2000 },
        { color: 'yellow',ms: 3000 },
    ]

    while(true) {
        for(const { color, ms} of seq) {
            console.log(color);
            await sleep(ms);      
        }
    }
}

(async () => {
    console.log('begin');
    // 异步变同步
    await trafficLight();
    console.log('end');
})()
