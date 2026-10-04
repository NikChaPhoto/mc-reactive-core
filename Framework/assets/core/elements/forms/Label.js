import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Label extends Element {
    constructor() {
        super({tagName: HTMLTag.LABEL});
    }
}