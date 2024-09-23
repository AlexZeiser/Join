
/**
 * The URL of the Firebase Realtime Database where data will be stored and retrieved.
 * Die URL der Firebase-Echtzeitdatenbank, in der Daten gespeichert und abgerufen werden.
 */

const STORAGE_URL = "https://join-projekt-33778-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * An array containing contact data.
 * Ein Array mit Kontaktdaten.
 * 
 * @type {Array<object>}
 */
let contactData = [];

/**
 * An array containing task objects.
 * Ein Array mit Aufgabenobjekten.
 * 
 * @type {Array<object>}
 */
let tasks = [];

/**
 * An array containing color codes for UI elements.
 * Ein Array mit Farbcodes für UI-Elemente.
 * 
 * @type {Array<string>}
 */
const colorPool = [
    '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8',
    '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701',
    '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'
];
/**
 * Saves data to the specified path in the database.
 * Speichert Daten unter dem angegebenen Pfad in der Datenbank.
 * 
 * @param {string} [path=""] - The path where the data should be saved.
 *                              Der Pfad, unter dem die Daten gespeichert werden sollen.
 * @param {object} [data={}] - The data to be saved.
 *                              Die zu speichernden Daten.
 * @returns {Promise<object>} - A promise that resolves to the response JSON data.
 *                              Ein Promise, das zu den Antwort-JSON-Daten auflöst.
 * @throws {Error} - If there is an error during the data sending process.
 *                   Wenn ein Fehler während des Datenübertragungsvorgangs auftritt.
 */
async function putData(path = "", data = {}) {
    try {
        let response = await fetch(STORAGE_URL + path + ".json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Senden der Daten: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Fehler beim Senden der Daten: ${error.message}`);
    }
}

/**
 * Loads data from the specified path in the database.
 * Lädt Daten aus dem angegebenen Pfad in der Datenbank.
 * 
 * @param {string} [path=""] - The path from which the data should be loaded.
 *                              Der Pfad, aus dem die Daten geladen werden sollen.
 * @returns {Promise<object>} - A promise that resolves to the response JSON data.
 *                              Ein Promise, das zu den Antwort-JSON-Daten auflöst.
 */
async function loadData(path = "") {
    let response = await fetch(STORAGE_URL + path + ".json");
    let responseAsJson = await response.json();
    return responseAsJson;
}


/**
 * Save task to current user
 * @param {Object} task The task
 */
function saveUserTask(task) {
    let user = getUser();
    user.tasks.push(task);
    saveUser(user);
}


/**
 * Save current user subtask done
 * @param {Integer} taskIndex 
 * @param {Integer} subtaskIndex 
 * @param {Boolean} state 
 */
function saveUserSubtaskDone(taskIndex, subtaskIndex, state) {
    let user = getUser();
    user.tasks[taskIndex].doneSubtask[subtaskIndex] = state
    if (state == true) {
        user.tasks[taskIndex].numberOfDoneSubtasks++;
    } else {
        user.tasks[taskIndex].numberOfDoneSubtasks--;
    }
    saveUser(user);
}


/**
 * Delete user task by index
 * @param {*} i the index
 */
function deleteUserTask(i) {
    let user = getUser();
    user.tasks.splice(i, 1);
    saveUser(user);
}


/**
 * Load current user tasks
 */
function loadUserTasks() {
    tasks = getUser().tasks;
}


/**
 * Save data
 * @param {String} name 
 * @param {String} data 
 */
function saveData(name, data) {
    putData(name, data)
        .catch(error => console.error(error));
}


/**
 * Load contacts
 * @returns {Array}
 */
async function loadContacts() {
    const contacts = await loadData("/contacts");   
    return contacts;
}


/**
 * Save contacts
 */
function saveContacts() {
    saveData("contacts", contactData);
}


/**
 * Load tasks
 * @returns {Array}
 */
async function loadTasks() {
    const tasks = await loadData("/tasks");
    return tasks;
}


/**
 * Save tasks
 */
function saveTasks() {
    saveData("tasks", tasks);
}


/**
 * Initializes shared components.
 * Initialisiert gemeinsame Komponenten.
 */
function sharedInit() {
    setProfileLetters();
}

/**
 * Set on the profile image the first letters from the username
 */
function setProfileLetters() {
    let profile = document.getElementById('nav_right_menu');
    if (profile) {
        let user = getUser();
        let firstAndLastName = user.name.split(" ");
        let firstLetter = '';
        let secondLetter = '';
        if (firstAndLastName.length == 2) {
            firstLetter = firstAndLastName[0][0];
            secondLetter = firstAndLastName[1][0];
        } else if (firstAndLastName.length == 1) {
            firstLetter = firstAndLastName[0][0];
        }
        let letters = firstLetter + secondLetter;
        profile.innerHTML = letters;
    }

}


/**
 * Retrieves initials from the input string.
 * Ruft Initialen aus dem Eingabestring ab.
 * 
 * @param {string} inputString - The input string from which to extract initials.
 *                               Der Eingabestring, aus dem die Initialen extrahiert werden sollen.
 * @returns {string} - The extracted initials.
 *                      Die extrahierten Initialen.
 */
function getInitials(inputString) {
    const words = inputString.split(` `);
    let initials = "";

    for (const word of words) {

        if (initials.length < 2) {
            initials += word.charAt(0);
        }

    }

    return initials.toUpperCase();
}

/**
 * Toggles the display of the "jura_container" element.
 * Schaltet die Anzeige des Elements "jura_container" um.
 */
function jura_window() {
    let juraContainer = document.getElementById(`jura_container`);

    if (juraContainer.style.display == "none" || juraContainer.style.display == "") {
        juraContainer.style.display = "flex";
        juraContainer.style.zIndex = "999";
    } else {
        juraContainer.style.display = "none";
    }
    event.stopPropagation();
}

/**
 * Redirects to the previous page.
 * Leitet zur vorherigen Seite weiter.
 */
function goBack() {
    // window.location.href = document.referrer;
    window.location.href = '/summary';
}

/**
 * Redirects to the login page.
 * Leitet zur Anmeldeseite weiter.
 */
function goBackLogin() {
    window.location.href = '/';
}

window.addEventListener('click', () => {
    let dropdown = document.getElementById('jura_container');
    if (dropdown.style.display == 'flex') {
        jura_window();
    }
});