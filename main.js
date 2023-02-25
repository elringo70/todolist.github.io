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
  const elements = [...this.getElementsByTagName("todo-element")];

  switch (e.target.tagName) {
    case "BUTTON":
      elements.forEach((element, index) => {
        const position = parseInt(element.dataset.position, 10);
        if (position === index) {
          Swal.fire({
            icon: "warning",
            title: "¿Desea eliminar la tarea?",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`,
            confirmButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              ui.deleteTask(position);
            }
          });
        }
      });
      break;
    case "LI":
      elements.forEach((element, index) => {
        console.log(e.target.dataset.position);
      });
      break;
  }
});
