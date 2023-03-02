class TodoElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.active = this.hasAttribute("active");
    this.completed = this.hasAttribute("completed");
    this.render();
  }

  static get observedAttributes() {
    return ["active", "completed"];
  }

  attributeChangedCallback(name, old, now) {
    const selectClass = ["bg-blue-500", "text-white"];

    if (this.hasAttribute("active")) {
      if (!this.completed) {
        this.childNodes.forEach((child) => {
          if (child.tagName === "LI") {
            child.classList.add(...selectClass);
          }
        });
      }
    } else {
      this.childNodes.forEach((child) => {
        if (child.tagName === "LI") {
          child.classList.remove(...selectClass);
        }
      });
    }
  }

  render() {
    this.innerHTML = /*html*/ `
      ${(() => {
        if (this.completed) {
          return /*html*/ `
            <li class="flex w-full flex-row items-center justify-between py-2 px-4 bg-gray-300">
              <div class="flex items-center">
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input type="checkbox" id="checkbox" class="w-5 h-5 rounded-full accent-pink-500" checked disabled/>
                    <span class="ml-2"></span>
                  </label>
                </div>
                <div class="line-through text-gray-600">${this.name}</div>
              </div>
              <div>
                <button class="rounded bg-red-300 text-xl text-white px-1">x</button>
              </div>
            </li>
          `;
        } else {
          return /*html*/ `
            <li class="${`flex w-full flex-row items-center justify-between py-2 px-4`} ${
            this.active ? "bg-blue-500 text-white" : ""
          }"
            >
              <div class="flex items-center">
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input type="checkbox" id="checkbox" class="w-5 h-5 rounded-full accent-pink-500" />
                    <span class="ml-2"></span>
                  </label>
                </div>
                <div>${this.name}</div>
              </div>
              <div>
                <button
                  class="rounded bg-red-500 text-xl font-bold text-white hover:bg-red-600 px-1"
                  >x</button
                >
              </div>
            </li>
          `;
        }
      })()}
    `;
  }
}

customElements.define("todo-element", TodoElement);
