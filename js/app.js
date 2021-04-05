// Define the UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All event listeners
loadEventListeners();

//Method to load event listener
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask)
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
        link.innerHTML = '<i class"fa fa-remove"></i>'

        //append link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
    }

    e.preventDefault();
}