const prioImages = {
    'Urgent': './img/urgent.svg',
    'Medium': './img/medium.svg',
    'Low': './img/low.svg'
};


let currentDraggedElement;


/**
 * This function sets the focus on the findTask input
 */
function focusOnFindTask() {
    document.getElementById('input').focus();
}


/**
 * This function renders the content on the board
 */
async function init() {
    loadUserTasks();
    renderContent('To do', 'toDoContent');
    renderContent('In progress', 'inProgressContent');
    renderContent('Await Feedback', 'awaitFeedbackContent');
    renderContent('Done', 'doneContent');
}


/** 
 * This function renders the content of the JSON tasks
 * 
 * @param {string} section - This is the section of each task
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in
 */
function renderContent(section, containerId) {
    for (let i = 0; i < tasks.length; i++) {
        showContent(section, containerId, i);
    }
}


/**
 * This function is responsible for putting the tasks in the right section
 * 
 * @param {string} section - This is the section of each task
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in 
 * @param {number} i - This is the number of each task
 */
function showContent(section, containerId, i) {
    if (tasks[i]['section'] === section) {
        checkContent(containerId, i);
        renderCategoryColor(i);
    }
}


/**
 * 
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in  
 * @param {number} i - This is the number of each task 
 */
function checkContent(containerId, i) {
    checkEmptySection(containerId);
    content(containerId, i);
}


/**
 * This function removes the empty section containers
 * 
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in   
 */
function checkEmptySection(containerId) {
    document.getElementById('empty' + containerId + 'Section').style.display = 'none';
}


/**
 * This function shows the content of the JSON tasks
 * 
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in   
 * @param {number} i - This is the number of each task
 */
function content(containerId, i) {
    let container = document.getElementById(containerId);

    if ('subtask' in tasks[i]) {
        container.innerHTML += /* html */`
        <div onclick="showCardPopup(${i})" draggable="true" ondragstart="startDragging(${i})" id="card${i}" class="card">
            <div class="categoryAndArrows">
                <div id="category${i}" class="category">${tasks[i]['category']}</div>
                <div class="cardArrows">
                    <img src="img/arrow_up.svg" onclick="moveToArrow(${i}, 'up')">
                    <img src="img/arrow_down.svg" onclick="moveToArrow(${i}, 'down')">
                </div>
            </div>
            <div class="titleAndDescription">
                <div class="title">${tasks[i]['title']}</div>
                <div class="description">${tasks[i]['description']}</div>
            </div>
            <div id="progressbarAndSubtask${i}" class="progressbarAndSubtask">
                <div id="progressbar${i}" class="progressbar"><div id="progress${i}" class="progress"></div></div>
                <div id="subtasks${i}" class="subtasks"><div id="subtask${i}" class="boardSubtask"></div></div>
            </div>
            <div id="progressComment${i}" class="progressComment">${tasks[i]['numberOfDoneSubtasks']} von ${tasks[i]['subtask'].length} Subtasks erledigt</div>
            <div class="cardBottom">
                <div id="assignedTo${i}" class="assignedTo"></div>
                <div id="prio${i}" class="prio"></div>
            </div>
        </div>
    `;
        renderProgressbar(i);
        renderSubtasks(i);
        renderPrio(i);
        renderAssignedTo(i);
        // saveTasks(); /* muss noch ersetzt werden */
    }

}


/**
 * This function checks whether the task has subtasks or not
 * 
 * @param {number} i - This is the number of each task
 */
function renderProgressbar(i) {
    let progressbar = document.getElementById(`progressbar${i}`);
    let progressbarAndSubtask = document.getElementById(`progressbarAndSubtask${i}`);

    if (tasks[i]['subtask'] == null || tasks[i]['subtask'][0] == undefined) {
        progressbar.style.display = 'none';
    } else {
        progressbarAndSubtask.style.marginBottom = '24px';
    }
}


/**
 * This function checks whether the task has subtasks or not, and if it has, it shows the number of subtasks and how many are done
 * 
 * @param {number} i - This is the number of each task 
 */
function renderSubtasks(i) {
    let subtasks = document.getElementById(`subtask${i}`);

    if (tasks[i]['subtask'] == null || tasks[i]['subtask'][0] == undefined) {
        subtasks.style.display = 'none';
    } else {
        subtasks.innerHTML = /* html */`
        <div>${tasks[i]['numberOfDoneSubtasks']}/${tasks[i]['subtask'].length} Subtasks</div>
    `;
        renderProgress(i);
    }
}


