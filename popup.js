/*
growing: true or false
type: 1,2,3,4
stage:1,2,3,4,5
timeleft: date - date.now
*/
//blue: 2hour, purp:4hour, red:8hour, blue:
let data = localStorage.getItem("plant");

let store, id;
class Clock{
    constructor(timeleft){
    
    }

}
class Plant{
    constructor(id,type,stage,timeleft){
        this.id = id;
        this.growing = true;
        this.type = type;
        this.stage = stage;
        this.timeleft = timeleft;
        this.description = null;
    }
    render(){
        const plant = document.getElementById("ground");

    }
    start(){
        
    }
    stop(){

    }
    changeStage(){

    }
    finishGrowing(){

    }
    saveToStorage(){

    }
}

if(data){
    store = JSON.parse(data);
    loadPlant(store);
    id = store.length;
}else{
    store = [];
    id = 0;
};

window.onload = function(){
    const timehours = document.getElementById("time");
    const addPlant = document.getElementById("addPlant");
    let type;

    addPlant.addEventListener('click',function(){
        const time = timehours.value;
        if(!time){
            return;
        }
        if(time >=0 && time < 2){
            type = 1;
        }
        if(time >=2 && time < 4){
            type = 2;
        }
        if(time >=4 && time < 8){
            type = 3;
        }
        if(time >= 8){
            type = 4;
        }
        addPlant.parentNode.parentNode.removeChild(addPlant.parentNode);
        const deadline = Date.now() + (time * 3600000)
        console.log(deadline);
        let plant = new Plant(id,type,1,deadline)
        plant.Render();
    })
}