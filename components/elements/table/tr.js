export default class Tr extends HTMLElement {
    constructor() {
        super();
        const tr = document.createElement('tr');
        this.appendChild(tr);
    }
}
customElements.define('tr-component', Tr);