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
  //const elements = this.childNodes;

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
      if (elements.length > 0) {
        elements.forEach((element) => {
          const position = parseInt(element.dataset.position, 10);
          const target = parseInt(e.srcElement.parentElement.dataset.position);
          if (position === target) {
            ui.activeElement(position);
          }
        });
      }
      break;
    case "INPUT":
      if (elements.length > 0) {
        elements.forEach((element) => {
          const position = parseInt(element.dataset.position, 10);
          const target = e.target;

          if (
            position ===
            parseInt(target.closest("todo-element").dataset.position, 10)
          ) {
            const task = ui.getTaskDescription(position);

            ui.activeElement(position);

            if (target.checked) {
              Swal.fire({
                icon: "warning",
                title: "¿Completar la tarea?",
                html: /*html*/ `
                  <h1 class="text-grey-darkest text-3xl">${task.name}</h1>
                  <div class="flex border-t p-3 cursor-default mt-4">
                    <p class="text-grey-darkest text-justify">${task.content}</p>
                  </div>
                `,
                confirmButtonText: "Completar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  ui.completeTask(position);
                } else {
                  target.checked = false;
                }
              });
            }
          }
        });
      }
      break;
  }
});

ui.taskContainer.addEventListener("dblclick", function (e) {
  const elements = this.childNodes;

  switch (e.target.tagName) {
    case "LI":
      const lis = this.getElementsByTagName("todo-element");

      if (lis.length > 0) {
        elements.forEach((element, index) => {
          const position = parseInt(element.dataset.position, 10);
          const target = parseInt(e.srcElement.parentElement.dataset.position);

          if (position === target) {
            const task = ui.getTaskDescription(position);
            Swal.fire({
              html: /*html*/ `
                <h1 class="text-grey-darkest text-4xl">${task.name}</h1>
                <div class="flex border-t p-3 rounded cursor-default mt-4">
                  <p class="text-grey-darkest text-justify">${task.content}</p>
                </div>
              `,
              showConfirmButton: true,
            });
            //ui.getTaskDescription(position);
          }
        });
      }
      break;
  }
});
