import { TodoList } from "./TodoList.js";
const todoList = new TodoList();

class UI {
  constructor() {
    this.taskContainer = document.getElementById("task-container");
    this.#render();
  }

  connectedCallback() {}

  createTaskElement(object) {
    todoList.createNewTodo(object);
    this.#render();
  }

  #emptyElementsArray() {
    this.taskContainer.innerHTML = /*html*/ `
      <li class="${`flex w-full flex-row items-center justify-between py-2 px-4 bg-gray-100 italic text-gray-400 cursor-default`}"
      >...sin tareas</li>
    `;
  }

  #render() {
    const taskList = todoList.taskList;

    while (this.taskContainer.hasChildNodes()) {
      this.taskContainer.removeChild(this.taskContainer.lastChild);
    }

    if (taskList.length > 0) {
      for (const [index, task] of taskList.entries()) {
        const todo = document.createElement("todo-element");
        todo.setAttribute("name", task.name);
        todo.setAttribute("data-position", index);
        task.completed ? todo.setAttribute("completed", "") : "";
        this.taskContainer.appendChild(todo);
      }
    } else {
      while (this.taskContainer.hasChildNodes()) {
        this.taskContainer.removeChild(this.taskContainer.lastChild);
      }
      this.#emptyElementsArray();
    }
  }

  activeElement(position) {
    for (let i = 0; i < this.taskContainer.childNodes.length; i++) {
      this.taskContainer.childNodes[i].removeAttribute("active");
    }
    this.taskContainer.childNodes[position].setAttribute("active", "");
  }

  deleteTask(position) {
    todoList.deleteTask(position);
    this.#render();
  }
}

export { UI };
