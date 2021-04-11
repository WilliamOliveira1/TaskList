// Define the UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const totalValue = document.querySelector(".total-value");
const removeTotalValue = document.querySelector(".clear-values");
const tableItemName = document.querySelector(".item-name");
const tableItemValue = document.querySelector(".item-value");
const tableItemDelete = document.querySelector(".item-delete");
const teste = document.querySelector(".teste");
const removeSingleValue = document.querySelector("#calcular");


// Load All event listeners
loadEventListeners();

//Method to load event listener
function loadEventListeners() {
    // DOM load events
    document.addEventListener('DOMContentLoaded', getTasks);
    document.addEventListener('DOMContentLoaded', getValues);
    document.addEventListener('DOMContentLoaded', getValuesFromStorage);
    // Add task event
    form.addEventListener('submit', addTask);
    //Remove TaskEvent
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Remove single value from shopping list
    removeSingleValue.addEventListener('click', removeValue);
    // Filter task event
    filter.addEventListener('keyup', filterTasks);
    // Insert value into table shop value
    removeTotalValue.addEventListener('click', removeNameAndValue);
}

// Method to load from local storage into DOM
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(task));

        //Create link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //Add icon to link
        link.innerHTML = '<i class="fas fa-minus-circle"></i>'

        //append link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    })
}

// Add task
function addTask(e) {
    //avoid to input empty string
    if (taskInput.value === '') {
        alert("Cannot input empty value");
    } else {

        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //Create link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //Add icon to link
        link.innerHTML = '<i class="fas fa-minus-circle"></i>'

        //append link to li
        li.appendChild(link);

        // Store data in LocalStorage
        storeTaskInLocalStorage(taskInput.value);

        //append li to ul
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
    }

    e.preventDefault();
}

//Method to save data in localStorage(browser)
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Method to remove single task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure that you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();
            let value = prompt("Por favor digite o valor do item", "");
            while (isNaN(value)) {
                alert("You did not enter a number.");
                value = prompt("Por favor digite o valor do item: ");
            }
            //calc value of the shopping list
            calcValues(e.path[2].innerText, value)
            // Remove single task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Method to remove single task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Method to remove all tasks
function clearTasks() {
    if (confirm('Are you sure that you want to delete all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
        // Remove all tasks from local storage
        clearTasksFromLocalStorage();
    }
}

// Method to remove all data from local storage 
function clearTasksFromLocalStorage() {
    localStorage.removeItem('tasks');
}

// Method to filter task 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    const filter = document.querySelectorAll('.collection-item');

    filter.forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}

// Create the elements of the shopping cart values first time
function calcValues(item, value) {
    //avoid to input empty string
    if (value === "" | value === null) {
        alert("Cannot input empty value");
    } else {
        //Create td name element
        const trFather = document.createElement('tr');
        // tdName.className = '';

        //Create td value element
        const tdName = document.createElement('td');
        // tdName.className = '';

        //Create td value element
        const tdValue = document.createElement('td');
        // tdName.className = '';

        //Create td delete element
        const tdDelete = document.createElement('td');
        // tdName.className = '';

        //Create text node and append to td
        tdName.appendChild(document.createTextNode(item));
        tdValue.appendChild(document.createTextNode("R$" + value));

        //Create link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //Add icon to link
        link.innerHTML = '<i class="fas fa-minus-circle"></i>'

        //append link to td
        tdDelete.appendChild(link);

        // Store data in LocalStorage
        storeNameInLocalStorage(item);
        storeValueInLocalStorage(parseFloat(value));

        //append td into tr
        trFather.appendChild(tdName);
        trFather.appendChild(tdValue);
        trFather.appendChild(tdDelete);

        totalValue.appendChild(trFather);
        getValues();
    }
}

