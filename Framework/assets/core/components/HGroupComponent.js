import Component from '../Component.js';
import HGroup from '../elements/layout/HGroup.js';

export default class HGroupComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }

    build() {
        const node = new HGroup();
        const config = this.getConfig();
        this.applyConfigToNode(node, config);
        return node;
    }
}