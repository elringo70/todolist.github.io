class Task {
  constructor() {
    this.name = "";
    this.content = "";
    this.completed = false;
    this.active = false;
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
      name: formData.get("name").trim(),
      content: formData.get("content").trim(),
      completed: false,
      active: false,
    };

    this.#_taskList.push(formObject);
    this.#update();
  }

  get taskList() {
    return this.#_taskList;
  }

  #update() {
    window.localStorage.setItem("task-list", JSON.stringify(this.#_taskList));
  }

  selectTask(position) {
    this.#_taskList.forEach((task) => {
      task.active = false;
    });
    this.#_taskList[position].active = true;
    this.#update();
  }

  deleteTask(position) {
    this.#_taskList = this.#_taskList.filter(
      (element, index) => index !== position
    );
    this.#update();
  }

  getTodoDescription(position) {
    return this.#_taskList[position];
  }

  completeTodo(position) {
    this.#_taskList[position].completed = true;
  }
}

export { Task, TodoList };
