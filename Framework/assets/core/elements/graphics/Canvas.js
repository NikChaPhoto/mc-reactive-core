import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Canvas extends Element {
    constructor() {
        super({tagName: HTMLTag.CANVAS});
    }
}