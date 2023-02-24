import "./components/index.js";
import { UI } from "./models/UI.js";

const ui = new UI();

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  ui.createTaskElement(this);
  form.reset();
});

ui.taskContainer.addEventListener("click", function (e) {
  switch (e.target.tagName) {
    case "BUTTON":
      const elements = [...this.getElementsByTagName("todo-element")];
      elements.forEach((element, index) => {
        const position = parseInt(element.dataset.position, 10);
        if (position === index) {
          ui.deleteTask(position);
        }
      });
      break;
  }
});
