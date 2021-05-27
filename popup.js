/*
growing: true or false
type: 1,2,3,4
stage:1,2,3,4,5
timeleft: date - date.now
*/
//blue: 2hour, purp:4hour, red:8hour, blue:
let data = localStorage.getItem("plant");
console.log(data);
let store, id;

window.onload = function(){

    const timehours = document.getElementById("time");
    const addPlant = document.getElementById("addPlant");
    let type;
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
            const plant = document.getElementById("workarea");
            let img;
            console.log(this.type)
            switch(this.type){
                case 1:
                    img = "orange_flower"
                break;
                case 2:
                    img = "purp_flower"
                break;
                case 3:
                    img = "red_flower"
                break;
                case 4:
                    img = "blue_flower";
                break;
            }
            const html = `<div>
                <img witdh ="128px" height="128px" src="/Sprites/${img}${this.stage}.png"></img>
            </div>
            <div>
                <p id="demo">
            </div>`
            plant.insertAdjacentHTML('beforeend',html);
            this.saveToStorage();
            this.start();
        }
        start(){
        // Update the count down every 1 second
        const time = this.timeleft;
        const x = setInterval(function() {
            
            const now = new Date().getTime();
            const distance = time - now;
            if (distance < 0) {
                clearInterval(x);
                this.finishGrowing();
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
            
        }, 1000);
        }
        stop(){

        }
        changeStage(){

        }
        finishGrowing(){
            
        }
        saveToStorage(){
            const table =[];
            table.push({
            id: this.id,
            growing: this.growing,
            type: this.type ,
            stage: this.stage, 
            timeleft: this.timeleft, 
            description: this.description 
            });
            id++;
            localStorage.setItem("plant",JSON.stringify(table));
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

    function loadPlant(store){
        addPlant.parentNode.parentNode.removeChild(addPlant.parentNode);
        store.forEach(function(element){
            if(element.growing == true){
                let plant = new Plant(element.id,element.type,element.stage,element.timeleft);

                plant.render();
                
            }
        });
    }
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
            plant.render();
        })
    }