import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Textarea extends Element {
    constructor() {
        super({tagName: HTMLTag.TEXTAREA});
    }
}