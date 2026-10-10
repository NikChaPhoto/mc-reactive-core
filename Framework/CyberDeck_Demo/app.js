import PageComponent from './components/PageComponent.js';
import PerformanceMonitor from './dev/PerformanceMonitor.js';
import P from '../assets/core/elements/typography/P.js';
import H1 from '../assets/core/elements/typography/H1.js';
import HGroup from '../assets/core/elements/layout/HGroup.js';
import { HttpClient } from '../assets/core/HttpClient.js';
import Table from "../assets/core/elements/tables/Table.js";
import Th from "../assets/core/elements/tables/Th.js";
import Tr from "../assets/core/elements/tables/Tr.js";
import Td from "../assets/core/elements/tables/Td.js";
import Anchor from "../assets/core/elements/interactive/Anchor.js";
import Button from "../assets/core/elements/forms/Button.js";
import LabelComponent from "../assets/core/components/forms/LabelComponent.js";
import InputComponent from "../assets/core/components/forms/InputComponent.js";
import ContainerComponent from "../assets/core/components/layout/ContainerComponent.js";

const appDiv = document.getElementById('app');

const PNode = new P();
PNode.textContent = 'This is a paragraph element created using the P class.';
const H1Node = new H1();
H1Node.textContent = 'This is an H1 element created using the H1 class.';
const HGroupNode = new HGroup();
const labelComponent = new LabelComponent().setConfig({text: 'Enter your name:', for: 'nameInput', classes: ['form-label']});
const inputComponent = new InputComponent().setConfig({text: 'Enter your name:', id: 'nameInput', classes: ['form-control', 'w-25']});
const containerComponent = new ContainerComponent().setConfig({classes: ['pt-2']});
containerComponent.mount(appDiv);
labelComponent.mount(containerComponent.node);
inputComponent.mount(containerComponent.node);
HGroupNode.appendChild(H1Node);
HGroupNode.appendChild(PNode);
appDiv.appendChild(HGroupNode);

const performanceMonitor = new PerformanceMonitor();
performanceMonitor.mount();

const page = new PageComponent();
page.mount(appDiv);

const table = new Table();
const headerRow = new Tr();
table.appendChild(headerRow);

const tHeadName = new Th();
const tHeadActions = new Th();
tHeadName.textContent = 'File Name';
tHeadActions.textContent = 'Actions';

headerRow.appendChild(tHeadName);
headerRow.appendChild(tHeadActions);
page.node.appendChild(table);

const httpClient = new HttpClient('http://localhost:3000');

function triggerDirectDownload(url, fileName, isBlob = false) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    if (isBlob && url.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}

async function renderFilesTable() {
    try {
        const data = await httpClient.request('/api/db');

        const files = data.files || [];

        files.forEach(file => {
            const row = new Tr();

            const nameCell = new Td();
            nameCell.textContent = file.name;

            const actionsCell = new Td();

            const previewBtn = new Button();
            previewBtn.classList.add('btn','btn-secondary');
            previewBtn.textContent = 'Preview';
            previewBtn.style.marginRight = '8px';

            previewBtn.onclick = async () => {
                const previewWindow = window.open('about:blank', '_blank');
                if (previewWindow) {
                    previewWindow.document.write('<p style="font-family:sans-serif; padding:20px;">Загрузка предпросмотра...</p>');
                }

                try {
                    const safePath = encodeURI(file.path);
                    const result = await httpClient.getFileForPreview(safePath, file.name);

                    if (result.canPreview) {
                        if (previewWindow) {
                            previewWindow.location.href = result.objectUrl;
                        }
                    } else {
                        if (previewWindow) previewWindow.close();
                        triggerDirectDownload(result.objectUrl, file.name, true);
                    }
                } catch (err) {
                    if (previewWindow) previewWindow.close();
                    console.error('Ошибка предпросмотра:', err);
                }
            };

            const downloadBtn = new Button();
            console.log({downloadBtn});
            downloadBtn.classList.add('btn','btn-primary');
            downloadBtn.textContent = 'Download';

            downloadBtn.onclick = async () => {
                try {
                    const response = await fetch(`http://localhost:3000${encodeURI(file.path)}`);
                    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

                    console.log('Real Content-Type:', response.headers.get('content-type'));
                    console.log('Real Content-Disposition:', response.headers.get('content-disposition'));
                    const buffer = await response.arrayBuffer();
                    const forcedBlob = new Blob([buffer], { type: 'application/octet-stream' });
                    const blobUrl = URL.createObjectURL(forcedBlob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = file.name || 'downloaded-file';
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                } catch (err) {
                    console.error('Ошибка при скачивании:', err);
                }
            };

            actionsCell.appendChild(previewBtn);
            actionsCell.appendChild(downloadBtn);

            row.appendChild(nameCell);
            row.appendChild(actionsCell);
            table.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}
await renderFilesTable();