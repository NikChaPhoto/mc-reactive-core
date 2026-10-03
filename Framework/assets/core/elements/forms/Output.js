import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Output extends Element {
    constructor() {
        super({tagName: HTMLTag.OUTPUT});
    }
}