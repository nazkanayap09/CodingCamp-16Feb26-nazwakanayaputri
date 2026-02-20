// =======================
// THEME SYSTEM
// =======================

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    }
});

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// =======================
// TODO SYSTEM
// =======================

let todos = [];
let currentFilter = "all";

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    if (todoInput.value.trim() === "" || todoDate.value === "") {
        alert("Masukkan tugas dan tanggal terlebih dahulu.");
        return;
    }

    const newTodo = {
        todo: todoInput.value.trim(),
        date: todoDate.value,
        completed: false
    };

    todos.push(newTodo);

    todoInput.value = "";
    todoDate.value = "";

    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    const filteredTodos = todos.filter(item => {
        if (currentFilter === "active") return !item.completed;
        if (currentFilter === "completed") return item.completed;
        return true;
    });

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <li class="text-gray-500 italic text-center py-4">
                Tidak ada tugas pada kategori ini
            </li>`;
        return;
    }

    filteredTodos.forEach((item) => {
        const originalIndex = todos.indexOf(item);

        todoList.innerHTML += `
        <li onclick="toggleTodo(${originalIndex})"
            class="cursor-pointer p-3 rounded-lg
            bg-blue-50 dark:bg-blue-800
            hover:scale-[1.01] transition">

            <p class="text-lg ${item.completed ? 'line-through text-gray-400' : ''}">
                ${item.todo}
                <span class="text-sm text-blue-600 dark:text-blue-300">
                    (${item.date})
                </span>
            </p>
        </li>`;
    });
}

function deleteAllTodos() {
    todos = [];
    renderTodos();
}

function filterTodos(status) {
    currentFilter = status;
    renderTodos();
}