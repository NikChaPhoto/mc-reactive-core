import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Anchor extends Element {
    constructor() {
        super({tagName: HTMLTag.A});
    }
}