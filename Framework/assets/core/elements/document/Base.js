import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Base extends Element {
    constructor() {
        super({tagName: HTMLTag.BASE});
    }
}