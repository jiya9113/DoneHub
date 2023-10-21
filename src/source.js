const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchInput = document.getElementById('searchInput');
const taskList = document.getElementById('taskList');
const categorySelect = document.getElementById('categorySelect');
const taskDescription = document.getElementById('taskDescription');
const logIn = document.getElementById('log-in');
const cross = document.getElementById('close');
const logBtn = document.getElementById('log-btn');
const uname = document.getElementById('uname');
const psw = document.getElementById('psw');
const bars = document.getElementById('bars');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let userInfo = localStorage.getItem('user');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const div = document.createElement('div');

        div.innerHTML = ` <p class="task-name ${task.completed ? 'complete' : ''}">${task.name}</p>
          <p class="due-date">${task.dueDate}</p>
          <p class="category">${task.category}</p>
          <p class="description">${task.description}</p>
          <button  class="editbtn"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="deletebtn"><i class="fa-solid fa-trash"></i></button>
          <br/>
          <button class="completebtn">${task.completed ? 'Mark as Incomplete <i class="fa-solid fa-circle-xmark fa-xl"></i>' : ' Mark as Completed <i class="fa-solid fa-square-check fa-xl"></i>'}</button>`;

        // if (task.completed) {
        //     li.classList.add('complete');
        // }
        div.classList.add('fade-in')
        
        const editBtn = div.querySelector('.editbtn');
        const deleteBtn = div.querySelector('.deletebtn');
        const completeBtn = div.querySelector('.completebtn');
        editBtn.addEventListener('click', () => editTask(index));
        deleteBtn.addEventListener('click', () => deleteTask(index));
        completeBtn.addEventListener('click', () => toggleComplete(index));
        taskList.appendChild(div);
    });
}

function addTask() {
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const category = categorySelect.value;
    const description = taskDescription.value.trim();

    if (taskName === '' || dueDate === '') return;

    tasks.push({ name: taskName, dueDate: dueDate, category: category, description: description, completed: false});
    saveTasks();

    sortTasksByDueDate();
    renderTasks();

    taskInput.value = '';
    dueDateInput.value = '';
    taskDescription.value ='';
}


function editTask(index) {
    // const newTaskName = prompt('Edit task:', tasks[index].name);
    // if (newTaskName !== null) {
    //     tasks[index].name = newTaskName;
    //     saveTasks();
    //     renderTasks();
    // }
    taskInput.value=tasks[index].name;
    dueDateInput.value=tasks[index].dueDate;
    categorySelect.value=tasks[index].category;
    taskDescription.value=tasks[index].description;
    deleteTask(index);
}

function deleteTask(index) {
    const DivToDelete = taskList.children[index];
    DivToDelete.classList.remove('fade-in');
    DivToDelete.classList.add('fade-out');
    DivToDelete.addEventListener('animationend', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });
    // tasks.splice(index, 1);
    // saveTasks();
    // renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchText));
    renderTasks(filteredTasks);
}

function sortTasksByDueDate() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    saveTasks();
}

addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);

renderTasks();

//clock
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;
}

//log-in
logIn.addEventListener('click',()=>{
    document.getElementById('log-back').style.display='block';
})

cross.addEventListener('click',()=>{
    document.getElementById('log-back').style.display='none';
})

logBtn.addEventListener('click',()=>{
    let n=uname.value.trim();
    userInfo=n;
    localStorage.setItem('user',userInfo);
    uname.value='';
    psw.value='';
    document.getElementById('log-back').style.display='none';
    displayUser();
})

function displayUser(){
    if(userInfo!=null){
        logIn.innerHTML=`Hello, ${userInfo}`;
    }
}

bars.addEventListener('click',()=>{
    var x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
})

displayUser();
updateTime();
setInterval(updateTime, 1000);
