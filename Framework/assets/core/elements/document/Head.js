import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Head extends Element {
    constructor() {
        super({tagName: HTMLTag.HEAD});
    }
}