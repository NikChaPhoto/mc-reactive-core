import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Canvas extends Element {
    constructor() {
        super({tagName: HTMLTag.CANVAS});
    }
}