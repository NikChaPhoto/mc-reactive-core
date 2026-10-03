import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Img extends Element {
    constructor() {
        super({tagName: HTMLTag.IMG});
    }
}