console.log("background.js")

function checkBanned(url){
    let data = JSON.parse(localStorage.getItem("banned_sites"));
    var sites = [];
    if(!data){
        data=[];
    }
    data.forEach(element => {
        if (url.includes(element)){
            console.log("I'm banned!")
            //document.getElementById("status").innerHTML="Plants can't grow!"+"<br/>"+"Please close "+url;
            if(!sites.includes(url))
            {
                sites.push(url)
            }
        }
    });
    localStorage.setItem('sitesVisited', JSON.stringify(sites));
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
