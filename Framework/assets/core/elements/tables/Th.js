import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Th extends Element {
    constructor() {
        super({tagName: HTMLTag.TH});
    }
}