const add_button = document.querySelector(".add_button")
const tasks_list = document.querySelector(".tasks_list")

// Что-то в духе Enum`а
const Stage = { NotDone: "not done", InProgress: "in progress", Done: "done" }
const Category = { Home: "home", Study: "study", Work: "work", Any: "any" }



let tasks = [];
add_button.addEventListener("click", () => {
    const task_value = document.querySelector(".task_title").value
    const categories_value = document.querySelector(".categories").value
    let new_task = {
        "name": task_value,
        "stage": Stage.NotDone,
        "category": Category[categories_value]
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
        <p> ${task.name} - ${task.stage} - ${task.category}</p>
        <button class="delete_button" onclick="del_task(${index})">del</button>
        <button class="update_button" onclick="upd_task(${index})">upd</button>
    </div>
    `
}

const del_task = (index) => {
    tasks.splice(index, 1)
    show_all_tasks()
}

const set_task_value = (index, new_value) => {
    let new_tasks = [
        ...tasks.slice(0, index),
        {
            "name": new_value,
            "stage": tasks[index].stage,
            "categories": tasks[index].categories
        },
        ...tasks.slice(index + 1)
    ]
    tasks = new_tasks
    // close form?
    show_all_tasks()
}