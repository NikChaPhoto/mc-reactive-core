import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Audio extends Element {
    constructor() {
        super({tagName: HTMLTag.AUDIO});
    }
}