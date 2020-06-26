function customFilter(callback) {
    
    const newArray = [];
    for(let i = 0; i < this.length; i++){
        if(callback(this[i], i, this)){
            newArray.push(this[i]);
        }
    }

    return newArray;
}

Array.prototype.customFilter = customFilter;
