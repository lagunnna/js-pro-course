function Car(name, modal, year, color, maxSpeed, fuelCapacity, fuelConsumption){
    
    this.name = name;
    this.modal = modal;
    this.year = year;
    this.color = color;
    this.maxSpeed = maxSpeed;

    if(!fuelCapacity){
        this.fuelCapacity = 60;
    }else{
        this.fuelCapacity = fuelCapacity;
    }

    if(!fuelConsumption){
        this.fuelConsumption = 10;
    }else{
        this.fuelConsumption = fuelConsumption;
    }
}

Car.prototype.getFullName = function(){
    return this.name + ` ` + this.modal;
}

Car.prototype.getAge = function(){
    var date = new Date();
    return date.getFullYear() - this.year;
}

Car.prototype.changeColor = function(newColor){

    if(this.color === newColor){
        alert('This color has already been selected');
    } else{
        this.color = newColor;
        alert(`Color changed to ` + newColor);
    }
}

Car.prototype.calculateWay = function(kilometers, fuel){

    if(fuel < 10){
        alert('u need to refuel');
    }

    var timeOfWay = kilometers / this.maxSpeed;
    var hoursOfWay = Math.trunc(timeOfWay);
    var minutesOfWay = Math.round((timeOfWay - hoursOfWay)*60);

    alert(hoursOfWay + 'h ' + minutesOfWay + 'm at the speed ' + this.maxSpeed + 'km to reach this distance');

    var fuelForWay = (kilometers * this.fuelConsumption)/100;
    var amountOfRefuel = Math.ceil((fuelForWay - fuel) / this.fuelCapacity);

    alert('You need to refuel ' + amountOfRefuel + ' times');
}

function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Audi(...options){
    Car.apply(this, options);
    this.allWhelDrive = options[8];
}

extend(Audi, Car);

Audi.prototype.toBuzz = function(value){
    if(value){
        alert(`beep-beep`);
    }
}

function Skoda(...options){
    Car.apply(this, options);
    this.allRoundCamera = options[8];
}

extend(Skoda, Car);

Skoda.prototype.turnOnCamera = function(parking){
    if(parking && this.allRoundCamera){
        alert('the camera is on');
    }
}

function Porsche(...options){
    Car.apply(this, options);
    this.sunroof = options[8];
}

extend(Porsche, Car);

Porsche.prototype.closeSunroof = function(isRaining){
    if(isRaining && this.sunroof){
        this.closedSunroof = true;
        alert(`sunroof is closed`);
    }
}

var audiA6 = new Audi(`audi`, `a6`, 2012, `black`, 240, 75, 8, true);
var skodaKodiaq = new Skoda(`skoda`, `kodiaq`, 2019, `grey`, 132, 60, 7.6, true);
var porsche718 = new Porsche(`porsche`, `718`, 2018, 'green', 293, 64, 11, true);