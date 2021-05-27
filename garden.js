window.onload = function(){
    const area = document.getElementById("workarea");
    let grownPlants = JSON.parse(localStorage.getItem("grownPlants"));
    console.log(grownPlants);
    function addToGarden(type,time,desc){
    const timehours = time / 3600000; 
    html = `<div>
        <img src="./Sprites/${type}5.png"></img>
        <p>Czas: ${time}</p>
        <p>${desc}</p>
    </div>`
    area.insertAdjacentHTML("beforeend",html);
}
    if(grownPlants){
        grownPlants.forEach(function(element){
            addToGarden(element.type,element.time,element.desc);
        });
    }else{

    }
}