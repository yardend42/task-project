// Load tasks from local storage on page load
///NEEDS TO BW ADDED TO CLASS
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("oldTasks")) || [];
  const animationApplied = localStorage.getItem("animationApplied");
  const runAnimation = !animationApplied; // If 'animationApplied' is not set, run the animation

  console.log(runAnimation);

  addTask(storedTasks, runAnimation);

  // if (!animationApplied) {
  //   localStorage.setItem("animationApplied", "true");
  //   console.log("animationApplied set to true");
  // }
});

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

  /*   // Save tasks to local storage
  static saveTasks(taskList) {
    try {
      localStorage.setItem("oldTasks", JSON.stringify(taskList));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  } */

  //Format date
  static niceDate(taskDate) {
    var newDate = taskDate.split("-");
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }

  //delite specific task
  static deleteTask = (event, index) => {
    // Find the parent task container
    const taskContainer = event.target.closest(".sticky-note");
    //if true
    if (taskContainer) {
      // Remove the task container
      taskContainer.remove();

      //update local storege
      const storedTasks = JSON.parse(localStorage.getItem("oldTasks"));
      if (index < storedTasks.length) {
        storedTasks.splice(index, 1);
        localStorage.setItem("oldTasks", JSON.stringify(storedTasks));
      }
    }
  };
}

// Function to reset tasks from localstorege and clean my board reset button
const resetTasks = () => {
  console.log("in resetTasks");

  localStorage.removeItem("oldTasks");
  const taskDiv = document.getElementById("myTasks");
  taskDiv.innerHTML = "";
};

// Function to handle task submission
const getTask = () => {
  console.log("in getTask");

  const taskValue = document.getElementById("taskName").value;
  const dateValue = document.getElementById("taskDate").value;
  const timeValue = document.getElementById("taskTime").value;

  //CHECK LOGIC if date passedd!
  if (new Date(dateValue) < new Date()) {
    alert("oh nooo! you are too late");
    return;
  }
  //taskItem creation
  const newTask = new TaskManager(taskValue, dateValue, timeValue);
  var taskList = JSON.parse(localStorage.getItem("oldTasks")) || [];

  taskList.push(newTask);
  TaskManager.saveTasks(taskList);
  addTask(newTask);

  // Set the flag to indicate the animation has been applied
  localStorage.setItem("animationApplied", "true");

  //reset form
  document.getElementById("myForm").reset();
};

// Add tasks to the DOM
const addTask = (taskList, runAnimation) => {
  const taskDiv = document.getElementById("myTasks");
  console.log("in addTask");

  // Create a task note element
  taskList.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("sticky-note", "col-md-3");

  

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
 

    taskDiv.appendChild(taskItem);
  });

  if (runAnimation) {
    taskItem.classList.add("fade-in-animation");
  }
};
//&times;btn btn-dark delete-button
