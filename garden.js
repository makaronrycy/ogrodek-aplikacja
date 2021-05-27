function addToGarden(type,time,desc){
    html = `<div>
        <img src=/Sprites/${type}.png"></img>
        <p>Czas: ${time}</p>
        <p>${desc}</p>
    </div>`
}

window.onload() = function(){
    let grownPlants = JSON.parse(localStorage.getItem("grownPlants"));
    if(grownPlants){
        grownPlants.forEach(function(element){
            addToGarden(element.type,element.time,element.desc);
        });
    }else{

    }
}