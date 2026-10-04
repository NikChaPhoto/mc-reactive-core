import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Table extends Element {
    constructor() {
        super({tagName: HTMLTag.TABLE});
    }
}