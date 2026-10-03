import ButtonComponent from "./components/button/button-component.js";
import TableComponent from "./components/table/table-component.js";


const saveBtn = new ButtonComponent({ label: "Speichern" }).build();
document.body.appendChild(saveBtn);
const tableComponent = new TableComponent({}).build();
document.body.appendChild(tableComponent);