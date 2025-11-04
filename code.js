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
    const priorities_value = document.querySelector(".priorities").value
    let new_task = {
        "name": task_value,
        "stage": Stage.NotDone,
        "category": Category[categories_value],
        "priority": Priority[priorities_value]
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

const set_task_values = (index, new_name, new_stage, new_category, new_priority) => {
    let new_tasks = [
        ...tasks.slice(0, index),
        {
            "name": new_name,
            "stage": new_stage,
            "category": new_category,
            "priority": new_priority
        },
        ...tasks.slice(index + 1)
    ]
    tasks = new_tasks
    show_all_tasks()
}

const set_task_stage = (index, new_stage) => {
    let new_tasks = [
        ...tasks.slice(0, index),
        {
            "name": tasks[index].name,
            "stage": new_stage,
            "category": tasks[index].category,
            "priority": tasks[index].priority
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
    <div class="task_editor">
        <div class="top_editor">
            <input class="editor_input" type="text" value="${tasks[index].name}" required>
            <button onclick="cancel_edit(${index})">cancel</button>
        </div>
        <div class="bottom_editor">
            <select class="editor_categories">
                <option value="Other" ${tasks[index].category == Category.Other ? "selected" : ""}>Other</option>
                <option value="Home" ${tasks[index].category == Category.Home ? "selected" : ""}>Home</option>
                <option value="Study" ${tasks[index].category == Category.Study ? "selected" : ""}>Study</option>
                <option value="Work" ${tasks[index].category == Category.Work ? "selected" : ""}>Work</option>
            </select>

            <select class="editor_priorities">
                <option value="Low" ${tasks[index].priority == Priority.Low ? "selected" : ""}>Low</option>
                <option value="Medium" ${tasks[index].priority == Priority.Medium ? "selected" : ""}>Medium</option>
                <option value="High" ${tasks[index].priority == Priority.High ? "selected" : ""}>High</option>
            </select>

            <select class="editor_stage">
                <option value="NotDone" ${tasks[index].stage == Stage.NotDone ? "selected" : ""}>Not done</option>
                <option value="InProgress" ${tasks[index].stage == Stage.InProgress ? "selected" : ""}>In progress</option>
                <option value="Done" ${tasks[index].stage == Stage.Done ? "selected" : ""}>Done</option>
            </select>
            <button onclick="ok_edit(${index})">ok</button>
        </div>
    </div>
    `;
}

const cancel_edit = (index) => {
    const edit_window = document.querySelector(`.edit_window${index}`);
    edit_window.classList.remove("visible")
}

const ok_edit = (index) => {
    const edit_window = document.querySelector(`.edit_window${index}`);

    const input_value = edit_window.querySelector(".editor_input").value;
    const categories_value = edit_window.querySelector(".editor_categories").value;
    const priorities_value = edit_window.querySelector(".editor_priorities").value;
    const stage_value = edit_window.querySelector(".editor_stage").value;
    if (input_value == "") {
        alert("Empty task name");
        return;
    }
    set_task_values(index, input_value, Stage[stage_value], Category[categories_value], Priority[priorities_value])
    cancel_edit(index)
}
