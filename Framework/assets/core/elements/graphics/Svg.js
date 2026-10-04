import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Svg extends Element {
    constructor() {
        super({tagName: HTMLTag.SVG});
    }
}