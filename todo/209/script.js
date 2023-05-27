const tasks = {
    all: [
        {id:1, title: 'Title1', description: 'Description 1', startDate: '', endDate:''},
        {id:2, title: 'Title2', description: 'Description 2', startDate: '', endDate:''},
        {id:3, title: 'Title3', description: 'Description 3', startDate: '', endDate:''},
    ],
    complete: [],
    overdue: [
        {id:9, title: 'Title9', description: 'Description 9', startDate: '', endDate:''},
        {id:10, title: 'Title10', description: 'Description 10', startDate: '', endDate:''},
    ]
}		

// set(tasks)

if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({
        all: [],
        complete: [],
        overdue: []
    }))
}

function get(){
    return JSON.parse( localStorage.getItem('tasks') )
}

function set(data){
    localStorage.setItem('tasks', JSON.stringify(data))
}

function update(type, data){
    const allTasks = get();
    allTasks[type].push(data);
    set(allTasks);
}

const navButtons = document.querySelectorAll('header nav button')
navButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const type = event.srcElement.id.split('-')[1];
        generateTasks(type)
    });
});

function generateTasks(type){
    const placeTasks = document.querySelector('div.tasks')
    const tasks = get()[type];

    let html = ''

    let navigate = type === 'all' 
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
                    ${ navigate }
                </div>
            </div>
        `
    }


    placeTasks.innerHTML = html;

    const titleTasks = document.getElementById('title-tasks');
    let name = '';
    
    const titleTasksClass = titleTasks.classList[1];
    titleTasks.classList.remove(titleTasksClass);

    if(type === 'all'){
        name = 'Все задачи'
        titleTasks.classList.add('title-all')
    } 
    else if(type === 'complete'){
        name = 'Выполненные задачи'
        titleTasks.classList.add('title-complete')
    } 
    else if(type === 'overdue'){
        name = 'Просроченные задачи'
        titleTasks.classList.add('title-overdue')
    }
    titleTasks.textContent = name;

    if(tasks.length === 0){
        placeTasks.innerHTML = `
            <div class="not-found-tasks">
                <h2>Задачи не найдены</h2>
            </div>
        `
    }

    const buttonComplete = document.querySelectorAll('button.button-complete');
    buttonComplete.forEach( button => {
        button.addEventListener('click', event => {
            let id = Number( button.parentNode.parentNode.id.split('-')[2] )
            let tasks = get()
            let index = tasks.all.findIndex((obj) => obj.id === id);

            tasks.complete.push(tasks.all[index]);
            tasks.all.splice(index, 1);

            set(tasks)
            generateTasks(type)
        })
    })

    const buttonDelete = document.querySelectorAll('button.button-delete');
    buttonDelete.forEach( button => {
        button.addEventListener('click', event => {
            const id = Number(button.parentNode.parentNode.id.split('-')[2]);
            const tasks = get();
            const index = tasks[type].findIndex( obj => obj.id === id);

            tasks[type].splice(index, 1);

            set(tasks);
            generateTasks(type);
        })
    })

    const openShowForm = document.getElementById('openShowForm');
    const addTask = document.querySelector('div.add-task')
    openShowForm.addEventListener('click', () => {
        addTask.style.display = 'flex';
        openShowForm.style.display = 'none';
    });

    document.getElementById('exitForm').addEventListener('click', () => {
        addTask.style.display = 'none';
        openShowForm.style.display = 'block';
    })

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const inputs = document.querySelectorAll('form input');
        let task = {
            title: '',
            description: '',
            startDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            endDate: ''
        }
        
        inputs.forEach(input => {
            if(input.id === 'endDate'){
                task.endDate = input.value.split('-').reverse().join('.')
            } else if(input.id === 'endDateTime') {
                task.endDate += ` ${input.value}`
            }else {
                task[input.id] += input.value
            }
        })

        console.log(task);

    })

}

window.onload = generateTasks('all');

