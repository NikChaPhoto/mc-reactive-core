import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Meta extends Element {
    constructor() {
        super({tagName: HTMLTag.META});
    }
}