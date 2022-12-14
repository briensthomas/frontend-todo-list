/* eslint-disable no-console */
const BASE_URL = 'https://brien-todo-list.herokuapp.com';

// User auth/redirect functions //

export async function signUpUser(userInfo) {
    const res = await fetch(`${BASE_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        credentials: 'include',
    });

    const data = await res.json();
    if (res.ok) {
        location.replace('/tasks');
    } else {
        console.error(data.message);
    }
}

export async function signInUser(userInfo) {
    const res = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        credentials: 'include',
    });

    const data = await res.json();
    if (res.ok) {
        location.replace('/tasks');
    } else {
        console.error(data.message);
    }
}

export async function getUser() {
    const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (res.ok) {
        const user = await res.json();
        return user;
    }
}

export async function checkUser() {
    const user = await getUser();
    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    const user = await getUser();
    if (user) {
        location.replace('./tasks');
    }
}

// Fetch task functions

export async function getTasks() {
    const res = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, 
        credentials: 'include'
    });
    if (res.ok) {
        const tasks = await res.json();
        return tasks;
    }
}

export async function addTask(taskInfo) {
    const res = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(taskInfo),
        credentials: 'include',
    });
    if (res.ok) {
        const task = await res.json();
        return task;
    }
}

export async function updateTask(id, status) {
    const res = await fetch(`${BASE_URL}/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(status),
        credentials: 'include',
    });
    if (res.ok) {
        const task = await res.json();
        return task;
    }}

export async function deleteTask(id) {
    const res = await fetch(`${BASE_URL}/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        credentials: 'include',
    });
    if (res.ok) {
        const task = await res.json();
        return task;
    }
}