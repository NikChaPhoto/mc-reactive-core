import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Div extends Element {
    constructor() {
        super({ tagName: HTMLTag.DIV });
    }
}