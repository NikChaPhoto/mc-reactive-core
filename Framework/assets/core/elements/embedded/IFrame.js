import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class IFrame extends Element {
    constructor() {
        super({tagName: HTMLTag.IFRAME});
    }
}