/**
 * This function clears the board
 */
function emptyContentSections() {
    document.getElementById('toDoContent').innerHTML = '';
    document.getElementById('inProgressContent').innerHTML = '';
    document.getElementById('awaitFeedbackContent').innerHTML = '';
    document.getElementById('doneContent').innerHTML = '';
    document.getElementById('emptytoDoContentSection').style.display = 'flex';
    document.getElementById('emptyinProgressContentSection').style.display = 'flex';
    document.getElementById('emptyawaitFeedbackContentSection').style.display = 'flex';
    document.getElementById('emptydoneContentSection').style.display = 'flex';
}


/**
 * This function allows to search for a task
 */
function findTask() {
    let search = document.getElementById('input').value;
    search = search.toLowerCase();

    emptyContentSections();

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task['title'].toLowerCase().includes(search) || task['description'].toLowerCase().includes(search)) {
            renderTask(i);
        }
    }
}


/**
 * same as init() (only for filtered content)
 * 
 * @param {number} i - This is the number of each task 
 */
function renderTask(i) {
    showTask('To do', 'toDoContent', i);
    showTask('In progress', 'inProgressContent', i);
    showTask('Await Feedback', 'awaitFeedbackContent', i);
    showTask('Done', 'doneContent', i);
}


/**
 * This function is responsible for putting the tasks in the right section
 * 
 * @param {string} section - This is the section of each task
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in 
 * @param {number} i - This is the number of each task 
 */
function showTask(section, containerId, i) {
    if (tasks[i]['section'] === section) {
        checkContent(containerId, i);
        renderCategoryColor(i);
    }
}