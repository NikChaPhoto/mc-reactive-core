import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Th extends Element {
    constructor() {
        super({tagName: HTMLTag.TH});
    }
}