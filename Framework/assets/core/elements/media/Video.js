import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Video extends Element {
    constructor() {
        super({tagName: HTMLTag.VIDEO});
    }
}