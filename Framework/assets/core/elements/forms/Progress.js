import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Progress extends Element {
    constructor() {
        super({tagName: HTMLTag.PROGRESS});
    }
}