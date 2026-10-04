import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Template extends Element {
    constructor() {
        super({tagName: HTMLTag.TEMPLATE});
    }
}