/**
 * This function shows the progress of the progressbar
 * 
 * @param {number} i - This is the number of each task  
 */
function renderProgress(i) {
    let progress = document.getElementById(`progress${i}`);

    let width = 128 / `${tasks[i]['subtask'].length}` * tasks[i]['numberOfDoneSubtasks'];

    progress.style.width = width + 'px';
}


/**
 * This function renders and shows the priority of each task
 * 
 * @param {number} i - This is the number of each task
 */
function renderPrio(i) {
    let prio = document.getElementById(`prio${i}`);

    if (prioImages.hasOwnProperty(tasks[i]['prio'])) {
        prio.innerHTML += `<img class="prioImage" src="${prioImages[tasks[i]['prio']]}">`;
    }
}


/**
 * This function renders the initials of each person who is assigned to each task
 * 
 * @param {number} i - This is the number of each task
 */
function renderAssignedTo(i) {
    for (let j = 0; j < tasks[i]['assignedTo'].length; j++) {
        if (j + 1 <= 6) {
            let name = tasks[i]['assignedTo'];
            let initials = name[j].split(' ')[0].charAt(0) + name[j].split(' ')[1].charAt(0);
            showAssignedTo(initials, i, j);
        }
    }
}


/**
 * This function shows the initials of each person how is assigned to each task
 * 
 * @param {string} initials - These are the initials of each person who is assigned to a task
 * @param {number} i - This is the number of each task 
 * @param {number} j - This is the number of each person who is assigned to a task
 */
function showAssignedTo(initials, i, j) { /* solution for random colors missing ! */
    let assignedTo = document.getElementById(`assignedTo${i}`);
    let backgroundColor = colorPool[j % colorPool.length];
    assignedTo.innerHTML += /* html */`
            <div id="initals${j}" class="initials" style="background-color: ${backgroundColor};">${initials}</div>
        `;
}


/**
 * This function renders the color of the category of each task
 * 
 * @param {number} i - This is the number of each task  
 */
function renderCategoryColor(i) {
    let content = document.getElementById(`category${i}`);
    if (content) {
        if (tasks[i]['category'] === 'Technical Task') {
            content.style.backgroundColor = '#1FD7C1';
        } else {
            content.style.backgroundColor = '#0038FF';
        }
    }
}


/**
 * This function shows the card popup of each card
 * 
 * @param {number} i - This is the number of each task   
 */
function showCardPopup(i) {
    document.body.style.overflow = 'hidden';
    document.getElementById('background').style.display = 'flex';

    cardPopup.innerHTML = /* html */`
        <div class="popupCategoryAndClose">
            <div id="popupCategory${i}" class="popupCategory">${tasks[i]['category']}</div>
            <img onclick="slideOut()" class="closeImage" src="./img/close.svg">
        </div>
        <div class="popupTitle">${tasks[i]['title']}</div>
        <div class="popupDescription">${tasks[i]['description']}</div>
        <div class="popupDueDate">
            <p class="dueDate">Due date:</p>
            <div class="date">${tasks[i]['dueDate']}</div>
        </div>
        <div class="popupPriority">
            <p class="priority">Priority:</p>
            <div class="priorityAndImage">
                <div>${tasks[i]['prio']}</div>
                <div id="popupPrio${i}"></div>
            </div>
        </div>
        <div class="popupAssignedTo">
            <p class="assignedToText">Assigned To:</p>
            <div id="popupAssignedTo${i}" class="popupAssignedToContent"></div>
        </div>
        <div id="popupSubtasks${i}" class="popupSubtasks">
            <p id="popupSubtasksText${i}" class="popupSubtasksText">Subtasks</p>
            <div  id="popupSubtasks${i}" class="popupSubtasksContent"></div>
        </div>
        <div class="popupBottom">
            <button onclick="deleteTask(${i})" class="deleteButtonImage"></button>
            <div class="buttonSpacer"></div>
            <button onclick="editTask(${i})" class="editButtonImage"></button>
        </div>
    `;
    renderPopupCategoryColor(i);
    renderPopupPrio(i);
    renderPopupAssignedTo(i);
    renderPopupSubtasks(i);
    slideIn();
}