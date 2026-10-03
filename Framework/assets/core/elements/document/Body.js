import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Body extends Element {
    constructor() {
        super({tagName: HTMLTag.BODY});
    }
}