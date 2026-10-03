import Element from '../Element.js';
import { HTMLTag } from '../enums/HTMLTag.js';

export default class Input extends Element {
    constructor() {
        super({ tagName: HTMLTag.INPUT });
    }
}