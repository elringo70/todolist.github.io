import { TodoList } from "./TodoList.js";
const todoList = new TodoList();

class UI {
  constructor() {
    this.taskContainer = document.getElementById("task-container");
  }

  connectedCallback() {
    this.render();
  }

  createTaskElement(object) {
    todoList.createNewTodo(object);
    this.render();
  }

  render() {
    const taskList = todoList.taskList;

    while (this.taskContainer.hasChildNodes()) {
      this.taskContainer.removeChild(this.taskContainer.lastChild);
    }

    for (let task of taskList) {
      const todo = document.createElement("todo-element");
      todo.setAttribute("name", task.name);
      task.completed ? todo.setAttribute("completed", "") : "";
      this.taskContainer.appendChild(todo);
    }
  }
}

export { UI };
