import Component from '../../Component.js';
import Button from '../../elements/forms/Button.js';

export default class ButtonComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }

    build() {
        const node = new Button();

        const config = this.getConfig();
        if (config?.type) node.type = config.type;
        this.applyConfigToNode(node, config);
        return node;
    }
}