let store;
function save_options() 
{
  var select = document.getElementById("urlTrack");
  if (localStorage.getItem("banned_sites"))
  {
    var bannedSites = JSON.parse(localStorage.getItem("banned_sites"));
  }
  else
  {
    var bannedSites = [];
  }

  if (select.value)
  {
    bannedSites.push(select.value);
    localStorage.setItem('banned_sites', JSON.stringify(bannedSites));
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() 
    {
      status.innerHTML = "";
    }, 2000);
    show_options();
    return;
  }  
  var status = document.getElementById("status");
  status.innerHTML = "Couldn't track site. (Blank)";
  setTimeout(function() 
  {
    status.innerHTML = "";
  }, 2000);
}

function show_options() {
  var sites = JSON.parse(localStorage.getItem('banned_sites'));
  if (!sites) 
  {
    return;
  }
  document.getElementById("trackList").innerHTML='';
  for (var i = 0; i < sites.length; i++) 
  {
    var node = document.createElement("LI");               
    var textnode = document.createTextNode(sites[i]);         
    node.appendChild(textnode);                              
    document.getElementById("trackList").appendChild(node);     
  }
}


window.onload = function()
{
  const track = document.getElementById("trackList");
  const clear = document.querySelector(".clear");
  show_options();
  document.getElementById("addTrack").addEventListener('click', save_options);
  track.addEventListener('click',function(event){
    const element = event.target;
    const url = element.innerHTML;
    if(element){
      element.parentNode.removeChild(element);
      const optionList = JSON.parse(localStorage.getItem('banned_sites'));
      for(var i = 0; i < optionList.length; i++){
        if(optionList[i] == url){
          optionList.splice(i,1);
        }
      }
      localStorage.setItem('banned_sites', JSON.stringify(optionList));
    }

  })
  
  clear.addEventListener("click",function(){
    localStorage.removeItem('banned_sites');
    location.reload();
  });
}  

  
 