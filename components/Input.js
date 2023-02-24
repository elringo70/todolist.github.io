class Input extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.label = this.getAttribute("label") || null;
    this.name = this.getAttribute("name");
    this.type = "text" || this.getAttribute("type");
    this.required = this.hasAttribute("required");
    this.disabled = this.hasAttribute("disabled");
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="form-control mb-3 w-full">
        ${(() => {
          if (this.label) {
            return /*html*/ `
              <label class="mb-2 block text-sm font-bold uppercase leading-normal text-gray-600" for="${this.name}"
              >${this.label}</label>
            `;
          } else {
            return ``;
          }
        })()}

        <input 
          class="${`
            w-full rounded border border-gray-300 py-2 px-3 text-gray-600 focus:border-gray-500 focus:outline-none
            ${this.disabled ? "cursor-default disabled:bg-gray-100" : ""}
          `}"
          ${this.disabled ? "disabled" : ""}
          type="${this.type}"
          name="${this.name}"
          ${this.required ? "required" : ""}
        />
      </div>
    `;
  }
}

customElements.define("input-element", Input);
