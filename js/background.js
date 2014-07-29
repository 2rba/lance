chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "/options.html";
    chrome.tabs.create({ url: newURL });
});