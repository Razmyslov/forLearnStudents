if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({}));
}

const tasks = {
    all: [
        {title: '', description: '', id: 1, startDate: '', endDate: ''}
    ],
    complete: [],
    overdue: []
}

function set(data){localStorage.setItem('tasks', JSON.stringify(data))}
function get(){return JSON.parse(localStorage.getItem('tasks'))}
function update(key, data){
    let allTasks = get()
    allTasks[key].push(data)
    set(allTasks)
}





