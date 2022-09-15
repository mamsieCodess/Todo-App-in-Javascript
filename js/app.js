//selectors

const form = document.querySelector('.inputs form');
const taskName = document.getElementById('nameInput');
const msg = document.getElementById('error-msg');
const dueDate = document.getElementById('dateInput');
const submit = document.querySelector('.inputs form #add1');
const tasksList = document.querySelector('.tasksList');

//created varaiables
let todos = [] //for function saveTask

//Submit button functionality

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    saveTask(); //when the submit button is clicked, a todo is saved
    renderTask(); //after saving a task, it must be displayed on the DOM
})

//Saving a new task
function saveTask(){ //each task is saved in an array called todoList
    const todoValue1 = taskName.value;
    const todoValue2 = dueDate.value;

    //to check for an empty taskName submission
    const emptyField = todoValue1 === '';

    //checking for a duplicate task

    const duplicatedEntry = todos.some((todo)=> todo.value1.toUpperCase() === todoValue1.toUpperCase()); //if the value the user is trying to enter is the same one as the one saved in the object


    if(emptyField){ 
        msg.style.visibility = 'visible' //make error message visible
    }
    else if(duplicatedEntry){
        msg.innerText = 'OOPS! Such a task already exists.'
        msg.style.visibility = 'visible';
    }
    else
    { //if the field is not then save a new task to the array

        todos.push({ //saving(pushing) a new created task in an object(todo) called todos (array)
            value1 : todoValue1,
            value2 :todoValue2,
        });

        msg.style.visibility = 'hidden'
    }

        taskName.value = ''; //clears the field to be empty after submitting
        dueDate.value = '' //clears the field to be empty after submitting
 
    }



//to give a created task to the DOM and display it
function renderTask(){
    //clear the DOM before rendering to avaoid duplication
    tasksList.innerHTML = '';
    //then render the crteaed tasks
    todos.forEach((todo,index)=>{ //loop over the array and for each created task, create it in the following structure and attach it to the tasks div
        tasksList.innerHTML += ` 
        <div class="newTask id='${index}' ">
          <span id="dueDate">${todo.value2}</span>
          <p id="taskName">${todo.value1}</p>

          <div class="options">
            <span><i onclick='completedTask(this)' class="fa-regular fa-circle"></i></span>
            <span><i onClick= 'editTask(this)'  class="fa-sharp fa-solid fa-pen-to-square completeButton" data-action="edit"></i></span>
            <span><i onClick ='deleteTask(this)' class="fa-sharp fa-solid fa-trash" data-action="delete"></i></span>
          </div>
        </div>
        `
    })
}


//edit button functionality
let editTask = (e) => {
    let selectedItem = e.parentElement.parentElement.parentElement;

    dueDate.value = selectedItem.children[0].innerHTML;
    taskName.value = selectedItem.children[1].innerHTML;
    deleteTask(e);

}
//delete button functionality

let deleteTask = (e) => {
    e.parentElement.parentElement.parentElement.remove();
    todos.splice(e.parentElement.parentElement.parentElement.id, 1);

    // re-render
  renderTask();
}

//edit buttton functionality
let completedTask = (e) =>{
    let parentItem = e.parentElement.parentElement.parentElement;
    parentItem.classList.toggle('completed');
}
///*** 