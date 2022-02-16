const addbutton = document.getElementById('add_task');
const donebutton = document.querySelector('.btn btn-sm btn-outline-danger done');
const addinput = document.getElementById('task_description_input');
const duedate = document.getElementById('duedate_input');
const duetime = document.getElementById('duetime_input');
const ul = document.querySelector('ul');

function addTask(description,dueTime){
    var ul = document.getElementById("task_list");
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(description));

    
    if (dueTime){
        var due = document.createElement('span');
        var date = new Date(dueTime);
        due.innerHTML = "due" + (date.getMonth()+1 ) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        due.setAttribute('class','due');
        li.appendChild(due)
    }

    var button = document.createElement("button");
    button.innerHTML = "Done"; 
    button.setAttribute("class","btn btn-sm btn-outline-danger done");

    li.appendChild(button);
    ul.prepend(li);
}


function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

addbutton.addEventListener('click',() => {
    addTask(addinput.value, dateAndTimeToTimestamp(duedate, duetime));
    addinput.value = '';
    duedate.value = '';
    duetime.value = '';
})

addinput.addEventListener('keydown',(event) => {
    if (event.key === 'Enter'){
    addTask(addinput.value, dateAndTimeToTimestamp(duedate, duetime));
    addinput.value = '';
    duedate.value = '';
    duetime.value = '';
    }
})

ul.addEventListener('click',(event)=>{
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.className === 'btn btn-sm btn-outline-danger done'){
        ul.removeChild(li);
    }
})
