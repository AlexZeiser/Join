
let categorys;
let taskcontacts = [];
let currentContact;
let prio = 'Medium';
let subtasks = [];
let selectedContackts = [];
let currentNames = [];


/**
 * Init functions from tasks
 */
async function initAddTasks() {
    currentNames = await loadContacts();
    renderSubtask();
    showaAvailableContacts();
}


/**
 * Toggles the visibility of the contacts dropdown menu and manages associated UI changes.
 */
function dropDownContacts() {
    document.getElementById("contacts_dropdown").classList.toggle("show");
    let selectSpan = document.getElementById('selectSpan');
    let inputContacts = document.getElementById('filterContatcsInput');
    arrowChange();
    if (selectSpan.classList.contains('noDisplay')) {
        inputContacts.blur();
        closeFindInput();
    } else {
        inputContacts.value = '';
        openFindInput();
        inputContacts.focus();
        /* showaAvailableContacts(); */
    }
}

/**
 * Shows the contacts input field and hides the select span.
 */
function openFindInput() {
    document.getElementById('filterContatcsInput').classList.remove('noDisplay');
    document.getElementById('selectSpan').classList.add('noDisplay');

}

/**
 * Hides the contacts input field and shows the select span.
 */
function closeFindInput() {
    let filterContatcsInput = document.getElementById("filterContatcsInput");
    let selectSpan = document.getElementById('selectSpan');


    filterContatcsInput.classList.add('noDisplay');
    selectSpan.classList.remove('noDisplay');

}

/**
 * Closes all open contacts dropdown menus and updates the arrow direction.
 */
function dropDownCategory() {
    document.getElementById('availableCategory').classList.toggle("show");
    arrowChangeCategory();
}

/**
 * Closes all open contacts dropdown menus and updates the arrow direction.
 */
function closeCategoryDropdowns() {
    var dropdowns = document.getElementsByClassName("availableCategory");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            arrowChangeCategory();
        }
    }
}

// Funktion zum Schließen des Dropdown-Menüs und Ändern des Pfeils für Kontakte
function closeContactsDropdowns() {
    var dropdowns = document.getElementsByClassName("contactsDropdown");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            arrowChange();
            closeFindInput();
        }
    }
}

// Event-Handler für das Klicken auf das Fenster
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        closeCategoryDropdowns();
        // Überprüfen, ob der Klick innerhalb von #availableContacts war
        let availableContacts = document.getElementById("dropdownContent");
        if (availableContacts.contains(event.target)) {
            return; // Keine weiteren Aktionen ausführen
        }
        closeContactsDropdowns();
    }
}

/**
 * Toggles the direction of an arrow icon between up and down.
 */
function arrowChange() {
    let arrow = document.getElementById("arrow");
    let arrowDown = "img/arrow down.svg";
    let arrowUp = "img/arrow up.svg";
    if (arrow.getAttribute('src') == arrowDown) {
        arrow.setAttribute('src', arrowUp);
    } else {
        arrow.src = arrowDown
    }
}

/**
 * Toggles the direction of an arrow icon between up and down.
 */
function arrowChangeCategory() {
    let arrow = document.getElementById("arrow_category");
    let arrowDown = "img/arrow down.svg";
    let arrowUp = "img/arrow up.svg";
    if (arrow.getAttribute('src') == arrowDown) {
        arrow.setAttribute('src', arrowUp);
    } else {
        arrow.src = arrowDown
    }

}

/**
 * Displays available contacts in the UI.
 *
 * @param {Array} [filteredContacts=null] - Optional. An array of filtered contacts to display.
 */
function showaAvailableContacts(filteredContacts = null) {
    let availableContacts = document.getElementById("availableContacts");
    availableContacts.innerHTML = '';

    let contacts = filteredContacts || currentNames;

    for (let i = 0; i < contacts.length; i++) {
        let currentContact = contacts[i];
        let backgroundColor = colorPool[i % colorPool.length];
        availableContacts.innerHTML +=
            `<div id='contactBTN${i}' class="contactBTN" onclick='chosenContacts(${i}, currentContact)'>
                <div class="initialsAndContacts">
                    <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(currentContact.name)}</div>
                    <div id="contacts">${currentContact['name']}</div>
                </div>
                <img id="selectionBox${i}" src="img/selectionbox unclicked.svg" alt="">
            </div>`;
    }
}

/**
 * Handles the selection of a contact.
 *
 * @param {number} i - The index of the chosen contact in the currentNames array.
 * @param {Object} currentContact - The chosen contact object.
 */
function chosenContacts(i, currentContact) {
    let chosenContact = currentNames[i];
    let selectionBox = document.getElementById(`selectionBox${i}`);
    let ContactBTN = document.getElementById(`contactBTN${i}`);
    let unclicked_background = "white";
    let clicked_background = "#2A3647";
    let selection_box_unclicked = "img/selectionbox unclicked.svg";
    let selection_box_clicked = "img/selectionbox clicked.svg";
    if (selectionBox.getAttribute('src') == selection_box_unclicked) {
        selectionBox.setAttribute('src', selection_box_clicked);
        ContactBTN.style.backgroundColor = clicked_background;
        ContactBTN.classList.add('contact-btn-color');
        ContactBTN.classList.remove('contact-btn-color-hover');
    } else {
        ContactBTN.classList.remove('contact-btn-color');
        selectionBox.src = selection_box_unclicked;
        ContactBTN.style.backgroundColor = unclicked_background;
        ContactBTN.classList.add('contact-btn-color-hover');
    }
    chosenContactsPush(i, selection_box_clicked);
}

/**
 * Updates the task contacts array based on the selection status of a contact.
 *
 * @param {number} i - The index of the chosen contact in the currentNames array.
 * @param {string} selection_box_clicked - The source image of the selection box when clicked.
 */
function chosenContactsPush(i, selection_box_clicked) {
    let selectionBox = document.getElementById(`selectionBox${i}`);
    let chosenContact = currentNames[i];

    if (selectionBox.getAttribute('src') == selection_box_clicked) {
        if (!taskcontacts.includes(chosenContact['name'])) {
            taskcontacts.push(chosenContact['name']);
        }
    } else {
        let index = taskcontacts.indexOf(chosenContact['name']);
        if (index > -1) {
            taskcontacts.splice(index, 1);
        }
    }
    showchosenInitials(i)

}

/**
 * Displays the initials of chosen contacts in the UI.
 *
 * @param {number} i - The index of the chosen contact in the currentNames array.
 */
function showchosenInitials(i) {
    let chosenInitals = document.getElementById('chosenInitals');
    chosenInitals.innerHTML = ""
    for (let index = 0; index < taskcontacts.length; index++) {
        const taskcontact = taskcontacts[index];
        let backgroundColor = colorPool[index % colorPool.length];
        chosenInitals.innerHTML += /*html*/`
            
       
            <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(taskcontact)}</div>
        `
    }
    checkScrollBar();
}

/**
 * Filters the available contacts based on the search input and displays them.
 */
function searchContacts() {
    let search = document.getElementById("filterContatcsInput").value.toLowerCase();
    let filteredContacts = currentNames.filter(contact => contact.name.toLowerCase().includes(search));
    showaAvailableContacts(filteredContacts);
}


/**
 * Checks for chosenInitals overflow and applies styles accordingly.
 */
function checkScrollBar() {
    let containerchosenInitals = document.getElementById('chosenInitals');
    let elements = containerchosenInitals.children;

    if (elements.length > 6) {
        containerchosenInitals.classList.add('scroll-style');
    } else {
        containerchosenInitals.classList.remove('scroll-style');
    }
}