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

const appDiv = document.getElementById('app');

const PNode = new P();
PNode.textContent = 'This is a paragraph element created using the P class.';
const H1Node = new H1();
H1Node.textContent = 'This is an H1 element created using the H1 class.';
const HGroupNode = new HGroup();
HGroupNode.appendChild(H1Node);
HGroupNode.appendChild(PNode);
appDiv.appendChild(HGroupNode);

const performanceMonitor = new PerformanceMonitor();
performanceMonitor.mount();

const page = new PageComponent();
page.mount(appDiv);

// Создание шапки таблицы
const table = new Table();
const headerRow = new Tr();
table.appendChild(headerRow);

const tHeadName = new Th();
const tHeadActions = new Th();
tHeadName.textContent = 'File Name';
tHeadActions.textContent = 'Actions';

headerRow.appendChild(tHeadName);
headerRow.appendChild(tHeadActions);
appDiv.appendChild(table);

const httpClient = new HttpClient('http://localhost:3000');

// Вспомогательная функция для принудительного скачивания
function triggerDirectDownload(url, fileName, isBlob = false) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Если скачивали Blob, освобождаем память через небольшую паузу
    if (isBlob && url.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}

function triggerOnlyDirectDownload(url, fileName) {
    const a = new Anchor();
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

async function renderFilesTable() {
    try {
        const data = await httpClient.request('/api/db');
        const files = data.files || [];

        files.forEach(file => {
            const row = new Tr();

            // 1. Имя файла
            const nameCell = new Td();
            nameCell.textContent = file.name;

            // 2. Действия
            const actionsCell = new Td();

            // --- КНОПКА 1: PREVIEW ---
            const previewBtn = document.createElement('button');
            previewBtn.textContent = 'Preview';
            previewBtn.style.marginRight = '8px';

            previewBtn.onclick = async () => {
                // Открываем вкладку синхронно (защита от Popup Blocker)
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
                        // Фолбэк: если формат не поддерживается браузером
                        if (previewWindow) previewWindow.close();
                        triggerDirectDownload(result.objectUrl, file.name, true);
                    }
                } catch (err) {
                    if (previewWindow) previewWindow.close();
                    console.error('Ошибка предпросмотра:', err);
                }
            };

            // --- КНОПКА 2: DOWNLOAD ---
            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download';

            downloadBtn.onclick = async () => {
                try {
                    // 1. Делаем запрос к серверу
                   // const response = await fetch(`http://localhost:3000${encodeURI(file.path)}`);
                    const downloadUrl = `http://localhost:3000${encodeURI(file.path)}`//?download=force`;

                    triggerOnlyDirectDownload(downloadUrl, file.name);
                    //if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                   // response.download(response.url, re)
                    // // 2. Вычитываем сырые байты файла
                    // const buffer = await response.arrayBuffer();
                    //
                    // // 3. Создаем Blob с принудительным типом application/octet-stream
                    // const forcedBlob = new Blob([buffer], { type: 'application/octet-stream' });
                    // const blobUrl = URL.createObjectURL(forcedBlob);
                    //
                    // // 4. Передаем сгенерированный blob-URL в функцию скачивания
                    //triggerDirectDownload(blobUrl, file.name, true);
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
renderFilesTable();