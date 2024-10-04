let todoList = [];
let editingTaskId = null;

document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoTable = document.getElementById("todo-table");
    const todoListElement = document.getElementById("todo-list");
    const addBtn = document.getElementById("add-btn");
    const updateBtn = document.getElementById("update-btn");

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (editingTaskId === null) {
            const date = document.getElementById("date").value;
            const task = document.getElementById("task").value;
            addTask(date, task);
        } else {
            const date = document.getElementById("date").value;
            const task = document.getElementById("task").value;
            updateTask(editingTaskId, date, task);
            editingTaskId = null;
        }
        todoForm.reset();
        addBtn.style.display = "block";
        updateBtn.style.display = "none";
    });

    todoTable.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            const taskId = event.target.parentNode.parentNode.id;
            if (event.target.textContent === "Delete") {
                deleteTask(taskId);
            } else if (event.target.textContent === "Edit") {
                editTask(taskId);
            }
        }
    });

    displayTasks();
});

function addTask(date, task) {
    const newTask = { id: Date.now(), date, task };
    todoList.push(newTask);
    displayTasks();
}

function deleteTask(taskId) {
    todoList = todoList.filter(task => task.id !== parseInt(taskId));
    displayTasks();
}

function editTask(taskId) {
    const task = todoList.find(task => task.id === parseInt(taskId));
    const dateInput = document.getElementById("date");
    const taskInput = document.getElementById("task");
    dateInput.value = task.date;
    taskInput.value = task.task;
    editingTaskId = taskId;
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("update-btn").style.display = "block";
}

function updateTask(taskId, date, task) {
    const taskIndex = todoList.findIndex(task => task.id === parseInt(taskId));
    todoList[taskIndex].date = date;
    todoList[taskIndex].task = task;
    displayTasks();
}

function displayTasks() {
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = "";

    todoList.forEach(task => {
        let formattedDate = "Invalid Date"; // Default in case the date is invalid

        // Try to convert the task date to a JavaScript Date object
        const dateObj = new Date(task.date);
        
        // Check if the dateObj is a valid date
        if (!isNaN(dateObj)) {
            // Format the date to MM/DD/YYYY
            formattedDate = ("0" + (dateObj.getMonth() + 1)).slice(-2) + "/" + 
                            ("0" + dateObj.getDate()).slice(-2) + "/" + 
                            dateObj.getFullYear();
        }
        
        const taskRow = document.createElement("tr");
        taskRow.id = task.id;
        taskRow.innerHTML = `
            <td>${formattedDate}</td>
            <td>${task.task}</td>
            <td class="action-btns">
                <button>Delete</button>
                <button>Edit</button>
            </td>
        `;
        todoListElement.appendChild(taskRow);
    });
}
