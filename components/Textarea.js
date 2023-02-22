class Textarea extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.label = this.getAttribute("label") || null;
    this.cols = this.getAttribute("cols") || "";
    this.rows = this.getAttribute("rows") || "8";
    this.disabled = this.hasAttribute("disabled");
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        textarea {
          resize: none;
        }
      </style>

      <div class="form-control mb-3 w-full">
        ${(() => {
          if (this.label) {
            return /*html*/ `
              <label class="mb-2 block text-sm font-bold uppercase leading-normal text-gray-600" for="${this.name}">
                ${this.label}
              </label>
            `;
          } else {
            return ``;
          }
        })()}
        <textarea
          name="${this.name}"
          id="${this.name}"
          cols="${this.cols}"
          rows="${this.rows}"
          class="${`
            w-full rounded border border-gray-300 py-2 px-3 text-gray-600 focus:border-gray-500 focus:outline-none
            ${this.disabled ? "cursor-default disabled:bg-gray-200" : ""}
          `}"
          ${this.disabled ? "disabled" : ""}
        ></textarea>
      </div>
    `;
  }
}

customElements.define("textarea-element", Textarea);
