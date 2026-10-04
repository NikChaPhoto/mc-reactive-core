import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class NoScript extends Element {
    constructor() {
        super({tagName: HTMLTag.NOSCRIPT});
    }
}