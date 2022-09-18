//selectors

const form = document.querySelector('.inputs form');
const taskName = document.getElementById('nameInput');
const msg = document.getElementById('error-msg');
const dueDate = document.getElementById('dateInput');
const submit = document.querySelector('.inputs form #add1');
const tasksList = document.querySelector('.tasksList');

//Submit button functionality

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formValidation();
})

function formValidation(){ //to ensure that an input is inserted before creating a task
    const emptyField = taskName.value === '';
    if(emptyField){
        msg.style.visibility = 'visible' //make error message visible
    }
    else{
        msg.style.visibility = 'hidden'
        saveTask();   
    }
}
//stores created tasks
let todos = [] //for function saveTask


//Saving a new task
function saveTask(){
    todos.push({ //saving(pushing) a new created task in array
        name : taskName.value,
        date :dueDate.value,
    });
    
localStorage.setItem("todos", JSON.stringify(todos)); //after saving in array, set it in the local storage
renderTask(); //then display it
  
};
    
//to give a created task to the DOM and display it
function renderTask(){

    //clear the DOM before rendering to avoid duplication
    tasksList.innerHTML = '';
    //then render the crteaed tasks
    todos.map((x, y) => { //create it in the following structure and attach it to the tasks div
       return (tasksList.innerHTML += `
       
       <div class="newTask id='${y}' ">
         <span id="dueDate">${x.date}</span>
         <p id="taskName">${x.name}</p>

         <div class="options">
           <span><i onclick='completedTask(this)' class="fa-regular fa-circle"></i></span>
           <span><i onclick= 'editTask(this)' class="fa-sharp fa-solid fa-pen-to-square completeButton" data-action="edit"></i></span>
           <span><i onclick ='deleteTask(this)' class="fa-sharp fa-solid fa-trash" data-action="delete"></i></span>
         </div>
       </div> `
       );   
    });

    taskName.value = ''; //clears the field to be empty after submitting
    dueDate.value = '' //clears the field to be empty after submitting

};

//delete button functionality
function deleteTask(e) {
    e.parentElement.parentElement.parentElement.remove(); //remove the whole div
    todos.splice(e.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

//edit button functionality
function editTask(e) { 
    let targettedParent = e.parentElement.parentElement.parentElement;
    dueDate.value = targettedParent.children[0].innerHTML;
    taskName.value = targettedParent.children[1].innerHTML;
};

//completed buttton functionality
function completedTask(e){
    let parentItem = e.parentElement.parentElement.parentElement;
    parentItem.classList.toggle('completed');
    console.log('completed');
}

(() => { 
   todos = JSON.parse(localStorage.getItem("todos")) || []
    console.log(todos);
    renderTask();
  })();