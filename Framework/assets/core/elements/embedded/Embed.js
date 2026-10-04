import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Embed extends Element {
    constructor() {
        super({tagName: HTMLTag.EMBED});
    }
}