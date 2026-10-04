import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class ColGroup extends Element {
    constructor() {
        super({tagName: HTMLTag.COLGROUP});
    }
}