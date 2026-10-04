import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Picture extends Element {
    constructor() {
        super({tagName: HTMLTag.PICTURE});
    }
}