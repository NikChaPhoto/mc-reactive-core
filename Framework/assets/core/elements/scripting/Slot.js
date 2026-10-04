import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Slot extends Element {
    constructor() {
        super({tagName: HTMLTag.SLOT});
    }
}