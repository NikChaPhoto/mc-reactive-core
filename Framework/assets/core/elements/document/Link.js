import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Link extends Element {
    constructor() {
        super({tagName: HTMLTag.LINK});
    }
}