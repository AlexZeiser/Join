/**
 * This function opens the addTask Popup 
 */
function openAddTask() {
    let addTask = document.getElementById('addTask');
    addTask.style.display = 'flex';
    document.getElementById('addTaskBackground').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    addTaskSlideIn();
}


/**
 * This function slides in the addTask Popup
 */
function addTaskSlideIn() {
    let addTask = document.getElementById('addTask');
    addTask.classList.add('slideIn');
    setTimeout(() => {
        addTask.classList.remove('slideIn');
    }, 500);

    addTask.style.display = 'flex';
}


/**
 * This function slides out the addTask Popup
 */
function addTaskSlideOut() {
    let addTask = document.getElementById('addTask');
    addTask.classList.add('slideOut');
    setTimeout(() => {
        addTask.classList.remove('slideOut');
        closeAddTask();
    }, 100);
}


/**
 * This function closes the addTask Popup
 */
function closeAddTask(event) {
    document.body.style.overflow = '';
    document.getElementById('addTask').style.display = 'none';
    document.getElementById('addTaskBackground').style.display = 'none';
    if (event) {
        event.stopPropagation();
    }
}


/**
 * This function creates a new task
 */
function createTaskBoard() {
    let titleInput = document.getElementById('titleInput');
    let descriptionInput = document.getElementById('descriptionInput');
    let date = document.getElementById('date');

    let newTask = {
        'title': titleInput.value,
        'description': descriptionInput.value,
        'assignedTo': taskcontacts,
        'dueDate': date.value,
        'prio': prio,
        'category': categorys,
        'subtask': subtasks,
        'doneSubtask': subtasks.map(() => false),
        'numberOfDoneSubtasks': 0,
        'section': 'To do'
    }
    saveUserTask(newTask)
    closeAddTask(); /* schließt das addTask Popup */
    emptyContentSections(); /* leert den kompletten Content */ /* zeigt alle tasks an */
    init();
    showCreateTaskMessage('task_successfully_div');

    clearForm();
    putData("tasks", tasks)
        .catch(error => console.error(error));
}