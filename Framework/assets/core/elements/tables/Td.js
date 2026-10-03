import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Td extends Element {
    constructor() {
        super({tagName: HTMLTag.TD});
    }
}