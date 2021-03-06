function checkBanned(url){
    let data = JSON.parse(localStorage.getItem("banned_sites"));
    var death = false;
    var sites = [];
    if(!data){
        data=[];
    }
    data.forEach(element => {
        if (url.includes(element)){
            //document.getElementById("status").innerHTML="Plants can't grow!"+"<br/>"+"Please close "+url;
            if(!sites.includes(url))
            {
                sites.push(url)
                death = true;
                localStorage.setItem('death', JSON.stringify(death));
            }
        }
    });
    
}
chrome.tabs.onUpdated.addListener(
    function(tabId,changeInfo) {
      if (changeInfo.url) {
        checkBanned(changeInfo.url);
      }
    }
  );
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId,current_tab_info=>{
        checkBanned(current_tab_info.url);
    });
});
