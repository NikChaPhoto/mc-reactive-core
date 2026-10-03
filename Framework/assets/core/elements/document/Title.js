import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Title extends Element {
    constructor() {
        super({tagName: HTMLTag.TITLE});
    }
}