chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "changeBackgroundColor") {
        document.body.style.backgroundColor = "green";
    }
});