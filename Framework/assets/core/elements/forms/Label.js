import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Label extends Element {
    constructor() {
        super({tagName: HTMLTag.LABEL});
    }
}