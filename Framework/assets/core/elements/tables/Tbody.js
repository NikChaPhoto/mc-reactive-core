import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Tbody extends Element {
    constructor() {
        super({tagName: HTMLTag.TBODY});
    }
}