import Table from "../elements/table/table.js";

export default class TableComponent extends Table {
    constructor(context = {}) {
        super();
        this.context = context;
        this.node = null
    }

    build(){
        this.node = new Table();
        if (this.context.id) {
            this.node.id = this.context.id;
        }
        return this.node;
    }
}
