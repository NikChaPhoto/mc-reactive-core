import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Progress extends Element {
    constructor() {
        super({tagName: HTMLTag.PROGRESS});
    }
}