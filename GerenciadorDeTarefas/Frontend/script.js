const apiUrl = 'http://localhost:3000/api/tasks';
let filter = sessionStorage.getItem('filter') || 'all';

document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');

  const task = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    completed: false
  };

  if (!task.title || !task.description) return;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  if (res.ok) {
    const newTask = await res.json();
    localStorage.setItem(newTask._id, JSON.stringify(newTask));
    loadTasks();
    titleInput.value = '';
    descriptionInput.value = '';
  }
});

function setFilter(f) {
  filter = f;
  sessionStorage.setItem('filter', f);
  loadTasks();
}

async function loadTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    if (filter === 'pending' && task.completed) return;
    if (filter === 'completed' && !task.completed) return;

    const li = document.createElement('li');
    li.className = 'task-item';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'task-header';

    const titleSpan = document.createElement('span');
    titleSpan.className = `task-title ${task.completed ? 'completed' : ''}`;
    titleSpan.textContent = task.title;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = '✓';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    headerDiv.appendChild(titleSpan);
    headerDiv.appendChild(actionsDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'task-description hidden';
    descriptionDiv.textContent = task.description;

    titleSpan.addEventListener('click', () => {
      descriptionDiv.classList.toggle('hidden');
      titleSpan.classList.toggle('expanded');
    });

    completeBtn.addEventListener('click', () => {
      toggleComplete(task._id, task.completed);
    });

    deleteBtn.addEventListener('click', () => {
      deleteTask(task._id);
    });

    li.appendChild(headerDiv);
    li.appendChild(descriptionDiv);
    taskList.appendChild(li);
  });
}

async function toggleComplete(id, current) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !current })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  localStorage.removeItem(id);
  loadTasks();
}

window.onload = loadTasks;