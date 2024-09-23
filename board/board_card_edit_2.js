/**
 * This function shows the dropdown menu
 * 
 * @param {number} n - This is the number of each person in the JSON contactData
 * @param {number} i - This is the number of each task 
 */
function showContact(n, i) {
    let arrow = document.getElementById('arrow');
    let dropdownContainer = document.getElementById('dropdownMenu');
    dropdownContainer.style.display = 'flex';

    if (arrow.src.includes("/img/dropdownArrow.svg")) {
        arrow.src = "./img/liftupArrow.svg";
    }

    showDropdownMenu(n, i);
}


/**
 * This function renders the dropdown menu
 * 
 * @param {number} i - This is the number of each task
 */
function dropdownMenu(i) {
    renderDropdownMenu(i);
}

/**
 * This function renders the filtered persons
 * 
 * @param {number} i - This is the number of each task 
 */
function renderDropdownMenu(i) {
    for (let n = 0; n < contactData.length; n++) {
        showDropdownMenu(n, i);
    }
}


/**
 * This function shows the dropdown menu content
 * 
 * @param {number} n - This is the number of each person in the JSON contactData
 * @param {number} i - This is the number of each task 
 */
function showDropdownMenu(n, i) {
    let dropdownContainer = document.getElementById('dropdownMenu');

    dropdownContainer.innerHTML += /* html */`
        <div onclick="renderSelectedContact(${i}, ${n})" id="contact${n}" class="dropdownContent">
            <div class="dropdownInitialsAndName">
                <div id="dropdownInitials${n}"></div>
                <div class="dropdownContact">${contactData[n]['name']}</div>
            </div>
            <img id="dropdownCheckbox${n}" class="dropdownCheckbox" src="./img/checkbox.svg">
        </div>
    `;
    renderDropdownInitials(n);
    renderAlreadySelectedContacts(n, i);
}

/**
 * This function renders the initials of each person in the dropdown menu
 * 
 * @param {number} n - This is the number of each person in the JSON contactData
 */
function renderDropdownInitials(n) {
    let name = contactData[n]['name'];
    let initials = name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0);
    showDropDownInitials(initials, n);
}


/**
 * This function shows the initials of each person in the dropdown menu
 * 
 * @param {string} initials - These are the initials of each person in the dropdown menu
 * @param {number} n - This is the number of each person in the JSON contactData 
 */
function showDropDownInitials(initials, n) { /* Kontakt hat keine fest zugewiesene Farbe */
    let assignedTo = document.getElementById(`dropdownInitials${n}`);
    let backgroundColor = colorPool[n % colorPool.length];

    assignedTo.innerHTML += /* html */`
        <div class="editInitials">
            <div id="initals${n}" class="popupInitials" style="background-color: ${backgroundColor};">${initials}</div>
        </div>
    `;
}


/**
 * This function renders the persons who are already selected to assinged to
 * 
 * @param {number} n - This is the number of each person in the JSON contactData
 * @param {number} i - This is the number of each task
 */
function renderAlreadySelectedContacts(n, i) {
    for (let o = 0; o < tasks[i]['assignedTo'].length; o++) {
        const contact = tasks[i]['assignedTo'][o];
        showAleardySelectedContact(contact, n);
    }
}


/**
 * This function checks if the person is already selected
 * 
 * @param {string} contact - These are the persons who are assigned to a specific task
 * @param {number} n - This is the number of each person in the JSON contactData 
 */
function showAleardySelectedContact(contact, n) {
    if (contact == contactData[n]['name']) {
        alreadySelectedContact(n);
    }
}


/**
 * This function shows the persons who are already selected
 * 
 * @param {number} n - This is the number of each person in the JSON contactData
 */
function alreadySelectedContact(n) {
    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = '#2B3647';
    contact.style.color = 'white'
    checkImage.src = './img/checkboxClickedWhite.svg';
}


/**
 * This function renders the contacts who are selected/unselected
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} n - This is the number of each person in the JSON contactData 
 */
function renderSelectedContact(i, n) {
    if (!tasks[i]['assignedTo'].includes(contactData[n]['name'])) {
        selectedContact(i, n);
    } else {
        unselectContact(i, n);
    }
    document.getElementById(`editInitials${i}`).innerHTML = '';
    renderEditAssignedTo(i);
}


/**
 * This function shows the contact who is selected/unselected
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} n - This is the number of each person in the JSON contactData 
 */
function selectedContact(i, n) {
    tasks[i]['assignedTo'].push(contactData[n]['name']);

    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = '#2B3647';
    contact.style.color = 'white'
    checkImage.src = './img/checkboxClickedWhite.svg';
}


/**
 * This function shows the contact who is selected/unselected
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} n - This is the number of each person in the JSON contactData 
 */
function unselectContact(i, n) {
    let selectedContactName = contactData[n]['name'];
    let taskAssignedTo = tasks[i]['assignedTo'];
    let selectedContactIndex = taskAssignedTo.indexOf(selectedContactName);
    
    if (selectedContactIndex !== -1) {
        taskAssignedTo.splice(selectedContactIndex, 1);
    } else {
        taskAssignedTo.push(selectedContactName);
    }

    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = 'white';
    contact.style.color = 'black'
    checkImage.src = './img/checkbox.svg';
}


/**
 * This function opens the dropdown menu
 */
function openDropdownMenu() {
    document.getElementById('dropdownMenu').style.display = 'flex';
    let arrow = document.getElementById('arrow');

    if (arrow.src.includes("/img/dropdownArrow.svg")) {
        arrow.src = "./img/liftupArrow.svg";
    } else {
        arrow.src = "./img/dropdownArrow.svg";
        document.getElementById('dropdownMenu').style.display = 'none';
        document.getElementById('editAssignedTo').value = '';
    }
}


