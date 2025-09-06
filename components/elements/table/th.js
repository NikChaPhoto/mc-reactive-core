export default class Th extends HTMLElement {
    constructor() {
        super();
        const th = document.createElement('th');
        this.appendChild(th);
    }
}
customElements.define('th-component', Th);