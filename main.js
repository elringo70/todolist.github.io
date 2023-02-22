import "./components/index.js";
import { UI } from "./models/UI.js";

const ui = new UI();

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  ui.createTaskElement(this);
  form.reset();
});
