import Div from '../../assets/core/elements/layout/Div.js';

export default class PerformanceMonitor {
    constructor() {
        this.element = null;
        this.frames = 0;
        this.fps = 0;
        this.lastFpsUpdate = performance.now();
        this.animationFrame = null;
        this.updateInterval = null;
    }
    mount() {
        this.element = new Div();
        this.appendStyle();
        document.body.appendChild(this.element);

        this.startFpsCounter();
        this.updateInterval = setInterval(() => {
            this.update();
        }, 1000);
        this.update();
        return this;
    }

    startFpsCounter() {
        const tick = (now) => {
            this.frames++;

            const elapsed = now - this.lastFpsUpdate;
            if (elapsed >= 1000) {
                this.fps = Math.round(this.frames * 1000 / elapsed);
                this.frames = 0;
                this.lastFpsUpdate = now;
            }
            this.animationFrame = requestAnimationFrame(tick);
        };

        this.animationFrame = requestAnimationFrame(tick);
    }

    update() {
        const domNodes = document.getElementsByTagName('*').length;

        const components = document.querySelectorAll('[data-component]').length;
        let memory = 'n/a';
        if (performance.memory) {
            memory = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1) + 'MB';
            this.element.textContent = ` | FPS ${this.fps} ` + `| DOM ${domNodes}` + ` | Components ${components}` + ` | Heap ${memory}`;
        }
    }

    destroy() {
        cancelAnimationFrame(this.animationFrame);
        clearInterval(this.updateInterval);
        this.element.remove();
        this.element = null;
    }

    appendStyle() {
        this.element.style.position = 'fixed';
        this.element.style.right = '10px';
        this.element.style.bottom = '10px';
        this.element.style.zIndex = '999999';
        this.element.style.padding = '6px 10px';
        this.element.style.background = 'rgba(0, 0, 0, 0.8)';
        this.element.style.color = '#55e6a5';
        this.element.style.fontFamily = 'monospace';
        this.element.style.fontSize = '12px';
        this.element.style.borderRadius = '6px';
    }
}