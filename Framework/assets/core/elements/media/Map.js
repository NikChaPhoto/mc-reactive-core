import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class Map extends Element {
    constructor() {
        super({tagName: HTMLTag.MAP});
    }
}