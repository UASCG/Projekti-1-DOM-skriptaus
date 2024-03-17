// Initalizes variables and array.
var liAll = document.getElementsByTagName("LI");
var ulList = document.querySelector("UL");
const taskArray = [];

// Load tasks from localStorage.
window.onload = loadTasks()

function loadTasks() {
    // Reads data from local storage and creates list items upon page load.
    myTasks = JSON.parse(localStorage.getItem("myTasks"));

    if (myTasks != null) { // Checks if data exists in local storage, i.e. key is not null.
        console.log("Found " + myTasks.length + " saved tasks.")
        for (let i = 0; i < myTasks.length; i++) {
            console.log("myTasks: " + myTasks[i]);

            // Creates new task from localStorage.
            newTask(myTasks[i]);

            // Creates "delete" button to newly added entry.
            deleteTask(myTasks[i]);
        }
    } else {
        console.log("No saved tasks found.")
    }
}

// Creates a new task item in the list when clicking "Lisää".
function newTask(inputValue) {
    let text; // Used for handling messages to user.
    var input = document.getElementById("taskInput");
    input.style.backgroundColor = "white";
    input.style.outline = "none";
    if (inputValue.length < 1) { // Checks if input is less than 1 character in length, not allowed if true.
        text = "Liian lyhyt";
        input.style.backgroundColor = "lightsalmon";
        input.style.outline = "thick solid red";
    } else if (inputValue.length > 50) { // Checks if input is more than 50 characters in length, not allowed if true.
        text = "Liian pitkä";
    } else { // Adds acceptable task to list.
        var li = document.createElement("li");
        var textNode = document.createTextNode(inputValue);
        li.appendChild(textNode);
        document.getElementById("taskList").appendChild(li);

        // Creates "delete" button to newly added entry.
        deleteTask(inputValue);

        taskArray.push(inputValue); // Adds task to task array.
        console.log("Updated taskArray: " + taskArray);

        localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves created tasks into local storage under key "myTasks".

        document.getElementById("taskInput").value = ""; // Clears input field ONLY if task is added to list successfully.
        text = "Tehtävä lisätty!";
    }
    document.getElementById("addTaskMessage").innerHTML = text;
}

// Create a "close" button and append it to each list item
function deleteTask() {
    var i;
    for (i = 0; i < liAll.length; i++) {
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      liAll[i].appendChild(span);
    }
    
    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        console.log(this.parentElement.textContent.slice(0, -2));
        console.log("taskArray:" + taskArray);
        console.log("myTasks: " + myTasks);
        var itemToDelete = this.parentElement.textContent;
        itemToDelete = itemToDelete.replace(/\u00D7/gi, '')
        console.log("Item to be deleted (index): " + itemToDelete);
        index = taskArray.indexOf(itemToDelete);
        console.log("Item to be deleted (index): " + index);
        if (index > -1) { // only splice array when item is found
            taskArray.splice(index, 1); // 2nd parameter means remove one item only
        }
        localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".
        var div = this.parentElement;
        div.remove();
      }
    }
}


/* // Creates a "delete" button and appends it to each list item.
function deleteTask(inputValue) {
    var i = inputValue;
    for (i = 0; i < liAll.length; i++) {
        var span = document.createElement("SPAN");
        var xSign = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(xSign);
        liAll[i].appendChild(span);
    }
}

var close = document.getElementsByClassName("close");
close[i].onclick = function deleteTaskButton(i) {
    var div = this.parentElement;
    const index = taskArray.indexOf(i);
    if (index > -1) { // only splice array when item is found
        taskArray.splice(index, 1); // 2nd parameter means remove one item only
    }
    div.remove();
    localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".
}

// Clicking on a "delete" button deletes the list item. */


// Adds a "checked" symbol when clicking on a list item.
ulList.addEventListener("click", function (event) { // Listens for click events.
    if (event.target.tagName === "LI") { // Checks if <li> item is being clicked.
        event.target.classList.toggle('checked'); // Toggles checkmark on <li> item.
    }
}, false);

function clearStorage() { // Clears local storage when button is pressed.
    localStorage.clear();
    location.reload();
    console.log("Cleared local storage!")
}