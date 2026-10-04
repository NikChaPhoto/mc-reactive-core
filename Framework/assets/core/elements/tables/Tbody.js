import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Tbody extends Element {
    constructor() {
        super({tagName: HTMLTag.TBODY});
    }
}