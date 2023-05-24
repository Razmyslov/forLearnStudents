const task = `
    <div class="task all" id="task-id-1">
        <div class="info">
            <h3 class="task-name">Name title</h3>
            <p class="task-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur blanditiis consectetur, consequuntur dicta dolorem dolores error est eveniet fugiat, incidunt inventore perspiciatis porro reiciendis rerum suscipit temporibus, totam velit.</p>
            <p class="task-date">
                <span class="date-start">2023-05-11 12:12</span>
                до
                <span class="date-end">2023-05-11 14:45</span>
            </p>
        </div>
        <div class="navigate">
            <button class="button-complete green">Завершено</button>
            <button class="button-delete red">Удалить</button>
        </div>
    </div>
`

if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({
        all: [],
        complete: [],
        overdue: [],
    }));
}

let id = 2

const tasks = {
    all: [
        {title: 'Title 1', description: 'description 1', id: 1, startDate: '---', endDate: '==='},
        {title: 'Title 2', description: 'description 2', id: 2, startDate: '---', endDate: '==='},
        {title: 'Title 3', description: 'description 3', id: 3, startDate: '---', endDate: '==='},
        {title: 'Title 4', description: 'description 4', id: 4, startDate: '---', endDate: '==='},
    ],
    complete: [],
    overdue: []
}

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
    })
})

set(tasks)
