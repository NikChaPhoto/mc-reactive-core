import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Thead extends Element {
    constructor() {
        super({tagName: HTMLTag.THEAD});
    }
}