export default class Table extends HTMLElement {
    constructor() {
        super();
        const table = document.createElement('table')
        this.appendChild(table);
    }
}
customElements.define('table-component', Table);