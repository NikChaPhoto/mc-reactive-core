import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Header extends Element {
    constructor() {
        super({ tagName: HTMLTag.HEADER });
    }
}