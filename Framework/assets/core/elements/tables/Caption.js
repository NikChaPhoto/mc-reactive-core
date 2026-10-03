import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Caption extends Element {
    constructor() {
        super({tagName: HTMLTag.CAPTION});
    }
}