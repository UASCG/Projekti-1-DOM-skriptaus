// Initalizes variables and array.
var liAll = document.getElementsByTagName("LI");
var ulList = document.querySelector("UL");
const taskArray = [];
let text; // Used for handling messages to user.
let loadingText; // Used for letting user know if data was loaded from localStorage.
var input = document.getElementById("taskInput");

// Load tasks from localStorage.
window.onload = loadTasks()

function loadTasks() {
    // Reads data from local storage and creates list items upon page load.
    myTasks = JSON.parse(localStorage.getItem("myTasks"));

    if (myTasks != null) { // Checks if data exists in local storage, i.e. key is not null.
        console.log("Found " + myTasks.length + " saved tasks.")
        loadingText = "Tallennettuja tehtäviä löytyi " + myTasks.length + " kappaletta.";
        for (let i = 0; i < myTasks.length; i++) {
            console.log("myTasks: " + myTasks[i]);

            // Creates new task from localStorage.
            newTask(myTasks[i]);

            // Creates "delete" button to newly added entry.
            deleteTask(myTasks[i]);
        }
    } else {
        loadingText = "Tallennettuja tehtäviä ei löytynyt.";
        console.log("No saved tasks found.")
    }
    document.getElementById("loadTaskMessage").innerHTML = loadingText;
}

function newTaskInput(inputValue) { // Used for checking user inputs for illegal ;-characters before adding tasks.
    if (inputValue.includes(";")) {
        text = "Laiton merkki! ;-merkki ei ole sallittu!";
        input.style.backgroundColor = "lightsalmon";
        input.style.outline = "thick solid red";
        document.getElementById("addTaskMessage").innerHTML = text;
    } else {
        newTask(inputValue);
    } 
}

// Creates a new task item in the list when clicking "Lisää".
function newTask(inputValue) {
    savedClassName = inputValue.split(";")[1];
    inputValue = inputValue.split(";")[0];
    console.log("inputValue after split: " + inputValue)
    console.log("savedClassName after split: " + savedClassName)

    input.style.backgroundColor = "white";
    input.style.outline = "none";
    if (inputValue.length < 1) { // Checks if input is less than 1 character in length, not allowed if true.
        text = "Liian lyhyt! Sallittu minimipituus: 1. Merkkijonosi: " + inputValue.length;
        input.style.backgroundColor = "lightsalmon";
        input.style.outline = "thick solid red";
    } else if (inputValue.length > 100) { // Checks if input is more than 50 characters in length, not allowed if true.
        text = "Liian pitkä! Sallittu maksimipituus: 100. Merkkijonosi: " + inputValue.length;
        input.style.backgroundColor = "lightsalmon";
        input.style.outline = "thick solid red";
    } else { // Adds acceptable task to list.
        var li = document.createElement("li");

        li.className;
        if (savedClassName == "checked") { // Used to check if saved data contains "checked" entries.
            li.className = "checked";
        }

        var textNode = document.createTextNode(inputValue);
        li.appendChild(textNode);
        document.getElementById("taskList").appendChild(li);

        // Creates "delete" button to newly added entry.
        deleteTask(inputValue);

        taskArray.push(inputValue + ";" + li.className); // Adds task to task array.
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

    // Click on a close button to delete the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var itemToDelete = this.parentElement.textContent; // Finds the actual text of the task in the parent element's text content.
            var itemClassName = this.parentElement.className; // Finds task's classname.
            itemToDelete = itemToDelete.replace(/\u00D7/gi, '') // Finds all x signs (xSign) in string and deletes them using regex.
            itemToDelete = itemToDelete.concat(";" + itemClassName); // Adds task's classname so that the combination can be found from the array.
            index = taskArray.indexOf(itemToDelete);
            console.log("Item to be deleted (index): " + itemToDelete + "(" + index + ")");
            if (index > -1) { // only splice array when item is found
                taskArray.splice(index, 1); // 2nd parameter means remove one item only
            }
            localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".
            var div = this.parentElement;
            div.remove();
        }
    }
}

// Adds a "checked" symbol when clicking on a list item.
ulList.addEventListener("click", function (event) { // Listens for click events.
    if (event.target.tagName === "LI") { // Checks if <li> item is being clicked.

        var itemToCheck = event.target.textContent; // Finds the actual text of the task in the target element's text content.
        var itemClassName = event.target.className; // Finds task's classname.
        itemToCheck = itemToCheck.replace(/\u00D7/gi, '') // Finds all x signs (xSign) in string and deletes them using regex.
        console.log("itemToCheck + itemClassName: " + itemToCheck + itemClassName);
        index = taskArray.indexOf(itemToCheck + ";" + itemClassName);
        console.log("Item to be checked (index): " + itemToCheck.split(";")[0] + "(" + index + ")");

        if (index > -1) { // only modify array when item is found
            event.target.classList.toggle('checked'); // Toggles checkmark on <li> item.
            var itemClassName = event.target.className; // Finds new classname.
            taskArray[index] = itemToCheck + ";" + itemClassName; // Updates array with new classname.
        }

        localStorage.setItem("myTasks", JSON.stringify(taskArray)); // Stringifies and saves updated tasks into local storage under key "myTasks".

    }
}, false);

function clearStorage() { // Clears local storage when button is pressed.
    localStorage.clear();
    location.reload();
    console.log("Cleared local storage!")
}