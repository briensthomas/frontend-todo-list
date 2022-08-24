import { addTask, getTasks, checkUser } from '../fetch-utils.js';

const taskSectionEl = document.getElementById('task-section');
const taskForm = document.getElementById('task-form');

let tasks = [];



async function onLoad() {
    checkUser();
    tasks = await getTasks();
    displayTasks();
}

async function renderTasks(task) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = `${task.detail}`;

    const createdAt = document.createElement('span');
    createdAt.textContent = `${task.created_at}`;

    const span = document.createElement('span'); 
    span.textContent = `${task.status ? true === '✔' : '⬛'}`;
    
    div.append(p, createdAt, span);
    return div;
}

async function displayTasks() {
    taskSectionEl.textContent = '';

    for (let task of tasks) {
        const taskList = await renderTasks(task);
        taskSectionEl.append(taskList);
    }
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(taskForm);
    const newTask = await addTask({
        detail: data.get('detail')
    });
    onLoad();
    tasks.push(newTask);
    taskForm.reset();
});

onLoad();