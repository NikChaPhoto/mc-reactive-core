import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Ol extends Element {
    constructor() {
        super({ tagName: HTMLTag.OL });
    }
}