import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Html extends Element {
    constructor() {
        super({tagName: HTMLTag.HTML});
    }
}