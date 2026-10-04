import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Col extends Element {
    constructor() {
        super({tagName: HTMLTag.COL});
    }
}