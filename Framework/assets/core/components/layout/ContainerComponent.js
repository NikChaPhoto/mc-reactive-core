import Component from '../../Component.js';
import Div from '../../elements/layout/Div.js';

export default class ContainerComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }

    build() {
        const node = new Div();
        const config = this.getConfig();
        this.applyConfigToNode(node, config);
        return node;
    }
}