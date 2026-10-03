import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Option extends Element {
    constructor() {
        super({tagName: HTMLTag.OPTION});
    }
}