import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class OptGroup extends Element {
    constructor() {
        super({tagName: HTMLTag.OPTGROUP});
    }
}
