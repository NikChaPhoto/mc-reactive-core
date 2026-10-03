import App from './showcase/App.js';

const host = document.getElementById('app');
const app = new App();

try {
    app.mount(host);
} catch (error) {
    console.error(error);
    app.destroy();
    if (host) {
        host.textContent = 'Die Showcase konnte nicht starten. Details stehen in der Browser-Konsole.';
    }
}
