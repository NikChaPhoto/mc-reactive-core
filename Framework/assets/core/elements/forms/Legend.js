import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Legend extends Element {
    constructor() {
        super({tagName: HTMLTag.LEGEND});
    }
}