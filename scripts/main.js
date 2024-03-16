// Initalizes variables and array.
var liAll = document.getElementsByTagName("LI");
var ulList = document.querySelector("UL");
const taskArray = [];

// Creates a "delete" button and appends it to each list item.
var i;
for (i = 0; i < liAll.length; i++) {
    var span = document.createElement("SPAN");
    var xSign = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(xSign);
    liAll[i].appendChild(span);
}

// Clicking on a "delete" button deletes the list item.
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        console.log(i);
        console.log(taskArray.indexOf(i));
        console.log(myTasks.indexOf(i));
        var div = this.parentElement;
        const index = taskArray.indexOf([i]);
        if (index > -1) { // only splice array when item is found
            taskArray.splice(index, 1); // 2nd parameter means remove one item only
        }
        div.remove();
        localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".
    }
}

// Adds a "checked" symbol when clicking on a list item.
ulList.addEventListener("click", function (event) { // Listens for click events.
    if (event.target.tagName === "LI") { // Checks if <li> item is being clicked.
        event.target.classList.toggle('checked'); // Toggles checkmark on <li> item.
    }
}, false);

// Creates a new task item in the list when clicking "Lisää".
function newTask() {
    let text; // Used for handling messages to user.
    var input = document.getElementById("taskInput");
    var inputValue = document.getElementById("taskInput").value; // Takes user's input value, i.e. task.
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
        var span = document.createElement("SPAN");
        var xSign = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(xSign);
        li.appendChild(span);

        // Clicking on the "delete" button deletes the list item.
        var i;
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                console.log(i);
                console.log(taskArray.indexOf(i));
                console.log(myTasks.indexOf(i));
                var div = this.parentElement;
                const index = taskArray.indexOf([i]);
                if (index > -1) { // only splice array when item is found
                    taskArray.splice(index, 1); // 2nd parameter means remove one item only
                }
                div.remove();
                localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".
            }
        }

        taskArray.push(inputValue); // Adds task to task array.

        localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves created tasks into local storage under key "myTasks".

        document.getElementById("taskInput").value = ""; // Clears input field ONLY if task is added to list successfully.
        text = "Tehtävä lisätty!";
    }
    document.getElementById("addTaskMessage").innerHTML = text;
}

// Reads data from local storage and creates list items upon page load.
myTasks = JSON.parse(localStorage.getItem("myTasks"));

if (myTasks != null) { // Checks if data exists in local storage, i.e. key is not null.
    for (let i = 0; i < myTasks.length; i++) {
        console.log("Adding entry for \"" + myTasks[i] + "\" to taskArray...");
        taskArray.push(myTasks[i]);
        console.log(myTasks);
    }
}

if (myTasks != null) { // Checks if data exists in local storage, i.e. key is not null.
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }
}

if (myTasks != null) { // Checks if data exists in local storage, i.e. key is not null.
    console.log("Found " + myTasks.length + " saved tasks.")
    for (let i = 0; i < myTasks.length; i++) {
        console.log("Creating task entry for \"" + myTasks[i] + "\"...");

        var li = document.createElement("li");
        var textNode = document.createTextNode(myTasks[i]);
        li.appendChild(textNode);
        document.getElementById("taskList").appendChild(li);

        // Creates "delete" button to newly added entry.
        var span = document.createElement("SPAN");
        var xSign = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(xSign);
        li.appendChild(span);

        // Clicking on the "delete" button deletes the list item.
        var close = document.getElementsByClassName("close");
        console.log(i);
        console.log(myTasks[i]);
        close[i].onclick = function () {
            deleteIndex = myTasks.indexOf(myTasks[i]) - 1;
            console.log("myTasks.indexOf(myTasks[i]) = " + myTasks.indexOf(myTasks[i]))
            console.log("deleteIndex = " + deleteIndex)
            console.log(i);
            var div = this.parentElement;
            div.remove();
            taskArray.splice(taskArray[deleteIndex], 1);
            console.log("Deleting " + taskArray[deleteIndex]);
            console.log(taskArray);
            localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".
        }
    }
} else {
    console.log("No saved tasks found.")
}

function clearStorage() { // Clears local storage when button is pressed.
    localStorage.clear();
    location.reload();
    console.log("Cleared local storage!")
}