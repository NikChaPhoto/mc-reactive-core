import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Details extends Element {
    constructor() {
        super({tagName: HTMLTag.DETAILS});
    }
}