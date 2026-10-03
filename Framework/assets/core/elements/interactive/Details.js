import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Details extends Element {
    constructor() {
        super({tagName: HTMLTag.DETAILS});
    }
}