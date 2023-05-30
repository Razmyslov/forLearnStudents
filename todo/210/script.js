if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({
        all: [],
        complete: [],
        overdue: [],
    }));
}

let id = 1 // хранить id в локалке

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

    const completeButtons = document.querySelectorAll('button.button-complete');
    completeButtons.forEach( button => {
        button.addEventListener('click', event => {
            const id = Number(button.parentNode.parentNode.id.split('-')[2]);
            const tasks = get();
            const index = tasks.all.findIndex( (task) => task.id === id);

            tasks.complete.push( tasks.all[index] );
            tasks.all.splice(index, 1);

            set(tasks);

            generateTasks(type);
        });
    });

    const deleteButtons = document.querySelectorAll('button.button-delete');
    deleteButtons.forEach( button => {
        button.addEventListener('click', ()=>{
            const id = Number(button.parentNode.parentNode.id.split('-')[2]);
            const tasks = get();
            const index = tasks[type].findIndex( obj => obj.id === id )

            tasks[type].splice(index, 1);

            set(tasks);
            generateTasks(type);
        });
    });

    const openShowForm = document.getElementById('openShowForm')
    const addTask = document.querySelector('div.add-task');
    openShowForm.addEventListener('click', ()=>{
        addTask.style.display = 'flex'
    });

    const exitForm = document.getElementById('exitForm');
    exitForm.addEventListener('click', () => {
        addTask.style.display = 'none'
    })

    const form = document.querySelector('form')
    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const task = {
            title: '',
            description: '',
            startDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            endDate: ''
        }

        const inputs = document.querySelectorAll('form input');

        inputs.forEach( input => {
            if(input.id === 'endDate'){
                task.endDate = input.value.split('-').reverse().join('.')
            } else if(input.id === 'endDateTime'){
                task.endDate += ` ${input.value}`
            } else{
                task[input.id] = input.value
            }
        })

        addTask.style.display = 'none';

        task.id = id;

        id++

        update('all', task);

        generateTasks(type);
    })

}

window.onload = generateTasks('all');