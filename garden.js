function show_detail()
{
    var x = MouseEvent.clientX;
    var y = MouseEvent.clientY;
    var _plant = document.elementFromPoint(x, y);
    var __plant = grownPlants[_plant.id];
    document.getElementById("plantInfo").innerHTML=__plant[2]/3600000;
    document.getElementById("plantInfo2").innerHTML=__plant[3];
}

window.onload = function(){
    const area = document.getElementById("workarea");
    let grownPlants = JSON.parse(localStorage.getItem("grownPlants"));
    console.log(grownPlants);
    function addToGarden(id,type,time,desc){
        html = `<div>
            <img class="plant_class" id="${id}" src="./Sprites/${type}5.png"></img>
            
        </div>`
        area.insertAdjacentHTML("beforeend",html);
    }
    if(grownPlants){
        for(var i=0;i<grownPlants.length;i++){
            addToGarden(i,grownPlants[i].type,grownPlants[i].time,grownPlants[i].desc);
        };
    }else{

    }

    document.getElementsByClassName("plant_class").addEventListener("mouseover", show_detail);
}
//<span><p>Time: ${timehours} hours</p><p>${desc}</p></span>