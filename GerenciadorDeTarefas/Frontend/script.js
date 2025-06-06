const apiUrl = 'http://localhost:3000/api/tasks';
let filter = sessionStorage.getItem('filter') || 'all';

document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const task = { title, description, completed: false };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const newTask = await res.json();
  localStorage.setItem(newTask._id, JSON.stringify(newTask));
  loadTasks();
});

function setFilter(f) {
  filter = f;
  sessionStorage.setItem('filter', f);
  loadTasks();
}

async function loadTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();
  document.getElementById('task-list').innerHTML = '';
  tasks.forEach(task => {
    if (filter === 'pending' && task.completed) return;
    if (filter === 'completed' && !task.completed) return;
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
      <button onclick="toggleComplete('${task._id}', ${task.completed})">✓</button>
      <button onclick="deleteTask('${task._id}')">🗑️</button>
    `;
    document.getElementById('task-list').appendChild(li);
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
