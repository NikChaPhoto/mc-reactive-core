import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class ColGroup extends Element {
    constructor() {
        super({tagName: HTMLTag.COLGROUP});
    }
}