import { UIElement, Component, Div, Span, Button, Counter } from '../src/index.js';

const results = [];
const fixture = document.getElementById('fixtures');

function assert(condition, message = 'Assertion failed') {
    if (!condition) throw new Error(message);
}

function throws(callback, message = 'Expected an exception') {
    let thrown = false;
    try { callback(); } catch { thrown = true; }
    assert(thrown, message);
}

function test(name, callback) {
    try {
        callback();
        results.push({ name, passed: true });
    } catch (error) {
        results.push({ name, passed: false, error: error.message });
        console.error(name, error);
    } finally {
        fixture.replaceChildren();
    }
}

class Box extends Component {
    constructor(config) {
        super(config);
        this.buildCount = 0;
    }
    build() {
        this.buildCount += 1;
        return new Div().text('Box');
    }
}

function withCounter(callback, config) {
    const counter = new Counter(config);
    try {
        counter.mount(fixture);
        callback(counter);
    } finally {
        counter.destroy();
    }
}

test('Div und Span kapseln die passenden DOM-Knoten', () => {
    assert(new Div().node instanceof HTMLDivElement);
    assert(new Span().node instanceof HTMLSpanElement);
    assert(!(new Div() instanceof HTMLElement));
});

test('Button ist standardmäßig kein Submit-Button', () => {
    assert(new Button().node.type === 'button');
});

test('text() behandelt HTML als Text und ersetzt bestehende Kinder', () => {
    const div = new Div();
    div.append(new Span().text('Alt'));
    div.text('<img src=x onerror=alert(1)>');
    assert(div.node.querySelector('img') === null);
    assert(div.node.childElementCount === 0);
    assert(div.node.textContent === '<img src=x onerror=alert(1)>');
});

test('append() akzeptiert Wrapper, native Nodes, Text, Zahlen und null', () => {
    const div = new Div();
    div.append(new Span().text('A'), document.createTextNode('B'), 'C', 4, null);
    assert(div.node.textContent === 'ABC4');
    throws(() => div.append({ arbitrary: 'object' }));
});

test('Eine Component wird nicht versehentlich als [object Object] angehängt', () => {
    const component = new Box();
    try { throws(() => new Div().append(component)); }
    finally { component.destroy(); }
});

test('appendTo() akzeptiert einen Wrapper als Ziel', () => {
    const parent = new Div();
    const child = new Span();
    child.appendTo(parent);
    assert(parent.node.firstChild === child.node);
});

test('Klassen setzen, entfernen und mit/ohne force umschalten', () => {
    const div = new Div();
    assert(div.addClass('a', 'b') === div);
    div.removeClass('b');
    div.toggleClass('active');
    assert(div.node.classList.contains('active'));
    div.toggleClass('active');
    assert(!div.node.classList.contains('active'));
    div.toggleClass('active', true);
    div.toggleClass('active', true);
    assert(div.node.classList.contains('active'));
    div.toggleClass('active', false);
    assert(!div.node.classList.contains('active'));
    assert(div.node.className === 'a');
});

test('attr() bewahrt aria false; null entfernt das Attribut', () => {
    const button = new Button();
    button.attr('aria-pressed', false);
    assert(button.node.getAttribute('aria-pressed') === 'false');
    button.attr('aria-pressed', null);
    assert(!button.node.hasAttribute('aria-pressed'));
});

test('disabled() setzt die echte boolesche Button-Eigenschaft', () => {
    const button = new Button();
    button.disabled();
    assert(button.node.disabled);
    button.disabled(false);
    assert(!button.node.hasAttribute('disabled'));
});

test('Standalone on()/off() entfernen denselben Handler', () => {
    const button = new Button();
    let calls = 0;
    const handler = () => calls++;
    button.on('click', handler);
    button.node.click();
    button.off('click', handler);
    button.node.click();
    assert(calls === 1);
});

test('remove() trennt nur den Node, nicht den Event-Listener', () => {
    const button = new Button();
    let calls = 0;
    const handler = () => calls++;
    button.on('click', handler).appendTo(fixture);
    button.remove();
    button.node.click();
    button.off('click', handler);
    assert(button.node.parentNode === null);
    assert(calls === 1);
});

test('mount() baut einmal und hängt denselben Node erneut ein', () => {
    const box = new Box();
    try {
        box.mount(fixture);
        const node = box.root.node;
        box.mount(fixture);
        assert(box.buildCount === 1);
        assert(fixture.childElementCount === 1);
        assert(box.root.node === node);
    } finally { box.destroy(); }
});

test('mount() kann einen gebauten Baum in einen anderen Container verschieben', () => {
    const box = new Box();
    const target = new Div();
    try {
        box.mount(fixture);
        const original = box.root.node;
        box.mount(target);
        assert(original.parentNode === target.node);
        assert(fixture.childElementCount === 0);
        assert(box.buildCount === 1);
    } finally { box.destroy(); }
});

test('mount() akzeptiert DocumentFragment', () => {
    const box = new Box();
    const fragment = document.createDocumentFragment();
    try {
        box.mount(fragment);
        fixture.append(fragment);
        assert(box.root.node.parentNode === fixture);
    } finally { box.destroy(); }
});

