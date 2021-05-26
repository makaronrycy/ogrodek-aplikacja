console.log("background.js")
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId,current_tab_info=>{
        console.log(tab.tabId,current_tab_info.url)
    });
});