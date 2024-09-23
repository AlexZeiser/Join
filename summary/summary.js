/**
 * Initializes the board by displaying board information and greeting.
 * Initialisiert das Board, indem die Board-Informationen und die Begrüßung angezeigt werden.
 */
async function init() {
    let user = getUser();
    tasks = user.tasks;

    showBoardInfos();
    displayGreeting();
    setGreetingName();    
}

/**
 * Displays board information such as task counts and due dates.
 * Zeigt Board-Informationen wie Aufgabenanzahl und Fälligkeitsdaten an.
 */
function showBoardInfos() {
    /**
     * @type {HTMLElement}
     */
    let todoCounter = document.getElementById(`todo`);
    /**
     * @type {HTMLElement}
     */
    let doneCounter = document.getElementById(`done`);
    /**
     * @type {HTMLElement}
     */
    let urgentCounter = document.getElementById(`urgent`);
    /**
     * @type {HTMLElement}
     */
    let inprogressCounter = document.getElementById(`number_in_progress`);
    /**
     * @type {HTMLElement}
     */
    let totalCounter = document.getElementById(`number_in_board`);
    /**
     * @type {HTMLElement}
     */
    let awaitCounter = document.getElementById(`number_awaiting_feedback`);
    /**
     * @type {HTMLElement}
     */
    let date = document.getElementById(`date`);

    totalCounter.innerHTML = tasks.length;

    todoCounter.innerHTML = tasks.filter(task => task.section == `To do`).length;
    doneCounter.innerHTML = tasks.filter(task => task.section == `Done`).length;
    inprogressCounter.innerHTML = tasks.filter(task => task.section == `In progress`).length;
    awaitCounter.innerHTML = tasks.filter(task => task.section == `Await Feedback`).length;
    
    urgentCounter.innerHTML = tasks.filter(task => task.prio == `Urgent`).length;

    let nextDateTasks = tasks.filter(task => task.section != `Done`).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (nextDateTasks.length > 0) {
        date.innerHTML = new Date(nextDateTasks[0].dueDate).toLocaleDateString('de-DE');
    }
}

/**
 * Displays a greeting message based on the current time.
 * Zeigt eine Begrüßungsnachricht basierend auf der aktuellen Zeit an.
 */
function displayGreeting() {
    /**
     * @type {Date}
     */
    const currentTime = new Date();
    /**
     * @type {number}
     */
    const currentHour = currentTime.getHours();

    let greeting = "";
    if (currentHour < 12) {
        greeting = "Good morning,";
    } else if (currentHour < 18) {
        greeting = "Good afternoon,";
    } else {
        greeting = "Good evening,";
    }

    /**
     * @type {HTMLElement}
     */
    const greetingDiv = document.getElementById("greet_info");

    greetingDiv.textContent = greeting;
}

/**
 * Display the current username on the greeting screen at the beginning
 * Zeigt am anfang der Summary den aktuellen Benutzernamen an
 */
function setGreetingName() {
    let greetName = document.getElementById('greet_name');
    let user = getUser();
    greetName.innerHTML = user.name;
}