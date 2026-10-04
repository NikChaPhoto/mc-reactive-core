import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Link extends Element {
    constructor() {
        super({tagName: HTMLTag.LINK});
    }
}