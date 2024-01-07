//tasks class
class TaskManager {
  constructor(taskValue, dateValue, timeValue) {
    this.taskName = taskValue;
    this.taskDate = dateValue;
    this.taskTime = timeValue;
  }

  //methods
  //save TASKS
  static saveTasks(taskList) {
    localStorage.setItem("oldTasks", JSON.stringify(taskList));
  }

  static loadTasks() {
    return JSON.parse(localStorage.getItem("oldTasks")) || [];
  }

  //Format date
  static niceDate(taskDate) {
    var newDate = taskDate.split("-");
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }

  //delite specific task
  static deleteTask = (event, index) => {
    const storedTasks = TaskManager.loadTasks();
    // Find the parent task container
    const taskContainer = event.target.closest(".sticky-note");
    if (taskContainer && index < storedTasks.length) {
      taskContainer.remove();
      storedTasks.splice(index, 1);
      // Update local storage
      TaskManager.saveTasks(storedTasks);
    }
  };
}

const displayTasks = (taskList) => {
  const taskDiv = document.getElementById("myTasks");
  //can be for each loop insted?
  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index];
    const taskItem = document.createElement("div");

    //taskItem.classList.remove("fade-in-animation");

    taskItem.classList.add("sticky-note", "col-md-2");

    taskItem.innerHTML = `
  <div class="task-header">
  <button class=" delete-button" aria-hidden="true" 
  onclick="TaskManager.deleteTask(event, ${index})"><i class="fa fa-window-close" aria-hidden="true"></i>
  </button>
  </div>
  <div class="task-content">
  ${task.taskName}
  <br />
  </div>
  <div class="task-time">
  <strong>${TaskManager.niceDate(task.taskDate)}<br />
  ${task.taskTime}</strong></div>`;

    //adding fade-in-animation only to the last task item
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

  //CHECK LOGIC if date passedd!
  // Combine date and time into a single string in 'YYYY-MM-DD HH:MM' format
  const dateTimeString = dateValue + " " + timeValue;
  const combinedDateTime = new Date(dateTimeString);

  // CHECK LOGIC if date and time passed!
  if (combinedDateTime.getTime() < new Date().getTime()) {
    alert("oh nooo! you are too late");
    return;
  }

  //taskItem creation
  const newTask = new TaskManager(taskValue, dateValue, timeValue);
  // Fetch tasks
  const taskList = TaskManager.loadTasks();
  //saving tasks
  taskList.push(newTask);
  TaskManager.saveTasks(taskList);

  // console.log(taskList)

  displayTasks(taskList);

  //reset form
  document.getElementById("myForm").reset();
};

// reset tasks from localstorege and clean my board reset button
const resetTasks = () => {
  //removing local storege
  localStorage.removeItem("oldTasks");
  //reset board
  const taskDiv = document.getElementById("myTasks");
  taskDiv.innerHTML = "";
};

// Load tasks from local storage on page load
displayTasks(TaskManager.loadTasks());
