$(document).ready(function(){
    loadTasks(function(response) {
        var taskList = JSON.parse(response);
        taskList.forEach(task => {
            criarLinhaTask(task)
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

function criarLinhaTask(task) {
    var htmlCard = criarCardTask(task)

    var linhaTask = `<div class="row board-cols">
                        <div class="col-12 col-md-2 px-3 py-2" id="default-col-${task.number}" ondrop="drop(event)" ondragover="allowDrop(event)">
                            ${task.status === "new" ? htmlCard : ''}
                        </div>
                        <div class="col-12 col-md">
                            <div class="board-col-item col-new" id="col-new-${task.number}" ondrop="drop(event)" ondragover="allowDrop(event)">
                                ${task.status === "started" ? htmlCard : ''}
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="board-col-item col-active" id="col-active-${task.number}" ondrop="drop(event)" ondragover="allowDrop(event)">
                                ${task.status === "active" ? htmlCard : ''}
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="board-col-item col-closed" id="col-closed-${task.number}" ondrop="drop(event)" ondragover="allowDrop(event)">
                                ${task.status === "closed" ? htmlCard : ''}
                            </div>
                        </div>
                    </div>`

    // console.log(document.getElementsByClassName("board-cols"))

    var divTaskboard = document.getElementById("taskboard");
    divTaskboard.insertAdjacentHTML("beforeend", linhaTask);

    // document.getElementById("taskboard").appendChild(htmlCard);  
}

/**
 * Cria html da tasks para incluir no board
 * @param {*} task 
 */
function criarCardTask(task) {
    var html = `<div class="task-card ${task.status}" id="task-card-${task.number}" draggable="true" ondragstart="drag(event)">
        <div class="task-card-inner">
            <p><b class="pr-2">${task.number}</b>${task.title}</p>
            <p class="text-muted"><i class="fas fa-user-circle"></i> ${task.author}</p>
            <p>State <span class="task-status">${task.status}</span></p>
        </div>
    </div>`

    return html
}