document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add-form').addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });

    document.getElementById('edit-form').addEventListener('submit', function (e) {
        e.preventDefault();
        saveTask();
    });
});

function addTask() {
    const taskInput = document.querySelector('[name="task"]');
    const taskDateInput = document.querySelector('[name="task_date"]');
    const taskTimeInput = document.querySelector('[name="task_time"]');
    const taskTitle = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;

    if (!taskTitle || !taskDate || !taskTime) return;

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ task: taskTitle, task_date: taskDate, task_time: taskTime })
    })
    .then(response => response.json())
    .then(task => {
        let taskContainer = document.querySelector(`#task-container h2[data-date="${task.task_date}"]`);
        if (!taskContainer) {
            const taskContainerDiv = document.getElementById('task-container');
            const newDateHeader = document.createElement('h2');
            newDateHeader.textContent = task.task_date;
            newDateHeader.dataset.date = task.task_date;
            taskContainerDiv.insertBefore(newDateHeader, taskContainerDiv.firstChild);
            const newTaskList = document.createElement('ul');
            newTaskList.className = 'task-list';
            taskContainerDiv.insertBefore(newTaskList, taskContainerDiv.children[1]);
            taskContainer = newDateHeader;
        }

        const taskList = taskContainer.nextElementSibling;
        const newTask = document.createElement('li');
        newTask.className = 'task';
        newTask.dataset.id = task.id;
        newTask.innerHTML = `
            <input type="checkbox" onclick="toggleTask(${task.id})">
            <span class="task-title">${task.title}</span>
            <span class="task-time">${task.task_time}</span>
            <a href="#" class="edit-btn" onclick="showEditForm(${task.id}, '${task.title}')">✏️</a>
            <a href="#" class="delete-btn" onclick="deleteTask(${task.id})">🗑️</a>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    });
}

function toggleTask(taskId) {
    fetch(`/toggle/${taskId}`, { method: 'POST' })
    .then(response => response.json())
    .then(task => {
        const taskElement = document.querySelector(`li[data-id="${task.id}"]`);
        taskElement.classList.toggle('completed', task.completed);
        taskElement.querySelector('input[type="checkbox"]').checked = task.completed;
    });
}

function deleteTask(taskId) {
    fetch(`/delete/${taskId}`, { method: 'POST' })
    .then(response => response.json())
    .then(result => {
        if (result.result === 'success') {
            const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
            taskElement.parentElement.removeChild(taskElement);
        }
    });
}

function showEditForm(taskId, taskTitle) {
    const editForm = document.getElementById('edit-form');
    const editTitle = document.getElementById('edit-task-title');
    editTitle.value = taskTitle;
    editForm.dataset.taskId = taskId;
    editForm.style.display = 'block';
}

function saveTask() {
    const editForm = document.getElementById('edit-form');
    const taskId = editForm.dataset.taskId;
    const taskTitle = document.getElementById('edit-task-title').value.trim();

    fetch(`/edit/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ title: taskTitle })
    })
    .then(response => response.json())
    .then(task => {
        const taskElement = document.querySelector(`li[data-id="${task.id}"] .task-title`);
        taskElement.textContent = task.title;
        editForm.style.display = 'none';
    });
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'active':
                task.style.display = task.classList.contains('completed') ? 'none' : '';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? '' : 'none';
                break;
        }
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn[onclick="filterTasks('${filter}')"]`).classList.add('active');
}
