import Component from '../../Component.js';
import Span from '../../elements/typography/Span.js';

export default class SpanComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }
    build() {
        const node = new Span();
        const config = this.getConfig();
        this.applyConfigToNode(node, config);
        return node;
    }
}