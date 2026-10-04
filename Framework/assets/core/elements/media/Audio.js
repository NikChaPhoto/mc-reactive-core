import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Audio extends Element {
    constructor() {
        super({tagName: HTMLTag.AUDIO});
    }
}