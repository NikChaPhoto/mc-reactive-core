import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Head extends Element {
    constructor() {
        super({tagName: HTMLTag.HEAD});
    }
}