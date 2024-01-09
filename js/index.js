//tasks class
class TaskManager {
  constructor(taskName, taskDate, taskTime) {
    this.taskName = taskName;
    this.taskDate = taskDate;
    this.taskTime = taskTime;
  }
  //methods
  //local storege
  static saveTasks(taskList) {
    localStorage.setItem("oldTasks", JSON.stringify(taskList));
  }

  static loadTasks() {
    return JSON.parse(localStorage.getItem("oldTasks")) || [];
  }

  //Format date
  static formatDate(taskDate) {
    var newDate = taskDate.split("-");
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }

  //remove one task
  static deleteTask = (event, index) => {
    const storedTasks = this.loadTasks();
    // Find the parent task container
    const taskContainer = event.target.closest(".sticky-note");
    if (taskContainer) {
      taskContainer.remove();
      //remove from storege
      storedTasks.splice(index, 1);
      this.saveTasks(storedTasks);
    }
  };
}

const displayTasks = (taskList) => {
  const taskDiv = document.getElementById("myTasks");
  // Clear existing tasks clearing table so no dubels hapen
  taskDiv.innerHTML = "";
  //can be for each loop insted?
  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index];
    const taskItem = document.createElement("div");
    taskItem.classList.add("sticky-note", "col-md-2");

    taskItem.innerHTML = `
  <div class="task-header">
  <button class=" delete-button" aria-hidden="true" 
  onclick="TaskManager.deleteTask(event, ${index})"><i class="fa fa-window-close" aria-hidden="true"></i>
  </button>
  </div>
  <div class="overflow-auto task-content">
  ${task.taskName}
  <br />
  </div>
  <div class="task-time">
  <strong>${TaskManager.formatDate(task.taskDate)}<br />
  ${task.taskTime}</strong></div>`;
    // adding fade-in-animation -only to the last task item-
    if (index === taskList.length - 1) {
      taskItem.classList.add("fade-in-animation");
    }
    //append chiled from the left
    taskDiv.prepend(taskItem);
  }
};

//handle task submission-getting values
const setTask = () => {
  const taskValue = document.getElementById("taskName").value;
  const dateValue = document.getElementById("taskDate").value;
  const timeValue = document.getElementById("taskTime").value;
  
  //DATE & TIME=LOGIC CHECKS
  const combinedDateTime = new Date(`${dateValue} ${timeValue}`);
  if (combinedDateTime < new Date().getTime()) {
    alert("oh nooo! you are too late");
    return;
  }
  //creat task
  const newTask = new TaskManager(taskValue, dateValue, timeValue);
  const taskList = TaskManager.loadTasks() || [];
  taskList.push(newTask);
  TaskManager.saveTasks(taskList);
  displayTasks(taskList);
  //reset form
  document.getElementById("myForm").reset();
};

//reset button= remove tasks from localstorege and clean my board
const resetTasks = () => {
  localStorage.removeItem("oldTasks");
  displayTasks(TaskManager.loadTasks());
};

// Load tasks from local storage on page load
displayTasks(TaskManager.loadTasks());
