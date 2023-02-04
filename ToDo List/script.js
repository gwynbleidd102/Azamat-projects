const dom = {
    new: document.getElementById('new-task'),
    add: document.getElementById('add-task'),
    tasks: document.getElementById('tasks')
};

//массив задач
const tasks = [];

// отслеживаем клик на кнопку добавить
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if(newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks);
        dom.new.value = '';
        tasksRender(tasks)
    }
};

// фукнция добавления задачи
function addTask(text, list) {
    const timestamp = Date.now()
    const task = {
        id: timestamp,
        text,
        isComplete: false
    }
    list.push(task);
};

// проверка на повторное добавление задачи в массив задач
function isNotHaveTask(text, list) {
    let isNotHave = true;
    list.forEach((task) => {
        if(task.text === text) {
            alert('Данная задача уже существует.')
            isNotHave = false;
        }
    })
    return isNotHave;
};

// функция вывода списка задач
function tasksRender(list) {
    let htmlList = ''    

    list.forEach((task) => {
        const cls = task.isComplete 
            ? 'todo__task todo__task_complete'
            : 'todo__task'

        const isChecked = task.isComplete
            ? 'checked'
            : ''
            
        const taskHtml = `
        <div id="${task.id}" class="${cls}">
            <label class="todo__checkbox">
                <input type="checkbox" ${isChecked}>
                <div class="todo__checkbox-div"></div>
            </label>
            <div class="todo__task-text">${task.text}</div>
            <div class="todo__task-del">-</div>
        </div>
        `
        htmlList = htmlList + taskHtml
    })

    dom.tasks.innerHTML = htmlList
}

// отслеживаем клик по чекбоксу задачи
dom.tasks.onclick = (Event) => {
    const target = Event.target
    const isCheckboxEl = target.classList.contains('todo__checkbox-div')
    const isDeleteEl = target.classList.contains('todo__task-del')
   
    if (isCheckboxEl) {
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId, tasks)
        tasksRender(tasks)
    }    
    if (isDeleteEl) {
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        deleteTask(taskId, tasks)
        tasksRender(tasks)
    }
}

// функция изменения статуса задачи
function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
}


// удаление задач из списка
function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if (task.id == id) {
            list.splice(idx, 1)
        }
    })
}