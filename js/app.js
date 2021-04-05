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
    form.addEventListener('submit', addTask);
    //Remove TaskEvent
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter task event
    filter.addEventListener('keyup', filterTasks);
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

        //append li to ul
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
    }

    e.preventDefault();
}


//Method to remove single task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure that you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Method to remove all tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

// Method to filter task 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    const filter = document.querySelectorAll('.collection-item');

    filter.forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        }else {
            task.style.display = 'none'
        }
    })
}