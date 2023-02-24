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
      >
        <div>${this.name}</div>
        <div>
          <button
            class="rounded bg-red-500 text-xl font-bold text-white hover:bg-red-600 px-1"
            >x</button
          >
        </div>
      </li>
    `;
  }
}

customElements.define("todo-element", TodoElement);
