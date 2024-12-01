let tasks = [];

// Function to render tasks
function renderTasks(filter = '', search = '') {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        const matchesPriority = filter ? task.priority === filter : true;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                              task.description.toLowerCase().includes(search.toLowerCase());
        return matchesPriority && matchesSearch;
    });
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description}<br>
            Deadline: ${task.deadline} | Priority: ${task.priority}
            <span class="edit-btn" onclick="editTask('${task.title}')">Edit</span>
            <span class="delete-btn" onclick="deleteTask('${task.title}')">Delete</span>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a task
document.getElementById('add-task').addEventListener('click', () => {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    if (title && description && deadline) {
        tasks.push({ title, description, deadline, priority });
        renderTasks();
        clearInputs();
    }
});

// Function to clear input fields
function clearInputs() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('task-priority').value = 'low';
}

// Function to delete a task
function deleteTask(title) {
    tasks = tasks.filter(task => task.title !== title);
    renderTasks();
}

// Function to edit a task
function editTask(title) {
    const task = tasks.find(t => t.title === title);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-deadline').value = task.deadline;
        document.getElementById('task-priority').value = task.priority;
        deleteTask(title); // Remove the task to edit
    }
}

// Filtering tasks by priority
document.getElementById('filter-priority').addEventListener('change', (event) => {
    const filterValue = event.target.value;
    renderTasks(filterValue);
});

// Searching tasks
document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchQuery = event.target.value;
    renderTasks(document.getElementById('filter-priority').value, searchQuery);
});