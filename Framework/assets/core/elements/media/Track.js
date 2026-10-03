import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Track extends Element {
    constructor() {
        super({tagName: HTMLTag.TRACK});
    }
}