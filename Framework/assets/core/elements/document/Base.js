import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Base extends Element {
    constructor() {
        super({tagName: HTMLTag.BASE});
    }
}