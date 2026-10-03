export default class Div extends HTMLElement {
    constructor(){
        super();
        const div = document.createElement('div');
        return div;
        //this.appendChild(div);
    }
}
customElements.define('div-component', Div);