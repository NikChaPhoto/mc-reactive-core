export default class Tbody extends HTMLElement {
    constructor(){
        super();
        const tbody = document.createElement('tbody');
        this.appendChild(tbody);
    }
}
customElements.define('tbody-component', Tbody);