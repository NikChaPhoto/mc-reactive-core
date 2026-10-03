import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class NoScript extends Element {
    constructor() {
        super({tagName: HTMLTag.NOSCRIPT});
    }
}