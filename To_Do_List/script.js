function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskDate = document.getElementById('taskDate');
    let taskText = taskInput.value;
    let selectedDate = taskDate.value;
    
    if (taskText === '' || selectedDate === '') {
        alert('Please enter both task and date');
        return;
    }
    
    let dateObj = new Date(selectedDate);
    let dateString = dateObj.toLocaleDateString();
    
    let taskList = document.getElementById('taskList');
    
    let taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    taskItem.innerHTML = `
        <div class="task-content">
            <p class="task-text">${taskText}</p>
            <p class="task-date">Due: ${dateString}</p>
        </div>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    
    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskDate.value = '';
}

function deleteTask(button) {
    let taskItem = button.parentElement;
    taskItem.remove();
}
