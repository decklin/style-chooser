function snap(path, f) {
    var s = document.evaluate(path, document, null, 7, null);
    for (var i = 0; i < s.snapshotLength; i++) f(s.snapshotItem(i));
}

var hasAlternates = false;
var titles = {};

snap('//link[contains(@rel, "style") and @title]', function(link) {
    titles[link.title] = true;
    if (link.rel.indexOf('alternate') !== -1)
        hasAlternates = true;
});

chrome.extension.sendRequest({alternates: hasAlternates});

function selectStyle(title) {
    snap('//link[contains(@rel, "style") and @title]', function(link) {
        link.disabled = true;
        if (link.title === title)
            link.disabled = false;
    });
}

chrome.extension.onRequest.addListener(function(req, src, send) {
    if (req.getTitles)
        send(titles);
    else if (req.selectStyle)
        selectStyle(req.style);
});
