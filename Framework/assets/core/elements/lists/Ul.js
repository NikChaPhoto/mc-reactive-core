import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Ul extends Element {
    constructor() {
        super({ tagName: HTMLTag.UL });
    }
}