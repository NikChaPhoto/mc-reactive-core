import Element from '../../Element.js';
import { HTMLTag } from '../../enums/HTMLTag.js';

export default class Article extends Element {
    constructor() {
        super({ tagName: HTMLTag.ARTICLE });
    }
}