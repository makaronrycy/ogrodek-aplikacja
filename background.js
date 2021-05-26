console.log("background.js")
let data = JSON.parse(localStorage.getItem("banned_sites"));
if(!data){
    data=[];
} 

chrome.tabs.onUpdated.addListener(
    function(tabId,changeInfo,tab) {
      if (changeInfo.url) {
        console.log("OnUpdated: "+changeInfo.url);
        checkBanned(changeInfo.url);
      }
    }
  );
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId,current_tab_info=>{
        console.log("OnActivated: "+current_tab_info.url);
        checkBanned(current_tab_info.url);
    });
});

function checkBanned(url){
    data.forEach(element => {
        if (url == element){
            console.log("I'm banned!")
        }
    });
}