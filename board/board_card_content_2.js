/**
 * This function renders and shows the color of the category of a specific task
 * 
 * @param {number} i - This is the number of each task  
 */
function renderPopupCategoryColor(i) {
    let content = document.getElementById(`popupCategory${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}


/**
 * This function renders and shows the priority of a specific task
 * 
 * @param {number} i - This is the number of each task 
 */
function renderPopupPrio(i) {
    let prio = document.getElementById(`popupPrio${i}`);

    if (prioImages.hasOwnProperty(tasks[i]['prio'])) {
        prio.innerHTML += `<img src="${prioImages[tasks[i]['prio']]}">`;
    }
}


/**
 * This function renders the initials of each person for a spacific task 
 * 
 * @param {number} i - This is the number of each task 
 */
function renderPopupAssignedTo(i) {
    for (let k = 0; k < tasks[i]['assignedTo'].length; k++) {
        let name = tasks[i]['assignedTo'];
        let initials = name[k].split(' ')[0].charAt(0) + name[k].split(' ')[1].charAt(0);
        showPopupAssignedTo(initials, i, k);
    }
}


/**
 * 
 * 
 * @param {string} initials - These are the initials of each person who is assigned to a task
 * @param {number} i - This is the number of each task 
 * @param {number} k - This is the number of each person who is assigned to a task
 */
function showPopupAssignedTo(initials, i, k) {
    let assignedTo = document.getElementById(`popupAssignedTo${i}`);
    let backgroundColor = colorPool[k % colorPool.length];

    assignedTo.innerHTML += /* html */`
        <div class="initialsAndName">
            <div id="initals${k}" class="popupInitials" style="background-color: ${backgroundColor};">${initials}</div>
            <div class="name">${tasks[i]['assignedTo'][k]}</div>
        </div>
    `;
}


/**
 * This function renders the subtasks of a specific task
 * 
 * @param {number} i - This is the number of each task 
 */
function renderPopupSubtasks(i) {
    if (tasks[i]['subtask'][0]) {
        for (let l = 0; l < tasks[i]['subtask'].length; l++) {
            showPopupSubtasks(i, l)
        }
    } else {
        document.getElementById(`popupSubtasks${i}`).style.display = 'none';
        document.getElementById(`popupSubtasksText${i}`).style.display = 'none';
    }
}


/**
 * 
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} l - This is the number of each subtask of a specific task
 */
function showPopupSubtasks(i, l) {
    let subtasks = document.getElementById(`popupSubtasks${i}`);

    subtasks.innerHTML += /* html */`
        <div class="imageAndText">
            <img onclick="checkbox(${i}, ${l})" id="checkBoxButton${l}" class="checkboxImage" src="./img/checkbox.svg">
            <div class="popupSubtaskText">${tasks[i]['subtask'][l]}</div>
        </div>
    `;
    renderCheckboxImage(i, l);
}


/**
 * This function renders and shows whether the checkbox is clicked or not
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} l - This is the number of each subtask of a specific task
 */
function renderCheckboxImage(i, l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);

    if (tasks[i]['doneSubtask'][l] == true) {
        checkbox.src = './img/checkbox_clicked.svg';
    } else {
        tasks[i]['doneSubtask'][l] = false;
        checkbox.src = './img/checkbox.svg';
    }
}


/**
 * This function closes the card popup
 * 
 * @param {*} event - ???
 */
function closePopup(event) {
    document.body.style.overflow = '';
    cardPopup.style.height = '';
    document.getElementById('cardPopup').style.display = 'none';
    document.getElementById('background').style.display = 'none';
    if (event) {
        event.stopPropagation();
    }
}


function dontClosePopup(event) {
    event.stopPropagation();
}


/**
 * This function deletes a task
 * 
 * @param {number} i - This is the number of each task 
 * @param {*} event - ???
 */
function deleteTask(i, event) {
    deleteUserTask(i)
    closePopup(event);
    emptyContentSections();
    init();
}


/**
 * This function slides in the card Popup
 */
function slideIn() {
    let cardPopup = document.getElementById('cardPopup');
    cardPopup.classList.add('slideIn');
    setTimeout(() => {
        cardPopup.classList.remove('slideIn');
    }, 500);

    cardPopup.style.display = 'flex';
}


/**
 * This function slides out the card Popup
 */
function slideOut() {
    let cardPopup = document.getElementById('cardPopup');
    cardPopup.classList.add('slideOut');
    setTimeout(() => {
        cardPopup.classList.remove('slideOut');
        closePopup();
    }, 100);
}


function startDragging(i) {
    currentDraggedElement = i;
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This function changes the section when a task is dragged into another section
 * 
 * @param {string} section - This is the section of each task 
 */
function moveTo(section) {
    let user = getUser();
    let task = user.tasks[currentDraggedElement];
    task.section = section;

    deleteUserTask(currentDraggedElement);
    saveUserTask(task);
    emptyContentSections();
    init();
}


/**
 * Move the card in the responsiv to a other section
 * @param {*} i Index of task
 * @param {*} direction Direction to move the card "up" or "down"
 */
function moveToArrow(i, direction) {
    event.stopPropagation();
    let user = getUser();
    let task = user.tasks[i];
    
    if (task.section == 'To do' && direction == 'up') {
        task.section = 'Done';
    } else if (task.section == 'To do' && direction == 'down') {
        task.section = 'In progress';
    } else if (task.section == 'In progress' && direction == 'up') {
        task.section = 'To do';
    } else if (task.section == 'In progress' && direction == 'down') {
        task.section = 'Await Feedback';
    } else if (task.section == 'Await Feedback' && direction == 'up') {
        task.section = 'In progress';
    } else if (task.section == 'Await Feedback' && direction == 'down') {
        task.section = 'Done';
    } else if (task.section == 'Done' && direction == 'up') {
        task.section = 'Await Feedback';
    } else if (task.section == 'Done' && direction == 'down') {
        task.section = 'To do';
    }

    deleteUserTask(i);
    saveUserTask(task);
    emptyContentSections();
    init();
}


/**
 * This function adds a highlight on a specific section
 * 
 * @param {string} id - This is the id of each section
 */
function highlight(id) {
    let sectionHighlight = document.getElementById(id + 'Content');
    sectionHighlight.classList.add("highlight");
}


/**
 * This function removes a highlight on a specific section
 * 
 * @param {string} id - This is the id of each section
 */
function removeHighlight(id) {
    let sectionHighlight = document.getElementById(id + 'Content');
    sectionHighlight.classList.remove("highlight");
}