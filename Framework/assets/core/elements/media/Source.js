import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Source extends Element {
    constructor() {
        super({tagName: HTMLTag.SOURCE});
    }
}