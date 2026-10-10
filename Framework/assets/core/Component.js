import { ComponentState } from './enums/ComponentState.js';

export default class Component {
    constructor() {
        this.uuid = crypto.randomUUID();
        this.node = null;
        this.context = null;
        this.config = null;
        this.parentComponent = null;
        this.children = new Set();
        this.state = ComponentState.CREATED;
        this.events = [];
    }

    listen() {

    }
    build() {
        throw new Error(`${this.constructor.name} need build() function`);
    }

    render() {
        if (this.node !== null) {
            return this;
        }

        const node = this.build();

        if (!(node instanceof Node)) {
            throw new Error(
                `${this.constructor.name}.build() must return a DOM Node`
            );
        }

        this.node = node;
        this.prepareComponent();
        this.listen();
        this.state = ComponentState.RENDERED;
        console.log(this)
        return this;
    }

    rebuild() {
        this.assertUsable();

        const oldNode = this.node;
        const parentNode = oldNode?.parentNode;

        this.cleanupEvents();

        this.node = null;

        const newNode = this.build();

        this.node = newNode;

        this.prepareComponent();
        this.listen();

        if (parentNode) {
            parentNode.replaceChild(
                newNode,
                oldNode
            );
        }

        return this;
    }

    destroy() {
        this.cleanupEvents();

        for (const child of [...this.children]) {
            child.destroy();
        }

        this.children.clear();

        if (this.parentComponent) {
            this.parentComponent.children.delete(this);
        }

        this.parentComponent = null;

        this.node?.remove();
        this.node = null;

        this.state = ComponentState.DESTROYED;

        return this;
    }

    appendComponent(parentNode, component) {
        component.render();

        component.parentComponent = this;

        this.children.add(component);

        parentNode.appendChild(
            component.getNode()
        );

        return component;
    }

    applyComponentToNode(node, components) {
        if (!components) return;
        for (const component of components) {
            this.appendComponent(node, component)
        }
    }

    applyConfigToNode(node, config) {
        if (!config) return;
        if (config.text !== undefined) {
            node.textContent = config.text ?? '';
        }
        if (config.attributes) {
            for (const [key, value] of Object.entries(config.attributes)) {
                node.setAttribute(key, value);
            }
        }
        if (config.classes) {
            node.classList.add(...config.classes);
        }
        if (config.dataset) {
            for (const [key, value] of Object.entries(config.dataset)) {
                node.dataset[key] = value;
            }
        }
        if(config.id) node.id = config.id;
        if (config.components) {
            this.applyComponentToNode(node, config.components)
        }
    }

    prepareComponent() {
        this.node.dataset.component = this.constructor.name;
        this.node.dataset.componentIdentifier = this.uuid;
    }


    mount(parent) {
        this.render();
        parent.appendChild(this.node);
        this.state = ComponentState.MOUNTED;
        return this;
    }

    setConfig(config = {}) {
        this.config = config;
        return this;
    }

    getConfig() {
        return this.config;
    }

    getContext() {
        return this.context;
    }

    getNode() {
        return this.node;
    }

    addEvent(target, type, handler, options = {}) {
        if (!(target instanceof EventTarget)) {
            throw new Error(`${this.constructor.name}.addEvent() expects an EventTarget`);
        }
        target.addEventListener(type, handler, options);
        this.events.push({ target, type, handler, options });
        return handler;
    }

    cleanupEvents() {
        for (const event of this.events) {
            event.target.removeEventListener(event.type, event.handler, event.options);
        }
        this.events = [];
        return this;
    }
}