if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({
        all: [],
        complete: [],
        overdue: [],
    }));
}

let id = 2

function set(data){localStorage.setItem('tasks', JSON.stringify(data))}
function get(){return JSON.parse(localStorage.getItem('tasks'))};
function update(key, data){
    let allTasks = get()
    allTasks[key].push(data)
    set(allTasks)
}

const placeTasks = document.querySelector('main div.tasks');

const navButtons = document.querySelectorAll('header nav button');
navButtons.forEach( button  => {
    button.addEventListener('click', event => {
        generateTasks(event.srcElement.id.split('-')[1])
    })
})

function generateTasks(type){
    const tasks = get()[type];

    let html = ''
    
    for(let task of tasks){
        html += `
            <div class="task ${type}" id="task-id-${task.id}">
                <div class="info">
                    <h3 class="task-name">${task.title}</h3>
                    <p class="task-description">${task.description}</p>
                    <p class="task-date">
                        <span class="date-start">${task.startDate}</span>
                        до
                        <span class="date-end">${task.endDate}</span>
                    </p>
                </div>
                <div class="navigate">
                    <button class="button-complete green">Завершено</button>
                    <button class="button-delete red">Удалить</button>
                </div>
            </div>
        `
    }
    placeTasks.innerHTML = html;
}

window.onload = generateTasks('all')