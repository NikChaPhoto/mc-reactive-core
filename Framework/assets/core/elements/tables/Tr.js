import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Tr extends Element {
    constructor() {
        super({tagName: HTMLTag.TR});
    }
}