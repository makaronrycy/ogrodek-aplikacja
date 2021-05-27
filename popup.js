/*
growing: true or false
type: 1,2,3,4
stage:1,2,3,4,5
timeleft: date - date.now
*/
//blue: 2hour, purp:4hour, red:8hour, blue:
let data = localStorage.getItem("plant");
console.log(data);
let store;

window.onload = function(){
    const clear = document.querySelector(".clear");
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
        render(){
                console.log("render smierc"+this.dead)
                console.log(this.type)
                console.log("this.deadline:"+this.deadline);
                console.log("this.time:"+this.time);
                
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
            console.log("Śmierć:"+death);
            if(death){
                plant.dead = true;
                plant.saveToStorage();
                clearInterval(x);
                return;
            }
                console.log("Odpalony zegar");
                const now = new Date().getTime();
                const distance = plant.deadline - now;
                const time = duration - distance;
                let progress = time/duration;
                console.log("Deadline:"+plant.deadline);
                console.log("Time:"+time);
                console.log("Distance:"+distance);
                console.log("Stage progress:"+progress);
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
                console.log("Stage:"+plant.stage);
                if (distance <= 0) {
                    clearInterval(x);
                    plant.saveToStorage(); 
                    plant.updateImg();
                    return;
                }
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("demo").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
                plant.saveToStorage();
                plant.updateImg();
            
        }, 1000);
        }
        updateImg(){
            document.getElementById("image").src = `/Sprites/${this.type}${this.stage}.png`;
        }
        finishGrowing(){
            
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
    function Death(){
        localStorage.removeItem('plant');
        const htmldeath = `<p>Roślina niestety umarła przez to że wszedłeś na zablokowaną stronę!</p>`
        area.insertAdjacentHTML("beforeend",htmldeath);
    }

    function loadPlant(store){
        
        addPlant.parentNode.parentNode.removeChild(addPlant.parentNode);
        store.forEach(function(element){
            console.log(element.dead);
            if(element.dead){
            Death();
            return;
        }   
            let plant = new Plant(element.type,element.stage,element.time,element.deadline);
            plant.render();  
        });
    }
    clear.addEventListener("click",function(){
        localStorage.clear();
        location.reload();
    });
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
            const ftime = time *36000;
            
            addPlant.parentNode.parentNode.removeChild(addPlant.parentNode);
            const deadline = Date.now() + ftime;
            console.log(deadline);
            let plant = new Plant(img,1,ftime,deadline)
            plant.render();
        })
    }