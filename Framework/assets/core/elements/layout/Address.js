import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Address extends Element {
    constructor() {
        super({ tagName: HTMLTag.ADDRESS });
    }
}