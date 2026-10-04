import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Anchor extends Element {
    constructor() {
        super({tagName: HTMLTag.A});
    }
}