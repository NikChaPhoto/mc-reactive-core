import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Dl extends Element {
    constructor() {
        super({ tagName: HTMLTag.DL });
    }
}