class Storage {
    constructor() {
        this.drinkStorage = {};
    }

    addValue(key, value) {
        this.drinkStorage[key] = value;
    }

    getValue(key) {
        return this.drinkStorage[key];
    }

    deleteValue(key) {
        let hasKey = false;
        if (this.drinkStorage[key]) {
            delete this.drinkStorage[key];
            hasKey = true;
        } else {
            hasKey = false;
        }
        return hasKey;
    }
    
    getKeys() {
        return Object.keys(this.drinkStorage);
    }

    reset() {
        this.drinkStorage = {};
    }
}


let nameOfDrinks = new Storage();
nameOfDrinks.addValue('beer', 'Pit');
nameOfDrinks.addValue('vino', 'shato');
nameOfDrinks.addValue('wiskey', 'red label');
let newDrinkForm = document.querySelector('#new-drink--form');
let hasDrinkForm = document.querySelector('#has-drink--form');
let deleteDrinkForm = document.querySelector('#delete-drink--form');
let addNewDrink = document.querySelector('#new-drink');
let addNameOfDrink = document.querySelector('#name-drink');
let hasDrink = document.querySelector('#has-drink');
let deleteDrink = document.querySelector('#delete-drink');
let showDrinks = document.querySelector('.show-drinks');
let errorAddingDrinks = document.createElement('p');
let isShow = false;
errorAddingDrinks.classList.add('without-drinks');


newDrinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (addNewDrink.value !== '' && addNameOfDrink.value !== '') {
        nameOfDrinks.addValue(addNewDrink.value, addNameOfDrink.value);
        addNewDrink.value = '';
        addNameOfDrink.value = '';
        if (document.querySelector('.without-drinks')) {
            document.querySelector('.without-drinks').innerHTML = 'drink added';
        } 
        console.log(nameOfDrinks.drinkStorage);
    } else {
        addNewDrink.value = '';
        addNameOfDrink.value = '';
        errorAddingDrinks.innerHTML = 'fill out the form';
        newDrinkForm.append(errorAddingDrinks);
    }
});


hasDrinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let messageAboutDrink = document.createElement('p');
    messageAboutDrink.classList.add('exist-drink');
    hasDrinkForm.append(messageAboutDrink);
    if (nameOfDrinks.getValue(hasDrink.value)) {
        document.querySelector('.exist-drink').innerHTML = nameOfDrinks.getValue(hasDrink.value);
        hasDrink.value = '';
    } else {
        document.querySelector('.exist-drink').innerHTML = "drink doesn't exist";
        hasDrink.value = '';
    }
});


deleteDrinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let messageDeleteDrink = document.createElement('p');
    messageDeleteDrink.classList.add('delete-drink');
    deleteDrinkForm.append(messageDeleteDrink);
    if (nameOfDrinks.deleteValue(deleteDrink.value) === true) {
        document.querySelector('.delete-drink').innerHTML = 'drink deleted';
        nameOfDrinks.deleteValue(deleteDrink.value);
        deleteDrink.value = '';
    } else {
        document.querySelector('.delete-drink').innerHTML = "drink doesn't exist";
        deleteDrink.value = '';
    }
});


showDrinks.addEventListener('click', (e) => {
    e.preventDefault();
    let allDrinks = document.createElement('ul');
    allDrinks.classList.add('list-drinks');
    if (!isShow) {
        let allKeysOfDrink = nameOfDrinks.getKeys();
        for (let item of allKeysOfDrink) {
            let oneDrink = document.createElement('li');
            oneDrink.innerHTML = item;
            console.log(item)
            allDrinks.append(oneDrink);
        }
        isShow = true;
        document.querySelector('.show__drink--block').append(allDrinks);
    } else {
        document.querySelector('.list-drinks').remove();
        isShow = false;
    }
});