/*
growing: true or false
type: 1,2,3,4
stage:1,2,3,4,5
timeleft: date - date.now
*/
//blue: 2hour, purp:4hour, red:8hour, blue:
let data = localStorage.getItem("plant");
let store;
let tableGrown = JSON.parse(localStorage.getItem("grownPlants"));
if(!tableGrown){
    tableGrown = [];
}

window.onload = function(){
    const timehours = document.getElementById("time");
    const addPlant = document.getElementById("addPlant");
    const area = document.getElementById("workarea");
    let type;
    class Plant{
        constructor(type,stage,time,deadline){
            this.type = type;
            this.stage = stage;
            this.time = time;
            this.deadline =  deadline;
            this.description = null;
            this.dead = false;
        }

        Death(){
            localStorage.setItem('death', JSON.stringify("false"));
            localStorage.removeItem('plant');
                document.getElementById("image").src = `/Sprites/dead_flower.png`;
            const htmldeath = `<span id="death"><p>Oh no! Your plant withered! Keep out from your blacklisted websites!</p></span>`
            area.insertAdjacentHTML("beforeend",htmldeath);
        }

        render(){               
                const html = `<div>
                    <img id ="image" witdh ="128px" height="128px" src="/Sprites/${this.type}${this.stage}.png"></img>
                </div>
                <div>
                    <p id="demo">
                </div>`
                area.insertAdjacentHTML('beforeend',html);
                this.saveToStorage();
                this.start();
        }
        start(){
        // Update the count down every 1 second
        const duration = this.time; 
        const plant = this;
        const x = setInterval(function() {
            let death = JSON.parse(localStorage.getItem("death"));
            if(death==true){
                plant.Death();
                clearInterval(x);
                return;
            }
                const now = new Date().getTime();
                const distance = plant.deadline - now;
                const time = duration - distance;
                let progress = time/duration;
                if(progress<0.25){
                    plant.stage = 1;
                }else if(progress<0.5){
                    plant.stage = 2;
                }else if(progress<0.75){
                    plant.stage = 3;
                }else if(progress<1){
                    plant.stage = 4;
                }else{
                    plant.stage = 5;
                }
                if (distance <= 0) {
                    clearInterval(x);
                    plant.saveToStorage(); 
                    plant.updateImg();
                    plant.finishGrowing();
                    return;
                }
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("demo").innerHTML = hours + "h "
                + minutes + "m " + seconds + "s ";
                plant.saveToStorage();
                plant.updateImg();
            
        }, 10);
        }
        updateImg(){
            document.getElementById("image").src = `/Sprites/${this.type}${this.stage}.png`;
        }
        finishGrowing(){
            var desc = prompt("Your plant has grown! Describe your productive time", "Here"); 
            
            var tableGrown = JSON.parse(localStorage.getItem("grownPlants"));
            if(tableGrown==null)
            {
                tableGrown=[];
            }
            tableGrown.push({
                type: this.type,
                time: this.time,
                desc: desc
            });
            
            
            localStorage.setItem("grownPlants",JSON.stringify(tableGrown));
            localStorage.removeItem('plant');
        }
        saveToStorage(){
            const table =[];
            table.push({
            type: this.type ,
            stage: this.stage, 
            time: this.time,
            deadline:this.deadline,
            description: this.description ,
            dead: this.dead
            });
            localStorage.setItem("plant",JSON.stringify(table));
        }
    }
    if(data){
        store = JSON.parse(data);
        loadPlant(store);
    }else{
        store = [];
    };

    function loadPlant(store){
        
        addPlant.parentNode.parentNode.removeChild(addPlant.parentNode);
        store.forEach(function(element){
            if(element.dead){
            return;
        }   
            let plant = new Plant(element.type,element.stage,element.time,element.deadline);
            plant.render();  
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
            switch(type){
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
            const ftime = time *3600;
            localStorage.setItem('death', JSON.stringify("false"));
            
            addPlant.parentNode.parentNode.removeChild(addPlant.parentNode);
            const deadline = Date.now() + ftime;
            let plant = new Plant(img,1,ftime,deadline)
            plant.render();
        })
    }