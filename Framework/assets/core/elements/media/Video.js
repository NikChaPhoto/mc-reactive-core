import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Video extends Element {
    constructor() {
        super({tagName: HTMLTag.VIDEO});
    }
}