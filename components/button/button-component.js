import Button from "../../components/elements/button.js";

export default class ButtonComponent {
    constructor(context = {}) {
        this.context = context;
        this.node = new Button(); // erzeugt <custom-button>
        if (context.label) {
            // this.node.setAttribute('label', context.label);
            this.node.textContent = context.label;
        }
    }

    build() {
        return this.node;
    }
}