import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Svg extends Element {
    constructor() {
        super({tagName: HTMLTag.SVG});
    }
}