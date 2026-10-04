import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Dialog extends Element {
    constructor() {
        super({tagName: HTMLTag.DIALOG});
    }
}