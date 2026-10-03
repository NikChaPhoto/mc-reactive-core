import UIElement from './UIElement.js';

/** Small synchronous lifecycle: build once, mount, destroy permanently. */
export default class Component {
    constructor(config = {}) {
        if (config === null || typeof config !== 'object' || Array.isArray(config)) {
            throw new TypeError('Component config must be an object.');
        }
        this.config = { ...config }; // Shallow copy, no resolving or rewriting.
        this.root = null;
        this.destroyed = false;
        this._events = new AbortController();
    }

    /** Override in a subclass. Return exactly one UIElement, not a Promise. */
    build() {
        throw new Error(`${this.constructor.name}.build() must be implemented.`);
    }

    mount(parent) {
        if (this.destroyed) {
            throw new Error('Cannot mount a destroyed Component. Create a new instance.');
        }
        const target = parent instanceof UIElement ? parent.node : parent;
        if (!(target instanceof Element) && !(target instanceof DocumentFragment)) {
            throw new TypeError('mount() expects a UIElement, DOM Element or DocumentFragment.');
        }

        try {
            if (this.root === null) {
                const root = this.build();
                if (!(root instanceof UIElement)) {
                    throw new TypeError('build() must synchronously return a UIElement.');
                }
                this.root = root;
            }
            // A second mount moves the SAME node; it does not rebuild it.
            this.root.appendTo(target);
        } catch (error) {
            this.destroy(); // A failed build also releases its owned listeners.
            throw error;
        }
        return this;
    }

    /** All listeners registered here share this component's lifetime.
     * options: { capture?, once?, passive? }; signal is owned by Component.
     */
    listen(target, type, handler, options = {}) {
        if (this.destroyed) {
            throw new Error('Cannot add listeners to a destroyed Component.');
        }
        if (options === null || typeof options !== 'object' || 'signal' in options) {
            throw new TypeError('listen() options must be an object without signal.');
        }
        const node = target instanceof UIElement ? target.node : target;
        if (!(node instanceof EventTarget)) {
            throw new TypeError('listen() expects a UIElement or EventTarget.');
        }
        node.addEventListener(type, handler, {
            ...options,
            signal: this._events.signal,
        });
        return this;
    }

    /** Idempotent. Subclasses explicitly destroy any child Components. */
    destroy() {
        if (this.destroyed) return this;
        this.destroyed = true;
        this._events.abort();
        this.root?.remove();
        this.root = null;
        return this;
    }
}
