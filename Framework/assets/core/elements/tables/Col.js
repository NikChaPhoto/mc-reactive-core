import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Col extends Element {
    constructor() {
        super({tagName: HTMLTag.COL});
    }
}