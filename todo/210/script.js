const tasks = {
    all: [{id:1, title: 'Title1', description: 'Description 1', startDate: '', endDate:''},{id:2, title: 'Title2', description: 'Description 2', startDate: '', endDate:''},{id:3, title: 'Title3', description: 'Description 3', startDate: '', endDate:''}],
    complete: [],
    overdue: [{id:9, title: 'Title9', description: 'Description 9', startDate: '', endDate:''},{id:10, title: 'Title10', description: 'Description 10', startDate: '', endDate:''}]
}		

// set(tasks)

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
        const type = event.srcElement.id.split('-')[1]
        generateTasks(type)
    })
})

function generateTasks(type){
    const tasks = get()[type];

    let html = ''

    const navigation = type === 'all'
        ? '<button class="button-complete green">Завершено</button><button class="button-delete red">Удалить</button>'
        : '<button class="button-delete red">Удалить</button>'

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
                    ${navigation}
                </div>
            </div>
        `
    }
    
    const titleTasks = document.getElementById('title-tasks')
    const classTitleTasks = titleTasks.classList[1];
    titleTasks.classList.remove(classTitleTasks);

    const nameTitleTasks = {
        all: 'Незавершенные задачи',
        complete: 'Заврешенные задачи',
        overdue: 'Просроченные задачи'
    }

    titleTasks.textContent = nameTitleTasks[type];
    titleTasks.classList.add(`title-${type}`);

    if(tasks.length === 0){
        html = `
            <div class='not-found-tasks'>
                <h2>Задачи не найдены</h2>
            </div>    
        `
    }

    placeTasks.innerHTML = html;

}

window.onload = generateTasks('all')
