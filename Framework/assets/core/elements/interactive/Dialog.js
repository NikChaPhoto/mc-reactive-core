import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Dialog extends Element {
    constructor() {
        super({tagName: HTMLTag.DIALOG});
    }
}