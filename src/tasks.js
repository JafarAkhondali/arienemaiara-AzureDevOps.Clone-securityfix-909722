$(document).ready(function(){
    loadTasks(function(response) {
        var taskList = JSON.parse(response);
        taskList.forEach(task => {
            incluirTaskBoard(task)
        });
    });
})

function loadTasks(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");

    xobj.open("GET", "../data/tasks.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null); 
}

/**
 * Cria html da tasks para incluir no board
 * @param {*} task 
 */
function incluirTaskBoard(task) {
    var html = `<div class="task-card ${task.status}">
        <div class="task-card-inner">
            <p><b class="pr-2">${task.number}</b>${task.title}</p>
            <p class="text-muted"><i class="fas fa-user-circle"></i> ${task.author}</p>
            <p>State <span class="task-status">${task.status}</span></p>
        </div>
    </div>`
}