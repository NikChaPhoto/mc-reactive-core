import Component from "../../Component.js";
import Label from "../../elements/forms/Label.js";

export default class LabelComponent extends Component {
    constructor(context) {
        super();
        this.context = context;
    }

    build(){
        const node = new Label();
        const config = this.getConfig();
        if (config?.for) node.htmlFor = config.for;
        this.applyConfigToNode(node, config);
        return node;
    }
}