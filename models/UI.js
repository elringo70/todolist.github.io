import { TodoList } from "./TodoList.js";
const todoList = new TodoList();

export class UI {
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

    this.taskContainer.innerHTML = "";

    if (taskList.length > 0) {
      for (const [index, task] of taskList.entries()) {
        const todo = document.createElement("todo-element");
        todo.setAttribute("name", task.name);
        todo.setAttribute("data-position", index);

        if (taskList.length === 1) {
          todo.setAttribute("active", "");
          todoList.selectTask(0);
        } else {
          task.active ? todo.setAttribute("active", "") : "";
        }

        task.completed ? todo.setAttribute("completed", "") : "";
        this.taskContainer.appendChild(todo);
      }
    } else {
      this.taskContainer.innerHTML = "";
      this.#emptyElementsArray();
    }
  }

  activeElement(position) {
    for (let i = 0; i < this.taskContainer.childNodes.length; i++) {
      this.taskContainer.childNodes[i].removeAttribute("active");
    }
    this.taskContainer.childNodes[position].setAttribute("active", "");
    todoList.selectTask(position);
  }

  deleteTask(position) {
    todoList.deleteTask(position);
    this.#render();
  }

  getTaskDescription(position) {
    return todoList.getTodoDescription(position);
  }

  completeTask(position) {
    todoList.completeTodo(position);
    this.#render();
  }
}
