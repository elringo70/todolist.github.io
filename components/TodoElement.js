class TodoElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.render();
    this.addEventListener("click", function (e) {
      console.log(e.target);
    });
  }

  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, old, now) {
    if (this.hasAttribute("active")) {
    }
  }

  render() {
    this.innerHTML = /*html*/ `
      <li class="${`flex w-full flex-row items-center justify-between py-2 px-4 hover:bg-gray-200`}"
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
