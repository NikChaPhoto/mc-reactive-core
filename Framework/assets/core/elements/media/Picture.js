import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Picture extends Element {
    constructor() {
        super({tagName: HTMLTag.PICTURE});
    }
}