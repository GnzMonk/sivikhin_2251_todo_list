const add_button = document.querySelector(".add_button")
const tasks_list = document.querySelector(".tasks_list")

// Что-то в духе Enum`а
const Stage = { NotDone: "notdone", InProgress: "inprogress", Done: "done" }
const Category = { Home: "home", Study: "study", Work: "work", Other: "other" }
const Priority = { Low: "low", Medium: "medium", High: "high" }



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
        <div class="task_left">
            <div class="category_div color_${task.category}"></div>
            <p class="task_name">${task.name}</p>
            <div class="del_upd_buttons">
                <button class="delete_button" onclick="del_task(${index})">del</button>
                <button class="update_button" onclick="edit_task(${index})">edit</button>
            </div>
        </div>
        <div class="task_right stage_${task.stage}">
            <button class="next_button" onclick="next_step(${index})">></button>
        </div>
    </div>
    <div class="edit_window${index} edit_win"></div>
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
            "category": tasks[index].category
        },
        ...tasks.slice(index + 1)
    ]
    tasks = new_tasks
    // close form?
    show_all_tasks()
}

const set_task_stage = (index, new_stage) => {
    let new_tasks = [
        ...tasks.slice(0, index),
        {
            "name": tasks[index].name,
            "stage": new_stage,
            "category": tasks[index].category
        },
        ...tasks.slice(index + 1)
    ]
    tasks = new_tasks
    show_all_tasks()
}

const next_step = (index) => {
    switch (tasks[index].stage) {
        case Stage.NotDone:
            set_task_stage(index, Stage.InProgress)
            break;
        case Stage.InProgress:
            set_task_stage(index, Stage.Done)
            break;
    }
}

const edit_task = (index) => {
    const edit_window = document.querySelector(`.edit_window${index}`)
    edit_window.classList.add("visible");
    edit_window.innerHTML = `
    <p>Test edit</p>
    `;
}
