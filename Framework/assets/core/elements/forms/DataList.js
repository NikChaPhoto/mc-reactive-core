import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class DataList extends Element {
    constructor() {
        super({tagName: HTMLTag.DATALIST});
    }
}