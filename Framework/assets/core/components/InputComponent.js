import Component from '../Component.js';
import Input from '../elements/forms/Input.js';
import { InputType } from '../enums/InputType.js';

export default class InputComponent extends Component {
    constructor(context = null) {
        super()
        this.context = context;
    }

    build() {
        const node = new Input();
        const config = this.getConfig();
        config?.type ? node.type = config.type : node.type = InputType.TEXT;
        if (config?.placeholder) node.placeholder = config.placeholder;
        this.applyConfigToNode(node, config);
        return node;
    }
}