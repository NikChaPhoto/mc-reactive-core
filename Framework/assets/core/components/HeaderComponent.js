import Component from '../Component.js';
import Header from '../elements/layout/Header.js';

export default class HeaderComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }
    build() {
        const node = new Header();
        const config = this.getConfig();
        this.applyConfigToNode(node, config);
        return node;
    }
}