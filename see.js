class Task {
  constructor(name, date, time) {
    this.taskName = name;
    this.taskDate = date;
    this.taskTime = time;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      this.tasks = tasks.map(task => new Task(task.taskName, task.taskDate, task.taskTime));
    }
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();
  taskManager.loadTasks();
  renderTasks(taskManager.tasks);
});

function setTask() {
  const taskValue = document.getElementById("taskName").value;
  const dateValue = document.getElementById("taskDate").value;
  const timeValue = document.getElementById("taskTime").value;

  const newTask = new Task(taskValue, dateValue, timeValue);
  taskManager.addTask(newTask);
  renderTasks(taskManager.tasks);
}

function deleteTask(index) {
  taskManager.deleteTask(index);
  renderTasks(taskManager.tasks);
}

function renderTasks(tasks) {
  const taskDiv = document.getElementById("myTasks");
  taskDiv.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("sticky-note", "col-md-2");

    taskItem.innerHTML = `
      <div class="task-header">
        <button class="delete-button" aria-hidden="true" onclick="deleteTask(${index})">
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>
      </div>
      <div class="task-content">${task.taskName}<br /></div>
      <div class="task-time">
        <strong>${task.taskDate}/${task.taskTime}</strong>
      </div>`;
    taskDiv.appendChild(taskItem);
  });
}