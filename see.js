
/* <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Task Manager</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Task Manager</h1>
    <form id="taskForm">
      <input type="text" id="taskDescription" placeholder="Task Description" required>
      <input type="date" id="taskDate" required>
      <input type="time" id="taskTime" required>
      <button type="submit">Add Task</button>
      <button type="button" id="clearTasks">Clear All Tasks</button>
    </form>
    <div id="taskList"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>


 */
//=====================================
class TaskManager {
  constructor() {
    this.taskForm = document.getElementById('taskForm');
    this.taskList = document.getElementById('taskList');
    this.clearTasksBtn = document.getElementById('clearTasks');
    this.loadTasksFromLocalStorage();
    this.bindEvents();
  }

  bindEvents() {
    this.taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const taskDescription = document.getElementById('taskDescription').value;
      const taskDate = document.getElementById('taskDate').value;
      const taskTime = document.getElementById('taskTime').value;

      if (taskDescription && taskDate && taskTime) {
        const task = {
          description: taskDescription,
          date: taskDate,
          time: taskTime
        };

        this.addTask(task);
        this.saveTasksToLocalStorage();
        this.taskForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });

    this.clearTasksBtn.addEventListener('click', () => {
      this.clearTasks();
    });

    this.taskList.addEventListener('click', e => {
      if (e.target.classList.contains('delete-btn')) {
        const taskItem = e.target.parentElement;
        taskItem.remove();
        this.saveTasksToLocalStorage();
      }
    });
  }

  addTask(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <p>${task.description}</p>
      <p>Date: ${task.date}</p>
      <p>Time: ${task.time}</p>
      <button class="delete-btn">Delete</button>
    `;
    this.taskList.appendChild(taskItem);
  }

  clearTasks() {
    this.taskList.innerHTML = '';
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    const tasks = this.taskList.querySelectorAll('.task-item');
    const taskArray = Array.from(tasks).map(task => {
      const description = task.querySelector('p').textContent;
      const date = task.querySelector('p:nth-child(2)').textContent.split(': ')[1];
      const time = task.querySelector('p:nth-child(3)').textContent.split(': ')[1];
      return { description, date, time };
    });
    localStorage.setItem('tasks', JSON.stringify(taskArray));
  }

  loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      tasks.forEach(task => {
        this.addTask(task);
      });
    }
  }
}

const taskManager = new TaskManager();



//========================================
// Retrieve tasks from local storage or initialize an empty array
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Class to manage tasks
class TaskManager {
  constructor(name, date, time) {
    this.taskName = name;
    this.taskDate = date;
    this.taskTime = time;
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  addTask() {
    const taskListContainer = document.getElementById("taskList");

    // Create a task note element
    const taskNote = document.createElement("div");
    taskNote.classList.add("task-note");

    // Construct the task note content using the task details
    taskNote.innerHTML = `
      <p><strong>${this.taskName}</strong></p>
      <p>Date: ${this.taskDate}</p>
      <p>Time: ${this.taskTime}</p>
      <button class="delete-button">Delete</button>
    `;

    // Append the task note to the task list container
    taskListContainer.appendChild(taskNote);

    // Attach event listener to delete button
    const deleteButton = taskNote.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      // Call the deleteTask method passing the taskNote element
      this.deleteTask(taskNote);
    });
  }

  deleteTask(taskNoteElement) {
    // Implement logic to delete the task note element from the UI and local storage
    // Remove the taskNoteElement from the UI
    taskNoteElement.remove();

    // Find the task in the taskList array and remove it
    const index = taskList.findIndex(task => task.taskName === this.taskName && task.taskDate === this.taskDate && task.taskTime === this.taskTime);
    if (index !== -1) {
      taskList.splice(index, 1);
      this.saveTasks();
    }
}
}
// Function to handle form submission
function getTask() {
  // Retrieve input values
  const taskName = document.getElementById("taskName").value;
  const taskDate = document.getElementById("taskDate").value;
  const taskTime = document.getElementById("taskTime").value;

  // Create a new task
  const newTask = new TaskManager(taskName, taskDate, taskTime);

  // Add the task to the list
  taskList.push(newTask);
  newTask.saveTasks();
  newTask.addTask();

  // Reset the form
  document.getElementById("myForm").reset();
}







//=================================

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const clearTasksBtn = document.getElementById('clearTasks');
  
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskDescription = document.getElementById('taskDescription').value;
      const taskDate = document.getElementById('taskDate').value;
      const taskTime = document.getElementById('taskTime').value;
  
      if (taskDescription && taskDate && taskTime) {
        const task = {
          description: taskDescription,
          date: taskDate,
          time: taskTime
        };
  
        addTask(task);
        saveTasksToLocalStorage();
        taskForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  
    clearTasksBtn.addEventListener('click', function() {
      localStorage.removeItem('tasks');
      taskList.innerHTML = '';
    });
  
    function addTask(task) {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
        <p>${task.description}</p>
        <p>Date: ${task.date}</p>
        <p>Time: ${task.time}</p>
        <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(taskItem);
  
      const deleteBtn = taskItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function() {
        taskItem.remove();
        saveTasksToLocalStorage();
      });
    }
  
    function saveTasksToLocalStorage() {
      const tasks = document.querySelectorAll('.task-item');
      const taskArray = [];
      tasks.forEach(task => {
        const description = task.querySelector('p').textContent;
        const date = task.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const time = task.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        taskArray.push({ description, date, time });
      });
      localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
  
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        tasks.forEach(task => {
          addTask(task);
        });
      }
    }
  
    loadTasksFromLocalStorage();
  });