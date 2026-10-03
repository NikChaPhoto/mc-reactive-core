import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class H3 extends Element {
    constructor() {
        super({ tagName: HTMLTag.H3 });
    }
}