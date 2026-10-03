import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Slot extends Element {
    constructor() {
        super({tagName: HTMLTag.SLOT});
    }
}