/**
 * This function shows the editable subtasks of a specific editable card popup
 * 
 * @param {number} p - This is the number of each subtasks for a task 
 * @param {number} i - This is the number of each task  
 */
function editSubtask(p, i) {
    let subtasks = document.getElementById(`subtasksContent${p}`);
    subtasks.style.backgroundColor = 'white';

    subtasks.innerHTML = /* html */`
        <input required id="subtasksInputContent${p}" class="subtasksEditInput">
            <div class="deleteAndDone">
                <img onclick="doneEditSubtask(${p}, ${i})" src="./img/done.svg">
                <div class="subtasksImageSpacer"></div>
                <img onclick="deleteSubtask(${p}, ${i})" src="./img/delete.svg">
            </div>
        </div>
    `;
    document.getElementById(`subtasksInputContent${p}`).value = `${tasks[i]['subtask'][p]}`;
    document.getElementById(`subtasksInputContent${p}`).focus();
}


/**
 * This function deletes a editable subtasks of a specific editable card popup
 * 
 * @param {number} p - This is the number of each subtasks for a task 
 * @param {number} i - This is the number of each task  
 */
function deleteSubtask(p, i) {
    tasks[i]['subtask'].splice(p, 1);

    document.getElementById(`editSubtasksList${i}`).innerHTML = '';
    renderEditSubtasksList(i);

    emptyContentSections();
    init();
}


/**
 * This function allows to edit a subtask
 * 
 * @param {number} p - This is the number of each subtasks for a task 
 * @param {number} i - This is the number of each task  
 */
function doneEditSubtask(p, i) {
    let subtask = document.getElementById(`subtasksInputContent${p}`).value;

    tasks[i]['subtask'][p] = subtask;

    document.getElementById(`editSubtasksList${i}`).innerHTML = '';
    renderEditSubtasksList(i);
}


/**
 * This function allows to create a new subtask
 * 
 * @param {number} i - This is the number of each task  
 */
function createNewSubtask(i) {
    let inputValue = document.getElementById(`editSubtasks${i}`).value;

    if (!inputValue == '') {
        tasks[i]['subtask'].push(inputValue);
        document.getElementById(`editSubtasks${i}`).value = '';

        document.getElementById(`editSubtasksList${i}`).innerHTML = '';
        renderEditSubtasksList(i);

        noFocusOnNewSubtask(i);
    }
}


/**
 * This function sets the focus on the newSubtask input
 * 
 * @param {number} i - This is the number of each task
 */
function focusOnNewSubtask(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.focus();

    document.getElementById(`closeAndDone${i}`).style.display = 'flex';
    document.getElementById('plus').style.display = 'none';
}


/**
 * This function removes the focus on the newSubtask input
 * 
 * @param {number} i - This is the number of each task
 */
function noFocusOnNewSubtask(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.blur();
    document.getElementById(`closeAndDone${i}`).style.display = 'none';
    document.getElementById('plus').style.display = 'flex';

}


/**
 * This function clears the input value of the newSubtask input
 * 
 * @param {number} i - This is the number of each task
 */
function emptyInput(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.focus();
    document.getElementById(`editSubtasks${i}`).value = '';
    noFocusOnNewSubtask(i);
}


/**
 * This function saves all changes made on the editable card popup
 * 
 * @param {number} i - This is the number of each task   
 */
function ok(i) {
    event.preventDefault();
    updateTitle(i);
    updateDescription(i);
    updateDueDate(i);
    // saveTasks(); /* muss noch ersetzt werden */
    deleteUserTask(tasks[i])
    saveUserTask(tasks[i]);
    emptyContentSections();
    init();
    document.getElementById('cardPopup').innerHTML = '';
    showCardPopup(i);
}


/**
 * This function changes the title of a specific editable card popup
 * 
 * @param {number} i - This is the number of each task   
 */
function updateTitle(i) {
    let title = document.getElementById(`editTitle${i}`).value;
    tasks[i]['title'] = null;
    tasks[i]['title'] = title;
}


/**
 * This function changes the description of a specific editable card popup
 * 
 * @param {number} i - This is the number of each task   
 */
function updateDescription(i) {
    let description = document.getElementById(`editDescription${i}`).value;
    tasks[i]['description'] = null;
    tasks[i]['description'] = description;
}


/**
 * This function changes the due date of a specific editable card popup
 * 
 * @param {number} i - This is the number of each task   
 */
function updateDueDate(i) {
    let dueDate = document.getElementById(`editDueDate${i}`).value;
    tasks[i]['dueDate'] = null;
    tasks[i]['dueDate'] = dueDate;
}


/**
 * This function checks the unchecked checkbox in the dropdown menu
 * 
 * @param {number} l - This is the number of each subtask of a specific task
 */
function clickeddropdownCheckbox(l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);
    checkbox.src = "./img/checkbox_clicked.svg";
}


/**
 * This function checks or unchecks a subtask of a specific task and increases or decreases the number of done subtasks
 * 
 * @param {number} i - This is the number of each task   
 * @param {number} l - This is the number of each subtask of a specific task
 */
function checkbox(i, l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);

    if (tasks[i]['doneSubtask'][l] == true) {
        saveUserSubtaskDone(i, l, false);
        clickedCheckbox(l);
    } else {
        saveUserSubtaskDone(i, l, true);
        checkbox.src = "./img/checkbox.svg"
    }
    emptyContentSections();
    init();
    renderSubtasks(i);
    renderCheckboxImage(i, l);
}


/**
 * This function checks the unchecked checkbox of a subtask
 * 
 * @param {number} l - This is the number of each subtask of a specific task
 */
function clickedCheckbox(l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);
    checkbox.src = "./img/checkbox_clicked.svg";
}