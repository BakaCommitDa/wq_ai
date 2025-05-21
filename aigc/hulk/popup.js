/**
 *  @sesc 页面背景切换
 *  @author lhh
 *  @date 2025-05-10 16:45:00
 */

// JS面向对象 语言
// 事件监听
// 弹窗加载完后执行
document.addEventListener('DOMContentLoaded', function() { 
    // 获取 ID 为 changeColorButton 的按钮元素
    const changeColorButton = document.getElementById('changeColorButton');
    
    // 为按钮添加点击事件监听器
    changeColorButton.addEventListener('click', function() { 
        // 查询当前窗口中的活动标签页
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // 向当前活动标签页发送消息，消息内容为 {action: "changeBackgroundColor"}
            chrome.tabs.sendMessage(tabs[0].id, {action: "changeBackgroundColor"});
        });
    });
});