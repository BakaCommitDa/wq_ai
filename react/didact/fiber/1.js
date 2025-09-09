// 全局对象， 指向下一个要处理的单元工作（即一个fiber节点）
// fiber 对象  链表
let nextUnitOfWork = null;

// 浏览器空闲的时候调用 
function wookLoop(deadline) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        // 如果任务剩余时间小于1ms, 停止执行， 避免阻塞渲染
        shouldYield = deadline.timeRemaining() < 1;
    }
}
// 模拟实现，schedule 任务调度机制
requestIdleCallback(workLoop);