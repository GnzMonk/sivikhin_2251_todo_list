const add_button = document.querySelector(".add_button")
const tasks_list = document.querySelector(".tasks_list")



let tasks = [];
add_button.addEventListener("click", () => {
    const task_value = document.querySelector(".task_title").value
    let new_task = {
        "name": task_value,
        "isDone": false
    }
    tasks.push(new_task)
    show_all_tasks()
});

const show_all_tasks = () => {
    let s = '';
    tasks.map((item, index) => {
        s += show_task(item, index)
    });
    tasks_list.innerHTML = s;
}

const show_task = (task, index) => {
    return `
    <div class="task">
        <p> ${task.name} - ${task.isDone}</p>
    </div>
    `
}