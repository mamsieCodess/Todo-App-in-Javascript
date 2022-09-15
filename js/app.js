//selectors

const form = document.querySelector('.inputs form');
const taskName = document.getElementById('nameInput');
const msg = document.getElementById('error-msg');
const dueDate = document.getElementById('dateInput');
const submit = document.querySelector('.inputs form #add1');
const tasks = document.querySelector('.tasks');

//created varaiables
let todos = [] //for function saveTask

//Submit button functionality

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    saveTask(); //when the submit button is clicked, a todo is saved
   
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
        alert('Field is empty')
    }
    else if(duplicatedEntry){
        alert('Task exists')
    }
    else
    { //if the field is not then save a new task to the array

        todos.push({ //saving(pushing) a new created task in an object(todo) called todos (array)
            value1 : todoValue1,
            value2 :todoValue2,
            checked: false //the todo is false for the first time it is created
        });
        taskName.value = ''; //clears the field to be empty after submitting
        dueDate.value = '' //clears the field to be empty after submitting
    }
}


