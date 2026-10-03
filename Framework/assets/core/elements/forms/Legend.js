import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Legend extends Element {
    constructor() {
        super({tagName: HTMLTag.LEGEND});
    }
}