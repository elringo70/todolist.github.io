class Task {
  constructor() {
    this.name = "";
    this.content = "";
    this.completed = false;
  }
}

class TodoList {
  #_taskList;

  constructor() {
    this.#_taskList = JSON.parse(this.getTasksFromListLocalStorage()) || [];
  }

  getTasksFromListLocalStorage() {
    return window.localStorage.getItem("task-list");
  }

  createNewTodo(object) {
    const formData = new FormData(object);

    const formObject = {
      name: formData.get("name"),
      content: formData.get("content"),
      completed: false,
    };

    this.#_taskList.push(formObject);
    this.#update();
  }

  get taskList() {
    return this.#_taskList;
  }

  #update() {
    window.localStorage.setItem("task-list", JSON.stringify(this.taskList));
  }

  deleteTask(position) {
    this.#_taskList = this.#_taskList.filter(
      (element, index) => index !== position
    );
    this.#update();
  }
}

export { Task, TodoList };
