import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Summary extends Element {
    constructor() {
        super({tagName: HTMLTag.SUMMARY});
    }
}