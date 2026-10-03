export default class Table extends HTMLElement {
    constructor() {
        super();
        this.component = document.createElement('table')
        return this.component;
        // this.appendChild(this.component);
    }
}
customElements.define('table-component', Table);