import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Table extends Element {
    constructor() {
        super({tagName: HTMLTag.TABLE});
    }
}