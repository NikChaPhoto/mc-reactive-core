import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Tr extends Element {
    constructor() {
        super({tagName: HTMLTag.TR});
    }
}