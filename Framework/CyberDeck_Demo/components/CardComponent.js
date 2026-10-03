import Component from '../../assets/core/Component.js';
import Span from '../../assets/core/elements/typography/Span.js';
import Div from '../../assets/core/elements/layout/Div.js';

export default class CardComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }
    build() {
        const node = new Div();
        const config = this.getConfig();
        this.applyConfigToNode(node, config);
        const title = new Span();
        if (config?.title) this.applyConfigToNode(title, config.title);
        const body = new Span();
        if (config?.body) this.applyConfigToNode(body, config.body);
        node.appendChild(title);
        node.appendChild(body);
        return node;
    }
}