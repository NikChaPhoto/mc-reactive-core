import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class P extends Element {
    constructor() {
        super({ tagName: HTMLTag.P });
    }
}