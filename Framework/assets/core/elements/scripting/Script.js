import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Script extends Element {
    constructor() {
        super({tagName: HTMLTag.SCRIPT});
    }
}