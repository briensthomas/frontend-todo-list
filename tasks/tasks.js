import { getTasks, getUser } from '../fetch-utils';

const taskListEl = document.getElementById('task-list');

async function onLoad() {
    const user = await getUser();
    if (!user) location.replace('../');
    
    displayTasks();
}

async function renderTasks(task) {
    const li = document.createElement('li');
    li.textContent = `${task.detail}`;
    return li;
}

async function displayTasks() {
    const tasks = await getTasks();
    
    for (let task of tasks) {
        const taskList = renderTasks(task);
        taskListEl.append(taskList);
    }
}

onLoad();