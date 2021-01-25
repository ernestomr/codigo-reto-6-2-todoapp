class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if(!this.tasks) {
            this.tasks = [
                {task: 'Task 1', isComplete: false},
                {task: 'Task 2', isComplete: true},
                {task: 'Task 3', isComplete: false},
            ];
        }

        this.loadTasks();
        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('addTask').addEventListener("keypress", event => {
            if(event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = ""
    }

    addTask(task) {
        let newTask = {
            task,
            isComplete: false,
        };
        let parentDiv = document.getElementById('addTask').parentElement;
        if(task === '') {
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }

    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    generateTaskHtml(task, index) {
        return `
        <li class="row">
            <div class="task-text ${task.isComplete?'complete':''}">
              ${task.task}
            </div>

            <div class="checkbox">
              <label>
                <input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete?'checked':''}>
              </label>
            </div>
        </li>
      `;
    }

    loadTasks() {
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
        let tasksHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = tasksHtml;
    }
}

let toDo;

window.addEventListener("load", () => {
    toDo = new ToDoClass();
});