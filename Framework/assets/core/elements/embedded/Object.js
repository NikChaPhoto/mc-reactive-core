import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Object extends Element {
    constructor() {
        super({tagName: HTMLTag.OBJECT});
    }
}