// Method to get the values set in the local storage
function getValues() {

    let values;

    if (localStorage.getItem('values') === null) {
        values = []
        if (teste.innerText !== null) {
            teste.innerText = ""
        }else {
            teste.innerText = ""
        }
    } else {
        values = JSON.parse(localStorage.getItem('values'));
        if (teste.innerText !== null) {
            teste.innerText = "";
        }else {
            teste.innerText = "";
        }
    }
    //Total value of the shopping list
    let total = 0;
    //Index of shopping list
    let index = values.length - 1;

    //Sum the values of values data in local storage
    for (let i = 0; i <= index; i++) {
        total += values[i];
    }

    // Append the value of shopping cart in the front-end
    teste.appendChild(document.createTextNode("R$" + total));
}

// Method to clear shopping cart value list
function removeNameAndValue() {
    if (confirm('Are you sure that you want to clear the list of values?')) {
        localStorage.removeItem('names');
        localStorage.removeItem('values');
        getValues();
        getValuesFromStorage();
    }
}

//Method to save values of items in localStorage(browser)
function storeValueInLocalStorage(value) {
    let values;

    if (localStorage.getItem('values') === null) {
        values = []
    } else {
        values = JSON.parse(localStorage.getItem('values'));
    }

    values.push(value);
    localStorage.setItem('values', JSON.stringify(values));
}

//Method to save name of items in localStorage(browser)
function storeNameInLocalStorage(name) {
    let names;

    if (localStorage.getItem('names') === null) {
        names = []
    } else {
        names = JSON.parse(localStorage.getItem('names'));
    }

    names.push(name);
    localStorage.setItem('names', JSON.stringify(names));
}


// Method to load from local storage into DOM
function getValuesFromStorage() {
    let names;
    let values;
    let index;

    if (localStorage.getItem('names') === null) {
        names = []
    } else {
        names = JSON.parse(localStorage.getItem('names'));
    }

    if (localStorage.getItem('values') === null) {
        values = []
    } else {
        values = JSON.parse(localStorage.getItem('values'));
    }

    // index with the length value that in local storage
    index = values.length - 1;

    for (let i = 0; i <= index; i++) {
        //Create td name element
        const trFather = document.createElement('tr');
        // tdName.className = '';

        //Create td value element
        const tdName = document.createElement('td');
        // tdName.className = '';

        //Create td value element
        const tdValue = document.createElement('td');
        // tdName.className = '';

        //Create td delete element
        const tdDelete = document.createElement('td');
        // tdName.className = '';

        //Create text node and append to td
        tdName.appendChild(document.createTextNode(names[i]));
        tdValue.appendChild(document.createTextNode("R$" + values[i]));

        //Create link element
        const link = document.createElement('a');
        link.className = 'delete-value secondary-content';

        //Add icon to link
        link.innerHTML = '<i class="fas fa-minus-circle"></i>'

        //append link to td
        tdDelete.appendChild(link);

        //append td into tr
        trFather.appendChild(tdName);
        trFather.appendChild(tdValue);
        trFather.appendChild(tdDelete);

        totalValue.appendChild(trFather);
    }
}

// Method to remove single task from local storage
function removeSingleValueFromLocalStorage(itemName, itemValue) {
    let names;
    let values;    

    if (localStorage.getItem('names') === null) {
        names = [];
    } else {
        names = JSON.parse(localStorage.getItem('names'));
    }

    if (localStorage.getItem('values') === null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('values'));
    }

    names.forEach(function (name, index) {
        if (itemName === name) {
            names.splice(index, 1);
        }
    });

    values.forEach(function (value, index) {
        if (parseFloat(itemValue) === value) {
            values.splice(index, 1);
        }
    });

    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('values', JSON.stringify(values));
}

//Method to remove single task
function removeValue(e) {
    let fatherElement = e.target.parentElement.parentElement.parentElement;
    if (e.target.parentElement.classList.contains('delete-value')) {
        if (confirm('Are you sure that you want to delete this value?')) {
            fatherElement.remove();
            let itemsValues = fatherElement.innerText.split("R$");

            // Remove single task from local storage
            removeSingleValueFromLocalStorage(itemsValues[0], itemsValues[1]);
        }
    }
}