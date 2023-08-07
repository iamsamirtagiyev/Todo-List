const todoWrapper = document.querySelector(".todo-wrapper");
const addBtn = document.querySelector(".add-btn");
const searchBtn = document.querySelector(".search-btn");
const mode = document.querySelector(".mode");
const addTodos = document.querySelector(".add-todo");
const todoInput = addTodos.querySelector("input");
const listContainer = document.querySelector("ul");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar input");
let count = 1;
let todos = [];
let checked = [];

addBtn.addEventListener('click', () => {
    if (todoInput.value == "") {
        alert("Bir Todo yazın");
    }
    else {
        addTodo(todoInput.value.trim());
        addStorage(todoInput.value.trim());
    }
});

todoInput.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        if (todoInput.value == "") {
            alert("Bir Todo yazın");
        }
        else {
            addTodo(todoInput.value.trim());
            addStorage(todoInput.value.trim());
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    check();
    todos.forEach((todo) => {
        addTodo(todo);
    });

    if(localStorage.getItem("light") != null){
        lightMode();
    }
});

searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle("open");
    listContainer.classList.toggle("open");
});

mode.addEventListener('click', () => {
    lightMode();
    if(localStorage.getItem("light") == null){
        localStorage.setItem("light", true);
    }
    else{
        localStorage.removeItem("light");
    }
});

function addTodo(text) {

    const li = document.createElement("li");
    li.className = "list";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "list";
    input.id = "list-" + (count++);
    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    const i = document.createElement("i");
    i.className = "bx bx-check";
    const span = document.createElement("span");
    span.textContent = text;
    const closeIcon = document.createElement("i");
    closeIcon.className = "bx bx-x";

    label.append(i);
    label.append(span);
    li.append(input);
    li.append(label);
    li.append(closeIcon);
    listContainer.append(li);

    closeIcon.addEventListener('click', () => {
        check();
        todos.forEach((todo, index) => {
            if (todo == li.textContent) {
                todos.splice(index, 1);
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        li.remove();
    });

    searchBar.addEventListener('input', (e) => {
        if (li.textContent.toLowerCase().includes(e.target.value.toLowerCase().trim())) {
            li.style.display = "";
        }
        else {
            li.style.display = "none";
        }
    });
}

function check() {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function addStorage(text) {
    check();
    todos.push(text);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";
}

function lightMode() {
    addTodos.classList.toggle("active");
    todoInput.classList.toggle("active");
    searchBar.classList.toggle("active");
    searchInput.classList.toggle("active");
    listContainer.classList.toggle("active");
    document.querySelectorAll(".list").forEach((li) => {
        li.classList.toggle("active");
    });
    if (mode.querySelector(".icon").className == "icon bx bx-moon") {
        mode.querySelector(".icon").classList.add("bx-sun");
        mode.querySelector(".icon").classList.remove("bx-moon");
    }
    else {
        mode.querySelector(".icon").classList.remove("bx-sun");
        mode.querySelector(".icon").classList.add("bx-moon");
    }
}