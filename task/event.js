let inputSubtask = document.getElementById("subtask_input");

inputSubtask.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        pushSubtask();
        subtaskOverflowCheck();
    }
})