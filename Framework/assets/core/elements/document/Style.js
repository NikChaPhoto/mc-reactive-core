import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Style extends Element {
    constructor() {
        super({tagName: HTMLTag.STYLE});
    }
}