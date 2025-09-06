import ButtonComponent from "./components/button/button-component.js";


const saveBtn = new ButtonComponent({ label: "Speichern" }).build();
document.body.appendChild(saveBtn);