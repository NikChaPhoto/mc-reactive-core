import Element from "../../Element.js";
import {HTMLTag} from "../../enums/HTMLTag.js";

export default class Meter extends Element {
    constructor() {
        super({tagName: HTMLTag.METER});
    }
}