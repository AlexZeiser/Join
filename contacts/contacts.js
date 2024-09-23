/**
 * Represents the currently selected contact.
 * Repräsentiert den aktuell ausgewählten Kontakt.
 * @type {Object}
 */
let currentContact;

/**
 * Initializes the application by loading contacts and generating the contact list.
 * Initialisiert die Anwendung, indem Kontakte geladen und die Kontaktliste generiert werden.
 * @returns {Promise<void>}
 */
async function init() {   
    contactData = await loadContacts();
    generateContactList();
}

/**
 * Creates a new contact based on user input.
 * Erstellt einen neuen Kontakt basierend auf Benutzereingaben.
 */
function createContact() {
    /**
     * @type {HTMLInputElement}
     */
    let inputname = document.getElementById(`create_name`);
    /**
     * @type {HTMLInputElement}
     */
    let inputmail = document.getElementById(`create_mail`);
    /**
     * @type {HTMLInputElement}
     */
    let inputphone = document.getElementById(`create_phone`);
    /**
     * @type {HTMLElement}
     */
    let contactReady = document.getElementById(`new_contact_ready`);
    let index = contactData.findIndex(contact => contact.email == inputmail.value);

    if (index != -1) {
        contactReady.style.display = "flex";
        return;
    }

    let contact = {
        name: inputname.value,
        email: inputmail.value,
        phoneNumber: inputphone.value,
    };
    
    contactData.push(contact);

    hideCreateContactMessage("new_contact_successfully_div");
    generateContactList();
    saveContacts();
    closeAddNewContactWindow();
}

/**
 * Generates the contact list based on the available contact data.
 * Generiert die Kontaktliste basierend auf den verfügbaren Kontaktdaten.
 */
function generateContactList() {
    /**
     * @type {HTMLElement}
     */
    let contactContainer = document.getElementById(`first_contact_under_container`);
    let lastChar = "";

    contactContainer.innerHTML = "";

    contactData.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);

    for (let i = 0; i < contactData.length; i++) {
        const contact = contactData[i];
        let select = "";

        if (currentContact) {
            select = contact.name == currentContact.name ? "selected" : "";
        }

        let backgroundColor = colorPool[i % colorPool.length];

        if (lastChar !== contact.name.charAt(0).toUpperCase()) {
            contactContainer.innerHTML += `<div class="alphabet_div">${contact.name.charAt(0).toUpperCase()}</div><hr>`;
            lastChar = contact.name.charAt(0).toUpperCase();
        }

        contactContainer.innerHTML += `
        <div class="div_contact ${select}" id="div_contact_${i}" onclick="selectContact(${i})">
            <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(contact.name)}</div>
            <div class="name_email_div">    
                <div class="contact_name">${contact.name}</div>
                <div class="contact_email">${contact.email}</div>
            </div>
        </div>            
        `;
    }
}

/**
 * Selects a contact and displays its details.
 * Wählt einen Kontakt aus und zeigt dessen Details an.
 * @param {number} i - The index of the contact to select.
 */
function selectContact(i) {
    currentContact = contactData[i];
    /**
     * @type {HTMLElement}
     */
    let selectContact = document.getElementById(`div_contact_${i}`);
    /**
     * @type {HTMLElement}
     */
    let contactInfo = document.getElementById(`second_contact_container`);
    /**
     * @type {HTMLElement}
     */
    let contactList = document.getElementById(`first_contact_container`);
    /**
     * @type {HTMLElement}
     */
    let second_contact_infos = document.getElementById(`second_contact_infos`);
    clearSelect();

    selectContact.classList.add(`selected`);
    contactInfo.classList.add(`selected`);
    contactList.classList.add(`selected`);
    second_contact_infos.style.display = "flex";

    setContactInfo(currentContact);
}

/**
 * Clears the selection of contacts.
 * Löscht die Auswahl der Kontakte.
 */
function clearSelect() {
    /**
     * @type {HTMLCollectionOf<HTMLElement>}
     */
    let list = document.getElementsByClassName(`div_contact`);

    for (let i = 0; i < list.length; i++) {
        const element = list[i];

        element.classList.remove(`selected`);
    }
}

/**
 * Sets the contact information to be displayed.
 * Legt die anzuzeigenden Kontaktdaten fest.
 * @param {Object} contact - The contact object containing name, email, and phoneNumber.
 */
function setContactInfo(contact) {
    /**
     * @type {HTMLElement}
     */
    let nameDiv = document.getElementById(`name_div_big`);
    /**
     * @type {HTMLElement}
     */
    let emailDiv = document.getElementById(`email_optionen`);
    /**
     * @type {HTMLElement}
     */
    let phoneDiv = document.getElementById(`phone_optionen`);
    /**
     * @type {HTMLElement}
     */
    let initialDiv = document.getElementById(`name_div_small`);

    nameDiv.innerHTML = contact.name;

    let emailLink = document.createElement('a');

    emailLink.href = `mailto:${contact.email}`;
    emailLink.textContent = contact.email;
    emailDiv.innerHTML = '';
    emailDiv.appendChild(emailLink);

    let phoneLink = document.createElement('a');

    phoneLink.href = `tel:${contact.phoneNumber}`;
    phoneLink.textContent = contact.phoneNumber; 
    phoneDiv.innerHTML = '';
    phoneDiv.appendChild(phoneLink);

    initialDiv.innerHTML = getInitials(contact.name);
}

/**
 * Opens the window for adding a new contact.
 * Öffnet das Fenster zum Hinzufügen eines neuen Kontakts.
 */
function openAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "flex";
    document.body.style.overflow = "hidden";
    /**
     * @type {HTMLElement}
     */
    let contactReady = document.getElementById(`new_contact_ready`);
    contactReady.style.display = "none";
}

/**
 * Opens the window for editing a contact.
 * Öffnet das Fenster zum Bearbeiten eines Kontakts.
 */
function openEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "flex";
    document.body.style.overflow = "hidden";
}

/**
 * Closes the window for adding a new contact.
 * Schließt das Fenster zum Hinzufügen eines neuen Kontakts.
 */
function closeAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "none";
    document.body.style.overflow = "auto";
}

/**
 * Displays a message for creating a new contact and hides it after a delay.
 * Zeigt eine Nachricht zur Erstellung eines neuen Kontakts an und blendet sie nach einer Verzögerung aus.
 * @param {string} messageID - The ID of the message element to display.
 */
function hideCreateContactMessage(messageID) {
    /**
     * @type {HTMLElement}
     */
    var messageDiv = document.getElementById(messageID);
    messageDiv.style.display = "flex";
    messageDiv.classList.add("animate");

    setTimeout(function () {
        removeClassAnimate(messageDiv);
    }, 5000);
}

/**
 * Closes the window for editing a contact.
 * Schließt das Fenster zum Bearbeiten eines Kontakts.
 */
function closeEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "none";
    document.body.style.overflow = "auto";
}

/**
 * Deletes a contact.
 * Löscht einen Kontakt.
 */
function deleteContact() {
    let index = contactData.findIndex(contact => contact.email == currentContact.email);
    /**
     * @type {HTMLElement}
     */
    let second_contact_infos = document.getElementById(`second_contact_infos`);
    contactData.splice(index, 1);

    second_contact_infos.style.display = "none";
    closeEditContactWindow();

    hideCreateContactMessage("delete_contact_successfully_div");
    hideMenuEditDeleteContainer();
    closeContactInfo();
    saveContacts();
    generateContactList();
}

/**
 * Hides the menu for editing and deleting contacts.
 * Blendet das Menü zum Bearbeiten und Löschen von Kontakten aus.
 */
function hideMenuEditDeleteContainer() {
    /**
     * @type {HTMLElement}
     */
    let menu_edit_delete_container = document.getElementById(`menu_edit_delete_container`);
    menu_edit_delete_container.style.display = "none";
}

/**
 * Edits a contact.
 * Bearbeitet einen Kontakt.
 */
function editContact() {
    /**
     * @type {HTMLInputElement}
     */
    let nameDiv = document.getElementById(`edit_name`);
    /**
     * @type {HTMLInputElement}
     */
    let emailDiv = document.getElementById(`edit_mail`);
    /**
     * @type {HTMLInputElement}
     */
    let phoneDiv = document.getElementById(`edit_phone`);
    /**
     * @type {HTMLElement}
     */
    let initialDiv = document.getElementById(`profil_name_initialen`);
    /**
     * @type {HTMLElement}
     */
    let contactReady = document.getElementById(`edit_contact_ready`);

    contactReady.style.display = "none";
    nameDiv.value = currentContact.name;
    emailDiv.value = currentContact.email;
    phoneDiv.value = currentContact.phoneNumber;
    initialDiv.innerHTML = getInitials(currentContact.name);

    hideMenuEditDeleteContainer();
    openEditContactWindow();
}

/**
 * Updates the details of an edited contact.
 * Aktualisiert die Details eines bearbeiteten Kontakts.
 */
function updateContact() {
    let name = document.getElementById(`edit_name`).value;
    let email = document.getElementById(`edit_mail`).value;
    let phone = document.getElementById(`edit_phone`).value;
    /**
     * @type {HTMLElement}
     */
    let contactReady = document.getElementById(`edit_contact_ready`);
    let index = contactData.findIndex(contact => contact.email == email);

    if (index != -1 && currentContact.email != email) {
        contactReady.style.display = "flex";

        return;
    }

    currentContact.name = name;
    currentContact.email = email;
    currentContact.phoneNumber = phone;

    setContactInfo(currentContact);

    hideCreateContactMessage("edit_contact_successfully_div");
    closeEditContactWindow();
    saveContacts();
    generateContactList();
}

/**
 * Closes the display of contact information.
 * Schließt die Anzeige der Kontaktdaten.
 */
function closeContactInfo() {
    /**
     * @type {HTMLElement}
     */
    let contactInfo = document.getElementById(`second_contact_container`);
    /**
     * @type {HTMLElement}
     */
    let contactList = document.getElementById(`first_contact_container`);
    clearSelect();

    contactInfo.classList.remove(`selected`);
    contactList.classList.remove(`selected`);

    hideMenuEditDeleteContainer();
}

/**
 * Toggles the display of the edit/delete menu container.
 * Schaltet die Anzeige des Containers für das Bearbeiten/Löschen-Menü um.
 */
function menu_window() {
    /**
     * @type {HTMLElement}
     */
    let menuContainer = document.getElementById(`menu_edit_delete_container`);

    if (menuContainer.style.display == "none" || menuContainer.style.display == "") {
        menuContainer.style.display = "flex";
    } else {
        menuContainer.style.display = "none";
    }
}

/**
 * Removes the "animate" class from a given element.
 * Entfernt die Klasse "animate" von einem bestimmten Element.
 * @param {HTMLElement} messageDiv - The message element to remove the class from.
 */
function removeClassAnimate(messageDiv) {
    messageDiv.style.display = "none";
    messageDiv.classList.remove("animate");
}