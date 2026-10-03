import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Meter extends Element {
    constructor() {
        super({tagName: HTMLTag.METER});
    }
}