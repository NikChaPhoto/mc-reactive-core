export default class Button extends HTMLElement {
    constructor() {
        super();
        this.component = document.createElement("button");
        this.component.textContent = this.textContent || "Click me";
        console.log(this);
        console.log(this.component);
        return this.component;
    }

    // set label(value) {
    //     this.setAttribute('label', value);
    // }

}
customElements.define("custom-button", Button);


