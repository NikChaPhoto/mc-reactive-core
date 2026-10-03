import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class HGroup extends Element {
    constructor() {
        super({ tagName: HTMLTag.HGROUP });
    }
}