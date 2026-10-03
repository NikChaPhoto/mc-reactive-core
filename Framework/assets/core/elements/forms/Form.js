import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Form extends Element {
    constructor() {
        super({ tagName: HTMLTag.FORM });
    }
}