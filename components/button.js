export default class Button extends HTMLElement {
    constructor(){
        super();
        const label = this.textContent.trim() || 'Click me';
        this.textContent = '';

        const button = document.createElement('button');
        button.textContent = label;
        this.appendChild(button);
    }
}
customElements.define('button-component', Button);


