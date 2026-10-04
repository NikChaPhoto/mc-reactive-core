import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Track extends Element {
    constructor() {
        super({tagName: HTMLTag.TRACK});
    }
}