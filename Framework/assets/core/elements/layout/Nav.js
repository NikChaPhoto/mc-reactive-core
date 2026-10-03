import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Nav extends Element {
    constructor() {
        super({ tagName: HTMLTag.NAV });
    }
}