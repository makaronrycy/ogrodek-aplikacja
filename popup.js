/*
growing: true or false
type: 1,2,3,4
stage:1,2,3,4,5
timeleft: date - date.now
*/
//blue: 2hour, purp:4hour, red:8hour, blue:
let data = localStorage.getItem("plant");

let store, id;

class Plant{
    constructor(id,type,stage,timeleft){
        this.id = id;
        this.growing = true;
        this.type = type;
        this.stage = stage;
        this.timeleft = timeleft;
        this.description = null;
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
    const plantArea = document.getElementById("ground");
    const timehours = document.getElementById("time");
    const addPlant = document.getElementById("addPlant");
    
    addPlant.addEventListener('click',function(){
        console.log(timehours.value);
        

    })
}