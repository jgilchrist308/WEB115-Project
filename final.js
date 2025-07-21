class Task {
    // Constructor
    constructor(id, name, date, priority, isImportant, isCompleted) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.isImportant = isImportant;
        this.isCompleted = isCompleted;
    }
}

// Function to create a "Task" object and populate it with data
function createTask () {
    const taskForm = document.getElementById("taskForm");
        let id = nextId++;
        let name = document.getElementById("taskName").value;
        let date = getDate()
        let priority = document.getElementById("priorityDropdown").value;
        let isImportant = document.getElementById("importantCheckbox").checked;
        let isCompleted = false
        let task = new Task(id, name, date, priority, isImportant, isCompleted);;
        // Add task to array
        tasks.push(task);
    }

// Function to display a table of tasks
function displayTasks() {
    const taskManager = document.getElementById("taskmanager");
    // Output tasks to console
    console.log(JSON.stringify(tasks));
    // Create table header
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Important</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    // Add each task as a row
    for (let i = 0; i < tasks.length; i++) {
        tableHTML += `
            <tr class="${tasks[i].isImportant ? 'important' : ''}">
                <td class="${tasks[i].isCompleted ? 'completed' : ''}">${tasks[i].id}</td>
                <td class="${tasks[i].isCompleted ? 'completed' : ''}">${tasks[i].name}</td>
                <td class="${tasks[i].isCompleted ? 'completed' : ''}">${tasks[i].date}</td>
                <td class="${tasks[i].isCompleted ? 'completed' : ''}">${tasks[i].priority}</td>
                <td class="${tasks[i].isCompleted ? 'completed' : ''}">${tasks[i].isImportant ? "Yes" : "No"}</td>
                <td>${tasks[i].isCompleted ? "Done" : "Incomplete"}</td>
                <td>
                    <button onclick="deleteTask(${tasks[i].id})">Delete</button>
                    <label>
                        <input 
                            type="checkbox" 
                            class="completedCheckbox" 
                            data-id="${tasks[i].id}" 
                            ${tasks[i].isCompleted ? "checked" : ""}>
                        Completed
                    </label>
                </td>
            </tr>
        `;
    }
    tableHTML += `
            </tbody>
        </table>
    `;
    // Display table
    taskManager.innerHTML = tableHTML;
    // Add event listener to completed checkbox. Runs the completeTask function when the checkbox is updated
    document.querySelectorAll(".completedCheckbox").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const taskId = parseInt(e.target.getAttribute("data-id"));
            completeTask(taskId);
        });
    });
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    // Update table
    displayTasks();
}

// Marks task as complete or incomplete when the checkbox is updated
function completeTask(id) {
    // Loop through tasks to find the one with the matching ID
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            if (tasks[i].isCompleted === false) {
                tasks[i].isCompleted = true;
            }
            else {tasks[i].isCompleted = false}
            break;
        }
    }
    // Update table
    displayTasks();}

// Function to get the current date and assemble it into a string
function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

// Main
// Create empty array
let tasks = [];
// Initialize ID
let nextId = 1;
// Create constant for the form
const taskForm = document.getElementById("taskForm");
// Event listener for submission
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    createTask();
    displayTasks();
})