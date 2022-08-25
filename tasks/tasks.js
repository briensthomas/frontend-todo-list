import { addTask, getTasks, checkUser, updateTask, deleteTask } from '../fetch-utils.js';

const taskSectionEl = document.getElementById('task-section');
const taskForm = document.getElementById('task-form');
// const greeting = document.getElementById('greeting');

let tasks = [];



async function onLoad() {
    checkUser();
    tasks = await getTasks();
    displayTasks();
}

async function renderTasks(task) {
    const div = document.createElement('div');
    div.classList.add('notification');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await deleteTask(task.id);
        onLoad();
    });

    const p = document.createElement('p');
    p.classList.add('message-body');
    p.textContent = `${task.detail}`;

    const createdAt = document.createElement('span');
    createdAt.textContent = `${task.created_at}`;

    const spanStatus = document.createElement('span'); 
    spanStatus.textContent = `${task.status ? '✔' : '⬛'}`;
    spanStatus.addEventListener('click', async (e) => {
        e.preventDefault();
        await updateTask(task.id, { status: !task.status });
        onLoad();
    });
    
    div.append(spanStatus, p, deleteButton, createdAt);
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