import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Li extends Element {
    constructor() {
        super({ tagName: HTMLTag.LI });
    }
}