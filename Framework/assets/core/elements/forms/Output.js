import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Output extends Element {
    constructor() {
        super({tagName: HTMLTag.OUTPUT});
    }
}