test('Ungültiges mount-Ziel baut oder zerstört nichts', () => {
    const box = new Box();
    try {
        throws(() => box.mount(null));
        assert(box.buildCount === 0 && !box.destroyed);
        box.mount(fixture);
        throws(() => box.mount('selector-not-supported'));
        assert(box.root.node.parentNode === fixture && !box.destroyed);
    } finally { box.destroy(); }
});

test('destroy() ist mehrfach sicher; die Instanz ist danach nicht mountbar', () => {
    const box = new Box();
    box.mount(fixture);
    box.destroy();
    box.destroy();
    assert(fixture.childElementCount === 0);
    assert(box.root === null && box.destroyed);
    throws(() => box.mount(fixture));
});

test('Component.listen() räumt auch Listener auf window auf', () => {
    const box = new Box();
    let calls = 0;
    try {
        box.listen(window, 'ui-lab-test', () => calls++);
        window.dispatchEvent(new Event('ui-lab-test'));
        box.destroy();
        window.dispatchEvent(new Event('ui-lab-test'));
        assert(calls === 1);
        throws(() => box.listen(window, 'click', () => {}));
    } finally { box.destroy(); }
});

test('Component.listen() akzeptiert once und verhindert fremde Signals', () => {
    const box = new Box();
    const button = new Button();
    let calls = 0;
    try {
        box.listen(button, 'click', () => calls++, { once: true });
        button.node.click();
        button.node.click();
        assert(calls === 1);
        throws(() => box.listen(button, 'click', () => {}, { signal: new AbortController().signal }));
    } finally { box.destroy(); }
});

test('Fehlgeschlagenes build() räumt registrierte Listener auf', () => {
    let calls = 0;
    class Broken extends Component {
        build() {
            this.listen(window, 'ui-lab-broken', () => calls++);
            throw new Error('Expected build failure');
        }
    }
    const broken = new Broken();
    throws(() => broken.mount(fixture));
    window.dispatchEvent(new Event('ui-lab-broken'));
    assert(broken.destroyed && calls === 0);
});

test('build() ohne UIElement wird mit verständlichem Fehler abgelehnt', () => {
    class Invalid extends Component { build() { return document.createElement('div'); } }
    const invalid = new Invalid();
    throws(() => invalid.mount(fixture));
    assert(invalid.destroyed);
});

test('Counter: Plus, Minus und Reset aktualisieren denselben Wert-Node', () => {
    withCounter(counter => {
        const value = counter.valueElement.node;
        const [minus, plus, reset] = counter.root.node.querySelectorAll('button');
        plus.click();
        assert(counter.count === 11 && value.textContent === '11');
        minus.click();
        minus.click();
        assert(counter.count === 9);
        reset.click();
        assert(counter.count === 10 && value.textContent === '10');
        assert(value === counter.valueElement.node);
    }, { initialValue: 10 });
});

test('Zwei Counter besitzen unabhängigen State', () => {
    const first = new Counter();
    const second = new Counter({ initialValue: 20 });
    try {
        first.mount(fixture);
        second.mount(fixture);
        first.setValue(8);
        assert(first.count === 8 && second.count === 20);
    } finally { first.destroy(); second.destroy(); }
});

test('Nach destroy() reagieren aufbewahrte Counter-Buttons nicht mehr', () => {
    withCounter(counter => {
        const plus = counter.root.node.querySelector('[aria-label="Wert erhöhen"]');
        counter.destroy();
        plus.click();
        assert(counter.count === 0);
        throws(() => counter.setValue(1));
    });
});

test('Counter kann vor mount() einen Start-State erhalten', () => {
    const counter = new Counter();
    try {
        counter.setValue(7);
        counter.mount(fixture);
        assert(counter.valueElement.node.textContent === '7');
    } finally { counter.destroy(); }
});

test('Konfiguration und Quelldaten werden nicht umgeschrieben', () => {
    const config = Object.freeze({ initialValue: 4, item: Object.freeze({ icon: 'Home' }) });
    withCounter(counter => {
        counter.setValue(8);
        assert(config.initialValue === 4);
        assert(config.item.icon === 'Home');
        assert(counter.config !== config);
        assert(counter.config.item === config.item); // Deliberately a shallow copy.
    }, config);
});

test('Ungültige Konfiguration und nicht-endliche Zahlen werden abgelehnt', () => {
    throws(() => new Component(null));
    throws(() => new Counter({ initialValue: '0' }));
    throws(() => new Counter({ initialValue: Infinity }));
    withCounter(counter => {
        throws(() => counter.setValue(NaN));
        assert(counter.count === 0);
    });
});

for (const result of results) {
    const item = document.createElement('li');
    item.className = result.passed ? 'pass' : 'fail';
    item.textContent = `${result.passed ? 'OK' : 'FEHLER'} — ${result.name}${result.error ? `: ${result.error}` : ''}`;
    document.getElementById('results').append(item);
}
const passed = results.filter(result => result.passed).length;
const failed = results.length - passed;
const summary = document.getElementById('summary');
summary.textContent = `${passed} / ${results.length} bestanden. ${failed} fehlgeschlagen.`;
summary.className = failed ? 'fail' : 'pass';
document.title = `${failed ? 'FAIL' : 'PASS'} - UI / LAB Tests`;
window.__testResults = { total: results.length, passed, failed, results };
