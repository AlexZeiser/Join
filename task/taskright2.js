/**
 * Sets the minimum selectable date to today.
 */
document.addEventListener('DOMContentLoaded', function () {
    let dateInput = document.getElementById('date');
    let today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

/**
 * Toggles the appearance of a high priority icon between clicked and unclicked states.
 *
 * @param {HTMLImageElement} highicon - The HTMLImageElement representing the high priority icon.
 */
function toggleHighIcon(highicon) {
    const clickedhighicon = "img/Prio high icon clicked.svg";
    const unclickedhighicon = "img/Prio high icon.svg";

    if (highicon.getAttribute('src') === unclickedhighicon) {
        highicon.setAttribute('src', clickedhighicon);
    } else {
        highicon.src = unclickedhighicon;
    }
}

/**
 * Sets the style of a button element.
 *
 * @param {HTMLElement} urgentbtn - The button element to style.
 * @param {string} backgroundColor - The background color for the button.
 * @param {string} textColor - The text color for the button.
 * @param {string} boxShadow - The box shadow for the button.
 */
function setButtonStyle(urgentbtn, backgroundColor, textColor, boxShadow) {
    urgentbtn.style.background = backgroundColor;
    urgentbtn.style.color = textColor;
    urgentbtn.style.boxShadow = boxShadow;
}

/**
 * Toggles the urgent priority status and updates button styles accordingly.
 */
function prioUrgent() {
    let highicon = document.getElementById("highicon");
    let urgentbtn = document.getElementById('urgentbtn');
    const clickedhighicon = "img/Prio high icon clicked.svg";
    const unclickedhighicon = "img/Prio high icon.svg";
    toggleHighIcon(highicon);
    if (highicon.getAttribute('src') === clickedhighicon) {
        setButtonStyle(urgentbtn, 'rgb(255, 61, 0)', '#FFFFFF', 'unset');
        prio = 'Urgent';
        prioMedSetBack();
        prioLowSetBack();
    } else {
        setButtonStyle(urgentbtn, '#FFFFFF', 'black', '0px 4px 4px 0px #00000040');
        prioUrgentSetBack();
    }
}

/**
 * Toggles the appearance of a medium priority icon between clicked and unclicked states.
 *
 * @param {HTMLImageElement} medicon - The HTMLImageElement representing the medium priority icon.
 */
function toggleMedIcon(medicon) {
    const unclickedmidicon = 'img/Prio medi icon.svg';
    const clickedmidicon = "img/Prio media icon clicked.svg";

    if (medicon.getAttribute('src') === unclickedmidicon) {
        medicon.setAttribute('src', clickedmidicon);
    } else {
        medicon.src = unclickedmidicon;
    }
}

/**
 * Sets the style of a button element.
 *
 * @param {HTMLElement} medbtn - The button element to style.
 * @param {string} backgroundColor - The background color for the button.
 * @param {string} textColor - The text color for the button.
 * @param {string} boxShadow - The box shadow for the button.
 */
function setButtonStyle(medbtn, backgroundColor, textColor, boxShadow) {
    medbtn.style.background = backgroundColor;
    medbtn.style.color = textColor;
    medbtn.style.boxShadow = boxShadow;
}

/**
 * Toggles the medium priority status and updates button styles accordingly.
 */
function prioMed() {
    let medbtn = document.getElementById('midbtn');
    let medicon = document.getElementById('midicon');
    toggleMedIcon(medicon);
    if (medicon.getAttribute('src') !== "img/Prio media icon clicked.svg") {
        setButtonStyle(medbtn, 'rgb(255,168,0)', '#FFFFFF', 'unset');
        prio = 'Medium';
        prioLowSetBack();
        prioUrgentSetBack();
    } else {
        setButtonStyle(medbtn, '#FFFFFF', 'black', '0px 4px 4px 0px #00000040');
        prioMedSetBack();
    }
}


let lowbtn = document.getElementById('lowbtn');
let lowicon = document.getElementById("lowicon");
let unclickedlowcon = "img/Prio low icon.svg";
let clickedlowicon = "img/Prio low icon clicked.svg";

/**
 * Toggles the appearance of a low priority icon between clicked and unclicked states.
 *
 * @param {HTMLImageElement} lowicon - The HTMLImageElement representing the low priority icon.
 */
function toggleLowIcon(lowicon) {
    const unclickedlowcon = 'img/Prio low icon.svg';
    const clickedlowicon = "img/Prio low icon clicked.svg";

    if (lowicon.getAttribute('src') === unclickedlowcon) {
        lowicon.setAttribute('src', clickedlowicon);
    } else {
        lowicon.src = unclickedlowcon;
    }
}

/**
 * Sets the style of a button element.
 *
 * @param {HTMLElement} lowbtn - The button element to style.
 * @param {string} backgroundColor - The background color for the button.
 * @param {string} textColor - The text color for the button.
 * @param {string} boxShadow - The box shadow for the button.
 */
function setButtonStyle(lowbtn, backgroundColor, textColor, boxShadow) {
    lowbtn.style.background = backgroundColor;
    lowbtn.style.color = textColor;
    lowbtn.style.boxShadow = boxShadow;
}

/**
 * Toggles the low priority status and updates button styles accordingly.
 */
function prioLow() {
    let lowicon = document.getElementById("lowicon");
    let lowbtn = document.getElementById('lowbtn');

    toggleLowIcon(lowicon);

    if (lowicon.getAttribute('src') === "img/Prio low icon clicked.svg") {
        setButtonStyle(lowbtn, 'rgb(122,226,41)', '#FFFFFF', 'unset');
        prio = 'Low';
        prioMedSetBack();
        prioUrgentSetBack();
    } else {
        setButtonStyle(lowbtn, '#FFFFFF', 'black', '0px 4px 4px 0px #00000040');
        prioLowSetBack();
    }
}

/**
 * Resets the low priority button and icon to their default styles.
 */
function prioLowSetBack() {
    let lowbtn = document.getElementById('lowbtn');
    let lowicon = document.getElementById("lowicon");
    let unclickedlowcon = "img/Prio low icon.svg";

    lowicon.src = unclickedlowcon;
    lowbtn.style.background = '#FFFFFF';
    lowbtn.style.color = 'black';
    lowbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;';
}

/**
 * Resets the medium priority button and icon to their default styles.
 */
function prioMedSetBack() {
    let medbtn = document.getElementById('midbtn');
    let medicon = document.getElementById('midicon');
    let unclickedmidicon = 'img/Prio medi icon.svg'

    medicon.src = unclickedmidicon
    medbtn.style.background = '#FFFFFF';
    medbtn.style.color = 'black';
    medbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;'
}

/**
 * Resets the urgent priority button and icon to their default styles.
 */
function prioUrgentSetBack() {
    let highicon = document.getElementById("highicon");
    let urgentbtn = document.getElementById('urgentbtn');
    let unclickedhighicon = "img/Prio high icon.svg"

    highicon.src = unclickedhighicon
    urgentbtn.style.background = '#FFFFFF';
    urgentbtn.style.color = 'black';
    urgentbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;'
}

/**
 * Sets the task category to "Technical Task", updates the category span, and enables the create button.
 */
function technicalTask() {
    let categorySpan = document.getElementById('categorySpan');
    categorySpan.innerHTML = "Technikal Task";
    categorys = "Technikal Task";
    createBtnEnable();
    alarmInput();
}

/**
 * Sets the task category to "User Story", updates the category span, and enables the create button.
 */
function userStory() {
    let categorySpan = document.getElementById('categorySpan');
    categorySpan.innerHTML = "User Story";
    categorys = "User Story";
    createBtnEnable();
    alarmInput();
}

/**
 * Renders the subtasks in the UI.
 */
function renderSubtask() {
    let pushedSubtasks = document.getElementById("pushedSubtasks");
    pushedSubtasks.innerHTML = '';
    for (let j = 0; j < subtasks.length; j++) {
        let subtask = subtasks[j];
        pushedSubtasks.innerHTML += generateSubtaskHTML(j, subtask);
    }
}

/**
 * Generates HTML for a subtask element based on the provided index and subtask content.
 *
 * @param { number } index - The index of the subtask.
 * @param { string } subtask - The content of the subtask.
 * @returns { string } - The HTML string for the subtask element.
 */
function generateSubtaskHTML(index, subtask) {
    return /*html*/`
        <div class="subtask">
            <div class='subtaskHover'>
                <div class='editableSubtask' id='editableSubtask${index}'>
                <div class="separatIcons">
                    <span id='valueSpan${index}'>• ${subtask}</span>
                    <div id='subtaskHoverIcon${index}' class="subtaskHoverIcon">
                        <img onclick='subtasksEditAndDelete(${index})' src="img/subtaskPencil.svg">
                        <img onclick='deleteSubtask(${index})' src="img/subtaskDelete.svg">
                        </div>
                    </div>
                </div>
            </div>
            <div class='subtaskInputParent noDisplay' id='subtaskInputParent${index}'>
                <input class='subtaskInput noDisplay' id='subtaskEditInput${index}' value='${subtask}'>
                <img onclick='deleteSubtask(${index})' src="img/subtaskDelete.svg">
                <div class='divider'></div>
                <img onclick='pushEditToArray(${index},"${subtask}")' src="img/subtaskCheck.svg">
            </div>
        </div>
    `;
}

/**
 * Handles editing and deleting subtasks based on the provided index.
 *
 * @param {number} j - The index of the subtask.
 */
function subtasksEditAndDelete(j) {
    let editableSubtask = document.getElementById(`editableSubtask${j}`);
    document.getElementById(`subtaskEditInput${j}`).classList.remove('noDisplay');
    document.getElementById(`subtaskInputParent${j}`).classList.remove('noDisplay');
    document.getElementById(`subtaskEditInput${j}`).focus();
    document.getElementById(`subtaskHoverIcon${j}`).classList.add('noDisplay');
    document.getElementById(`editableSubtask${j}`).classList.add('noDisplay');
    document.getElementById(`valueSpan${j}`).classList.add('noDisplay');
}

/**
 * Deletes a subtask at the specified index, saves changes, and re-renders the subtasks.
 *
 * @param {number} j - The index of the subtask to delete.
 */
function deleteSubtask(j) {
    subtasks.splice(j, 1);
    saveSubtusks();
    renderSubtask();
    subtaskOverflowCheck();
}

/**
 * Pushes the edited subtask to the subtasks array, saves changes, reloads subtasks, and re-renders the subtask list.
 *
 * @param {number} j - The index of the subtask being edited.
 */
function pushEditToArray(j) {
    let subtaskEdit = document.getElementById(`subtaskEditInput${j}`)

    subtasks.push(subtaskEdit.value)
    subtaskEdit.value = '';
    deleteSubtask(j)
    saveSubtusks();
    loadSubtasks();
    renderSubtask();
}

/**
 * Saves the subtasks array .
 */
function saveSubtusks() {
    let subtaskasText = JSON.stringify(subtasks);
    localStorage.setItem('subtasks', subtaskasText);
}


/**
 * Loads the subtasks array .
 */
function loadSubtasks() {
    let subtaskasText = localStorage.getItem(subtasks)
    sub_tasks = JSON.parse(subtaskasText);

}

/**
 * Pushed the subtasks array .
 */
function pushSubtask() {
    let subtaskinput = document.getElementById("subtask_input");
    let subtaskValue = subtaskinput.value.trim();

    if (subtaskValue !== '') {
        subtasks.push(subtaskValue);
        subtaskinput.value = '';

        renderSubtask();
    }
}

/**
 * Checks for subtask overflow and applies styles accordingly.
 */
function subtaskOverflowCheck() {
    let subtasks = document.getElementsByClassName("subtask");
    let containerSubtask = document.getElementById('pushedSubtasks');
    if (subtasks.length > 2) {
        containerSubtask.classList.add('pushed-subtasks-border')
        containerSubtask.scrollTo(0, containerSubtask.scrollHeight);
    } else {
        containerSubtask.classList.remove('pushed-subtasks-border')
    }
}