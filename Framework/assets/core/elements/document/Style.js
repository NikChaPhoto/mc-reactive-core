import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Style extends Element {
    constructor() {
        super({tagName: HTMLTag.STYLE});
    }
}