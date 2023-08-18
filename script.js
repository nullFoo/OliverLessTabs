function AddCurrentPage() {
    console.log("adding current page");
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = "\"" + tabs[0].url + "\"";
        let title = tabs[0].title;
        var obj = {};
        obj[url] = title;
        chrome.storage.sync.set(obj, function() {
            console.log("Added page to list");
            UpdatePages();
            UpdateBadgeText();
        });
    });
}

function RemovePage() {
    var urlFromElement = this.id;
    console.log(urlFromElement);
    var url = urlFromElement.split("remove-")[1];
    console.log("removing " + url);
    chrome.storage.sync.remove(url, () => {
        console.log("removed " + url + " from list");
        UpdatePages();
        UpdateBadgeText();
    });
}

function UpdatePages() {
    console.log("updating pages");
    document.getElementById("savedPagesList").innerHTML = "";
    chrome.storage.sync.get(null, function(items) {
        console.log(items);
        var i = 0;
        for (var url in items) {
            var title = items[url];
            console.log(title);
            var listItem = "<div style='float:left; width:150px; margin:15px;'>";
                listItem += "<a href=" + url + ">" + title + "</a></div>";
                listItem += "<button style='float:right;' id='remove-" + url + "'>X</button>"
            listItem += "</div><br>";
            document.getElementById("savedPagesList").innerHTML += listItem;

            i++;
        }
        i = 0;
        for (var url in items) {
            console.log(document.getElementById("remove-" + url));
            document.getElementById("remove-" + url).onclick = RemovePage;
            console.log(url);
            console.log(document.getElementById("remove-" + url).onclick);
            i++;
        }
    });
}

function UpdateBadgeText() {
    chrome.storage.sync.get(null, function(items) {
        var numPages = Object.keys(items).length;
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
        chrome.action.setBadgeText({text: numPages.toString()});
    });
}

document.getElementById("addCurrentPage").onclick = AddCurrentPage;
UpdateBadgeText();
UpdatePages();