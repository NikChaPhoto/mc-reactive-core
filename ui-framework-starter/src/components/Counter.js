import Component from '../core/Component.js';
import Div from '../elements/Div.js';
import Span from '../elements/Span.js';
import Button from '../elements/Button.js';

export default class Counter extends Component {
    constructor(config = {}) {
        super(config);
        this.initialValue = this.config.initialValue ?? 0;
        if (!Number.isFinite(this.initialValue)) {
            throw new TypeError('initialValue must be a finite number.');
        }
        this.count = this.initialValue;
        this.valueElement = null;
    }

    build() {
        const root = new Div();
        root.addClass('ui-counter');

        const label = new Span();
        label.addClass('ui-counter__label');
        label.text('Aktueller Wert');

        this.valueElement = new Span();
        this.valueElement.addClass('ui-counter__value');
        this.valueElement.attr('role', 'status');
        this.valueElement.attr('aria-live', 'polite');
        this.valueElement.attr('aria-atomic', 'true');
        this.valueElement.text(this.count);

        const decrease = new Button();
        decrease.addClass('ui-button', 'ui-button--square');
        decrease.text('−');
        decrease.attr('aria-label', 'Wert verringern');
        this.listen(decrease, 'click', () => this.setValue(this.count - 1));

        const increase = new Button();
        increase.addClass('ui-button', 'ui-button--square', 'ui-button--primary');
        increase.text('+');
        increase.attr('aria-label', 'Wert erhöhen');
        this.listen(increase, 'click', () => this.setValue(this.count + 1));

        const reset = new Button();
        reset.addClass('ui-button', 'ui-button--quiet');
        reset.text('Zurücksetzen');
        this.listen(reset, 'click', () => this.setValue(this.initialValue));

        const actions = new Div();
        actions.addClass('ui-counter__actions');
        actions.append(decrease, increase, reset);
        root.append(label, this.valueElement, actions);
        return root;
    }

    /** Explicit update of one node, no rebuild and no automatic reactivity. */
    setValue(value) {
        if (this.destroyed) throw new Error('Cannot update a destroyed Counter.');
        if (!Number.isFinite(value)) throw new TypeError('Counter value must be finite.');
        this.count = value;
        this.valueElement?.text(this.count);
        return this;
    }

    destroy() {
        super.destroy();
        this.valueElement = null;
        return this;
    }
}
