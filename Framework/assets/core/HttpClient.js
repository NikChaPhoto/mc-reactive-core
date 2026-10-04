const MIME_MAP = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'pdf': 'application/pdf',
    'txt': 'text/plain',
    'mp4': 'video/mp4',
    'mp3': 'audio/mpeg'
};

function getMimeByFilename(filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    return MIME_MAP[ext] || 'application/octet-stream';
}

function canBrowserPreview(mimeType) {
    if (!mimeType) return false;
    if (mimeType.startsWith('image/') || mimeType === 'application/pdf' || mimeType === 'text/plain') {
        return true;
    }
    if (mimeType.startsWith('video/')) {
        return Boolean(document.createElement('video').canPlayType(mimeType));
    }
    if (mimeType.startsWith('audio/')) {
        return Boolean(document.createElement('audio').canPlayType(mimeType));
    }
    return false;
}

export class HttpClient {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    async getFileForPreview(filePath, fileName) {
        const response = await fetch(`${this.baseUrl}${filePath}`);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const buffer = await response.arrayBuffer();

        // 2. Читаем заголовок от сервера
        let serverMime = response.headers.get('content-type');
        console.log(`[HttpClient] Заголовок от сервера: "${serverMime}"`);

        if (!serverMime || serverMime === 'application/octet-stream') {
            serverMime = getMimeByFilename(fileName);
            console.warn(`[HttpClient] Сервер прислал мусор. Переопределили MIME по имени файла: "${serverMime}"`);
        }

        const blob = new Blob([buffer], { type: serverMime });
        const objectUrl = URL.createObjectURL(blob);

        return {
            blob,
            objectUrl,
            mimeType: serverMime,
            canPreview: canBrowserPreview(serverMime)
        };
    }
    async request(url) {
        // Если передан относительный путь, объединяем с baseUrl класса
        const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;

        const res = await fetch(fullUrl);
        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        return res.json();
    }
}