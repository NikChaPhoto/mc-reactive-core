import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Meta extends Element {
    constructor() {
        super({tagName: HTMLTag.META});
    }
}