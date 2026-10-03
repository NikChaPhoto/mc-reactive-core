/** A thin wrapper: the native DOM node remains available as .node. */
export default class UIElement {
    constructor(tagName) {
        this.node = document.createElement(tagName);
    }

    addClass(...names) {
        this.node.classList.add(...names);
        return this;
    }

    removeClass(...names) {
        this.node.classList.remove(...names);
        return this;
    }

    toggleClass(name, force) {
        if (force === undefined) {
            this.node.classList.toggle(name);
        } else {
            this.node.classList.toggle(name, force);
        }
        return this;
    }

    /** Raw attribute semantics: false becomes "false", null removes it. */
    attr(name, value) {
        if (value === null || value === undefined) {
            this.node.removeAttribute(name);
        } else {
            this.node.setAttribute(name, String(value));
        }
        return this;
    }

    /** Plain text, NOT HTML. Replaces all existing child nodes. */
    text(value) {
        this.node.textContent = value == null ? '' : String(value);
        return this;
    }

    /** Components are mounted explicitly; append accepts elements/nodes/text. */
    append(...children) {
        for (const child of children) {
            if (child === null || child === undefined) continue;

            const value = child instanceof UIElement ? child.node : child;
            if (!(value instanceof Node)
                && typeof value !== 'string'
                && typeof value !== 'number') {
                throw new TypeError('append() expects UIElement, DOM Node, string or number.');
            }
            this.node.append(value);
        }
        return this;
    }

    appendTo(parent) {
        const target = parent instanceof UIElement ? parent.node : parent;
        if (!(target instanceof Element) && !(target instanceof DocumentFragment)) {
            throw new TypeError('appendTo() expects a UIElement, DOM Element or DocumentFragment.');
        }
        target.appendChild(this.node);
        return this;
    }

    /** Standalone listener. Use Component.listen() for component-owned events. */
    on(type, handler, options) {
        this.node.addEventListener(type, handler, options);
        return this;
    }

    off(type, handler, options) {
        this.node.removeEventListener(type, handler, options);
        return this;
    }

    /** Detach only. This does NOT destroy a Component or remove listeners. */
    remove() {
        this.node.remove();
        return this;
    }
}
