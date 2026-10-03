import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Tfoot extends Element {
    constructor() {
        super({tagName: HTMLTag.TFOOT});
    }
}