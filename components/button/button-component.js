import Button from "../../components/elements/button.js";

export default class ButtonComponent extends Button {
    constructor(context = {}) {
        super();
        this.context = context;
        this.node = null;
    }

    build() {
        this.node = new Button();
        if (this.context.label) {
            this.node.textContent = this.context.label;
        }
        return this.node;
    }
}