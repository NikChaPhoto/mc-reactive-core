import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Template extends Element {
    constructor() {
        super({tagName: HTMLTag.TEMPLATE});
    }
}