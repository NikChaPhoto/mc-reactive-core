import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Fieldset extends Element {
    constructor() {
        super({tagName: HTMLTag.FIELDSET});
    }
}