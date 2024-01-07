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
    const storedTasks = TaskManager.loadTasks(); // Fetch tasks
    // Find the parent task container
    const taskContainer = event.target.closest(".sticky-note");
    //if true
    if (taskContainer && index < storedTasks.length) {
      taskContainer.remove();
      storedTasks.splice(index, 1);
      // Update local storage
      TaskManager.saveTasks(storedTasks);
    }
  };
}

//handle task submission
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

  
  makeTask(taskList);

  //reset form
  document.getElementById("myForm").reset();
};

// Add tasks to the DOM   1ST WAY!!
/* const addTasks = (newTasks) => {
  //console.log(newTasks);
  const taskDiv = document.getElementById("myTasks");

  // Create a task element needs to be arr
  newTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("sticky-note", "col-md-2", "fade-in-animation");

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

    //append chiled from the left
    taskDiv.prepend(taskItem);
  });
}; */

//another way for addtask
const showTask = (taskList) => {
  console.log(taskList);

  //fake loop after changing to arr
  const taskDiv = document.getElementById("myTasks");

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
  <div class="task-content">
  ${task.taskName}
  <br />
  </div>
  <div class="task-time">
  <strong>${TaskManager.niceDate(task.taskDate)}<br />
  ${task.taskTime}</strong></div>`;

// Add the "fade-in-animation" class only to the last task item
if (index === taskList.length - 1) {
  taskItem.classList.add("fade-in-animation");
}


    //append chiled from the left
    taskDiv.prepend(taskItem);
  }

  setTimeout(() => {
    const elementsToRemoveAnimation = document.querySelectorAll(".fade-in-animation");
    elementsToRemoveAnimation.forEach((element) => {
      element.classList.remove("fade-in-animation");
    });
  }, 2000);
}


// reset tasks from localstorege and clean my board reset button
const resetTasks = () => {
  //removing local storege
  localStorage.removeItem("oldTasks");

  //reset board
  const taskDiv = document.getElementById("myTasks");
  taskDiv.innerHTML = "";
};

// Load tasks from local storage on page load
showTask(TaskManager.loadTasks());
