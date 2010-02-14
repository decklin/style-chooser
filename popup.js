function init() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {getTitles: true}, function(titles) {
            sortedKeys(titles).forEach(appendItem);
        });
    });
}

function appendItem(title) {
    var alternates = document.getElementById('alternates');
    var li = document.createElement('li');
    li.innerHTML = title.length > 0 ? title : '(Default)';
    li.data = title;
    li.onmouseup = function(event) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest(tab.id, {
                selectStyle: true,
                styleTitle: li.data
            });
            window.close();
        });
    };
    alternates.appendChild(li);
}

function sortedKeys(obj) {
    var keys = [];
    for (var k in obj) keys.push(k);
    keys.sort();
    return keys;
}
