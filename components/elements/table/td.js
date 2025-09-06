export default class Td extends HTMLElement {
    constructor() {
        super();
        const td = document.createElement('td');
        this.appendChild(td);
    }
}
customElements.define('td-component', Td);