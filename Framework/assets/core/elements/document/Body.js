import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Body extends Element {
    constructor() {
        super({tagName: HTMLTag.BODY});
    }
}