import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class DataList extends Element {
    constructor() {
        super({tagName: HTMLTag.DATALIST});
    }
}