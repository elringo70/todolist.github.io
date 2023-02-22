class TodoElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.active = this.hasAttribute("active");
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <li class="${`flex w-full flex-row items-center justify-between py-2 px-4 hover:bg-gray-200
        ${this.active ? "bg-blue-500 text-white" : ""}
      `}"
      >${this.name}</li>
    `;
  }
}

customElements.define("todo-element", TodoElement);
