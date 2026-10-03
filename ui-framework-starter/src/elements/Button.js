import UIElement from '../core/UIElement.js';

export default class Button extends UIElement {
    constructor() {
        super('button');
        this.attr('type', 'button');
    }

    /** HTML boolean attributes differ from e.g. aria-disabled="false". */
    disabled(value = true) {
        this.node.disabled = Boolean(value);
        return this;
    }
}
