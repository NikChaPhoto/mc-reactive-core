import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Dd extends Element {
    constructor() {
        super({ tagName: HTMLTag.DD });
    }
}