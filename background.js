function UpdateBadgeText() {
    chrome.storage.sync.get(null, function(items) {
        var numPages = Object.keys(items).length;
        chrome.action.setBadgeText({text: numPages.toString()});
        if(numPages > 0) {
            chrome.action.setBadgeBackgroundColor(
                {color: "#00FF00"}
            );
        }
        else {
            chrome.action.setBadgeBackgroundColor(
                {color: "#4F4F4F"}
            );
        }
    });
}

setInterval(() => {
    UpdateBadgeText();
}, 5000);

UpdateBadgeText();