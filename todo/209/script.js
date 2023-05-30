if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({
        all: [],
        complete: [],
        overdue: []
    }))
}

if(!localStorage.getItem('id')){
    localStorage.setItem('id', JSON.stringify( 1 ))
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
    });

    document.getElementById('exitForm').addEventListener('click', () => {
        addTask.style.display = 'none';
    })

    checkOverdue();
}


let id = 1;
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const inputs = document.querySelectorAll('form input');
    let task = {
        title: '',
        description: '',
        startDate: new Date().toLocaleDateString() + '.' + new Date().toLocaleTimeString(),
        endDate: ''
    }
    
    inputs.forEach(input => {
        if(input.id === 'endDate'){
            task.endDate = input.value.split('-').reverse().join('.')
        } else if(input.id === 'endDateTime') {
            task.endDate += `.${input.value}`
        }else {
            task[input.id] += input.value
        }
    });

    inputs.forEach( input => input.value = '' );

    let id = JSON.parse( localStorage.getItem('id') )

    task.id = id;

    localStorage.setItem('id', JSON.stringify(++id))

    update('all', task);

    generateTasks('all');

    document.querySelector('div.add-task')
        .style.display = 'none';
})

window.onload = generateTasks('all');

function checkOverdue(){
    const allTasks = get();

    for(let task of allTasks['all']){
        const date = new Date().toLocaleDateString('ru-Ru')
            + '.' + new Date().toLocaleTimeString();
        console.log(date)

        const day = [ date.split('.')[0], task.endDate.split('.')[0] ]
        const mounth = [ date.split('.')[1], task.endDate.split('.')[1] ]
        const year = [ date.split('.')[2], task.endDate.split('.')[2] ]
        const time = [ date.split('.')[3], task.endDate.split('.')[3] ]

        if(day[0] < day[1] || mounth[0] < mounth[1] || year[0] < year[1] || time[0] < time[1]){
            const index = allTasks['all']
                .findIndex(obj => obj.id === task.id)
            
            allTasks['overdue'].push(task);
            allTasks['all'].splice(index, 1);
        }

    }

    set(allTasks);
    
    setInterval(()=>{
        checkOverdue()
    },30000)
}