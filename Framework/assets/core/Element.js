export default class Element {
    constructor({ tagName } = {}) {
        this.element = document.createElement(tagName);
        return this.element;
    }
}