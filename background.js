chrome.extension.onRequest.addListener(function(req, src, send) {
    if (req.alternates) {
        chrome.pageAction.show(src.tab.id);
        send(localStorage[req.url]);
    }
});
