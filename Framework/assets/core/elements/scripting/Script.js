import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Script extends Element {
    constructor() {
        super({tagName: HTMLTag.SCRIPT});
    }
}