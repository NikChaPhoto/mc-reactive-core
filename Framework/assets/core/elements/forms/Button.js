import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';
import { ButtonType } from '../../enums/ButtonType.js';

export default class Button extends Element {
    constructor() {
        super({ tagName: HTMLTag.BUTTON });
        this.type = ButtonType.BUTTON;
    }
}