window.onload = function(){
    const area = document.getElementById("workarea");
    let grownPlants = JSON.parse(localStorage.getItem("grownPlants"));
    console.log(grownPlants);
    function addToGarden(id,type,time,desc){
        html = `<div>
            <img class="plant_class" id="${id}" src="./Sprites/${type}5.png"></img>
            
        </div>`
        area.insertAdjacentHTML("afterbegin",html);
    }
    if(grownPlants){
        for(var i=0;i<grownPlants.length;i++){
            addToGarden(i,grownPlants[i].type,grownPlants[i].time,grownPlants[i].desc);
        };
    }else{

    }

    document.getElementById("workarea").addEventListener("mouseover", function(event){
        
        var _plant = event.target.id;
        console.log(_plant);
        var __plant = grownPlants[_plant];
        console.log(__plant);
        document.getElementById("plantInfo").innerHTML=__plant.time/3600000;
        document.getElementById("plantInfo2").innerHTML=__plant.desc;

    });
}