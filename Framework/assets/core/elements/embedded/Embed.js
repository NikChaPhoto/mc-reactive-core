import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Embed extends Element {
    constructor() {
        super({tagName: HTMLTag.EMBED});
    }
}