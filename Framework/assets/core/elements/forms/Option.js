import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Option extends Element {
    constructor() {
        super({tagName: HTMLTag.OPTION});
    }
}