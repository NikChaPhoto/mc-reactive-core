import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Textarea extends Element {
    constructor() {
        super({tagName: HTMLTag.TEXTAREA});
    }
}