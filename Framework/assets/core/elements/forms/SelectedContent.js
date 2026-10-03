import Element from "../../Element";
import {HTMLTag} from "../../enums/HTMLTag";

export default class SelectedContent extends Element {
    constructor() {
        super({tagName: HTMLTag.SELECTED_CONTENT});
    }
}