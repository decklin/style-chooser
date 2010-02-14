function snap(path, f) {
    var s = document.evaluate(path, document, null, 7, null);
    for (var i = 0; i < s.snapshotLength; i++) f(s.snapshotItem(i));
}

var stylePath = '//link[contains(@rel, "style") and @title]';
var hasAlternates = false;
var titles = {};

snap(stylePath, function(link) {
    titles[link.title] = true;
    if (link.rel.indexOf('alternate') !== -1)
        hasAlternates = true;
});

var req = {
    alternates: hasAlternates,
    url: location.href
};

chrome.extension.sendRequest(req, function(title) {
    if (title)
        selectStyle(title);
});

chrome.extension.onRequest.addListener(function(req, src, send) {
    if (req.getTitles) {
        send(titles);
    } else if (req.selectStyle) {
        selectStyle(req.styleTitle);
    }
});

function selectStyle(title) {
    snap(stylePath, function(link) {
        link.disabled = true;
        if (link.title === title)
            link.disabled = false;
    });
}
