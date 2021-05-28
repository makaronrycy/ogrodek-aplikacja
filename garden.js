window.onload = function(){
    const area = document.getElementById("workarea");
    const clear = document.querySelector(".clear");
    let grownPlants = JSON.parse(localStorage.getItem("grownPlants"));
    function addToGarden(id,type){
        html = `
            <img class="plant_class" id="${id}" src="./Sprites/${type}5.png"></img>
            
        `
        area.insertAdjacentHTML("afterbegin",html);
    }
    if(grownPlants){
        for(var i=0;i<grownPlants.length;i++){
            addToGarden(i,grownPlants[i].type);
        };
    }else{

    }

    document.getElementById("workarea").addEventListener("mouseover", function(event){
        console.log(event.target);
        if(event.target == workarea){
            return;
        }
        var _plant = event.target.id;
        var __plant = grownPlants[_plant];
        document.getElementById("plantInfo").innerHTML="Czas: "+__plant.time/3600000;
        document.getElementById("plantInfo2").innerHTML=__plant.desc;

    });
    document.getElementById("workarea").addEventListener("mouseout",function(){
        document.getElementById("plantInfo").innerHTML="";
        document.getElementById("plantInfo2").innerHTML="";
    })
}

