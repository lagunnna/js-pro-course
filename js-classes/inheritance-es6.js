class Car{
    constructor(name, modal, year, color, maxSpeed, fuelCapacity = 60, fuelConsumption = 10){
        this.name = name;
        this.modal = modal;
        this.year = year;
        this.color = color;
        this.maxSpeed = maxSpeed;
        this.fuelCapacity = fuelCapacity;
        this.fuelConsumption = fuelConsumption;
    }

    getFullName(){
        return `${this.name} ${this.modal}`;
    }

    getAge(){
        let date = new Date();
        return date.getFullYear() - this.year;
    }

    changeColor(newColor){

        if(this.color === newColor){
            alert('This color has already been selected');
        } else{
            this.color = newColor;
            alert(`Color changed to ${newColor}`);
        }
    }

    calculateWay(kilometers, fuel){

        if(fuel < 10){
            alert('u need to refuel');
        }

        let timeOfWay = kilometers / this.maxSpeed;
        let hoursOfWay = Math.trunc(timeOfWay);
        let minutesOfWay = Math.round((timeOfWay - hoursOfWay)*60);

        alert(`${hoursOfWay}h ${minutesOfWay}m at the speed ${this.maxSpeed}km to reach this distance`);

        let fuelForWay = (kilometers * this.fuelConsumption)/100;
        let amountOfRefuel = Math.ceil((fuelForWay - fuel) / this.fuelCapacity);

        alert(`You need to refuel ${amountOfRefuel} times`);
    }
}

class Audi extends Car{
    constructor(...options){
        super(...options);
        this.allWhelDrive = options[7];
    }

    toBuzz(value){
        if(value){
            alert(`beep-beep`);
        }
    }
}

class Skoda extends Car{
    constructor(...options){
        super(...options);
        this.allRoundCamera = options[7];
    }

    turnOnCamera(parking){
        if(parking && this.allRoundCamera){
            alert('the camera is on');
        }
    }
} 

class Porsche extends Car{
    constructor(...options){
        super(...options);
        this.sunroof = options[7];
    }

    closeSunroof(isRaining){
        if(isRaining && this.sunroof){
            this.closedSunroof = true;
            alert(`sunroof is closed`);
        }
    }
}

const audiA6 = new Audi(`audi`, `a6`, 2012, `black`, 240, 75, 8, true);
const skodaKodiaq = new Skoda(`skoda`, `kodiaq`, 2019, `grey`, 132, 60, 7.6, true);
const porsche718 = new Porsche(`porsche`, `718`, 2018, 'green', 293, 64, 11, true);