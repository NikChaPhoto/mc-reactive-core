import { Component, UIElement, Div, Span, Button, Counter } from '../src/index.js';

// Local page helpers, NOT framework abstractions.
function textElement(tag, text, className) {
    const element = new UIElement(tag);
    if (className) element.addClass(className);
    element.text(text);
    return element;
}

function link(text, href, className) {
    const element = textElement('a', text, className);
    element.attr('href', href);
    return element;
}

function panel(number, title, description, id) {
    const root = new UIElement('section');
    root.addClass('panel');
    root.attr('id', id);
    root.attr('aria-labelledby', `${id}-title`);

    const heading = textElement('h2', title, 'panel__title');
    heading.attr('id', `${id}-title`);
    const header = new Div();
    header.addClass('panel__header');
    header.append(textElement('span', number, 'section-number'), heading);
    root.append(header, textElement('p', description, 'panel__description'));
    return root;
}

export default class App extends Component {
    constructor() {
        super();
        this.counter = null;
        this.counterHost = null;
        this.lifecycleStatus = null;
        this.mountButton = null;
        this.destroyButton = null;
    }

    build() {
        const root = new Div();
        root.addClass('showcase');
        root.append(this.buildSidebar());

        const main = new UIElement('main');
        main.addClass('main');
        main.attr('id', 'main');
        main.attr('tabindex', '-1');
        main.append(this.buildHeader(), this.buildIntro());

        const grid = new Div();
        grid.addClass('demo-grid');
        grid.append(this.buildCounterPanel(), this.buildCodePanel());
        main.append(grid, this.buildElementsPanel(), this.buildRoadmap());

        const footer = new UIElement('footer');
        footer.addClass('footer');
        footer.append(
            textElement('span', 'Kleiner Core. Echte Komponenten. Dein Code.'),
            link('Browser-Tests starten ↗', './tests/', 'text-link'),
        );
        main.append(footer);
        root.append(main);
        return root;
    }

    buildSidebar() {
        const aside = new UIElement('aside');
        aside.addClass('sidebar');
        const brand = new Div();
        brand.addClass('brand');
        const mark = textElement('span', 'ui', 'brand__mark');
        mark.attr('aria-hidden', 'true');
        const brandText = new Div();
        brandText.append(textElement('strong', 'UI / LAB'), textElement('span', 'Dein Framework. Von Grund auf.'));
        brand.append(mark, brandText);
        aside.append(brand, textElement('p', 'WORKSPACE', 'sidebar__label'));

        const nav = new UIElement('nav');
        nav.attr('aria-label', 'Showcase-Navigation');
        nav.addClass('nav');
        nav.append(
            link('01    Überblick', '#overview', 'nav__link'),
            link('02    Komponenten', '#components', 'nav__link'),
            link('03    Elements', '#elements', 'nav__link'),
            link('04    Lernpfad', '#roadmap', 'nav__link'),
        );
        aside.append(nav);
        const note = new Div();
        note.addClass('sidebar__note');
        note.append(
            textElement('span', 'MILESTONE 01', 'eyebrow'),
            textElement('strong', 'DOM zuerst.'),
            textElement('p', 'Noch kein Virtual DOM, kein EventBus und kein Window Manager. Erst eine Basis, die du verstehst.'),
        );
        aside.append(note, textElement('span', 'VANILLA JAVASCRIPT / ES MODULES', 'sidebar__footer'));
        return aside;
    }

    buildHeader() {
        const header = new UIElement('header');
        header.addClass('topbar');
        header.append(
            textElement('span', 'Showcase / Grundlagen', 'breadcrumb'),
            textElement('span', 'v0.1 · Lernprojekt', 'version'),
        );
        return header;
    }

    buildIntro() {
        const section = new UIElement('section');
        section.addClass('intro');
        section.attr('id', 'overview');
        section.append(textElement('p', 'BUILD. UNDERSTAND. REPEAT.', 'eyebrow'));
        const title = new UIElement('h1');
        title.append('Dein Framework.', new UIElement('br'), textElement('span', 'Ein Baustein nach dem anderen.', 'title-accent'));
        section.append(title, textElement('p', 'Diese Seite baut sich selbst mit deinem Core. Verändere ein Element, klicke einen Button und verfolge den Weg vom JavaScript-Objekt bis zum DOM.', 'intro__description'));
        const tags = new Div();
        tags.addClass('tags');
        for (const text of ['Keine Runtime-Pakete', 'Kein Build-Schritt', 'Direktes DOM']) {
            tags.append(textElement('span', text, 'tag'));
        }
        section.append(tags);
        return section;
    }

    buildCounterPanel() {
        const root = panel('01', 'Eine echte Component', 'Lokaler State, DOM-Events und ein sichtbarer Lebenszyklus.', 'components');
        this.counterHost = new Div();
        this.counterHost.addClass('counter-host');
        root.append(this.counterHost);

        const lifecycle = new Div();
        lifecycle.addClass('lifecycle');
        this.lifecycleStatus = new Span();
        this.lifecycleStatus.addClass('lifecycle__status');
        this.lifecycleStatus.attr('role', 'status');
        this.lifecycleStatus.attr('aria-live', 'polite');

        this.mountButton = new Button();
        this.mountButton.addClass('ui-button', 'ui-button--small');
        this.mountButton.text('Neu erstellen');
        this.listen(this.mountButton, 'click', () => this.createCounter());

        this.destroyButton = new Button();
        this.destroyButton.addClass('ui-button', 'ui-button--small');
        this.destroyButton.text('Zerstören');
        this.listen(this.destroyButton, 'click', () => this.destroyCounter());

        const actions = new Div();
        actions.addClass('lifecycle__actions');
        actions.append(this.destroyButton, this.mountButton);
        lifecycle.append(this.lifecycleStatus, actions);
        root.append(lifecycle);
        this.createCounter();
        return root;
    }

    createCounter() {
        if (this.counter) return;
        this.counterHost.text('');
        this.counter = new Counter({ initialValue: 0 });
        this.counter.mount(this.counterHost);
        this.lifecycleStatus.text('Component aktiv');
        this.mountButton.disabled(true);
        this.destroyButton.disabled(false);
    }

    destroyCounter() {
        if (!this.counter) return;
        this.counter.destroy();
        this.counter = null;
        this.counterHost.text('Der DOM-Baum wurde entfernt. Erstelle eine neue Instanz.');
        this.lifecycleStatus.text('Component zerstört');
        this.mountButton.disabled(false);
        this.destroyButton.disabled(true);
    }

    buildCodePanel() {
        const root = panel('02', 'Kein versteckter Zauber', 'Erzeugen. Konfigurieren. Zusammensetzen. Einhängen.', 'code');
        const pre = new UIElement('pre');
        pre.addClass('code');
        const code = new UIElement('code');
        code.text([
            "import { Div, Span } from './src/index.js';",
            '',
            'const card = new Div();',
            "card.addClass('my-card');",
            '',
            'const label = new Span();',
            "label.text('Hallo Framework');",
            '',
            'card.append(label);',
            "card.appendTo(document.getElementById('app'));",
        ].join('\n'));
        pre.append(code);
        root.append(pre, textElement('p', 'Ein Wrapper besitzt einen DOM-Knoten. Eine Component verbindet mehrere Wrapper mit Verhalten.', 'code-note'));
        return root;
    }

    buildElementsPanel() {
        const root = panel('03', 'Elements ausprobieren', 'Ein und dasselbe Element – nur sein Text und seine Klassen ändern sich.', 'elements');
        root.addClass('elements-panel');
        const demo = new Div();
        demo.addClass('element-playground');
        const preview = new Div();
        preview.addClass('element-preview');
        const label = new Span();
        label.attr('role', 'status');
        label.attr('aria-live', 'polite');
        label.text('Hallo Framework');
        preview.append(label);

        const controls = new Div();
        controls.addClass('element-controls');
        const textButton = new Button();
        textButton.addClass('ui-button');
        textButton.text('Text ändern');
        let alternate = false;
        this.listen(textButton, 'click', () => {
            alternate = !alternate;
            label.text(alternate ? 'Direkt im DOM aktualisiert.' : 'Hallo Framework');
        });
        const classButton = new Button();
        classButton.addClass('ui-button');
        classButton.text('Akzent umschalten');
        classButton.attr('aria-pressed', 'false');
        let accented = false;
        this.listen(classButton, 'click', () => {
            accented = !accented;
            preview.toggleClass('is-accent', accented);
            classButton.attr('aria-pressed', accented);
        });
        controls.append(textButton, classButton);
        demo.append(preview, controls);
        root.append(demo);
        return root;
    }

    buildRoadmap() {
        const section = new UIElement('section');
        section.attr('id', 'roadmap');
        section.addClass('roadmap');
        section.append(textElement('h2', 'Was als Nächstes entsteht', 'roadmap__title'));
        const steps = new UIElement('ol');
        steps.addClass('roadmap__steps');
        const entries = [
            ['01 / JETZT', 'Core + Showcase', 'Elements, Component und Counter'],
            ['02 / DANACH', 'TreeView + Resolver', 'Daten lesen, nicht umformen'],
            ['03 / SPÄTER', 'CyberDeck', 'Eigene App mit Window Manager'],
        ];
        for (const [number, title, description] of entries) {
            const step = new UIElement('li');
            step.append(textElement('span', number, 'eyebrow'), textElement('strong', title), textElement('span', description));
            steps.append(step);
        }
        section.append(steps);
        return section;
    }

    destroy() {
        // DOM nesting alone does not imply ownership of child Components.
        this.counter?.destroy();
        this.counter = null;
        super.destroy();
        this.counterHost = null;
        this.lifecycleStatus = null;
        this.mountButton = null;
        this.destroyButton = null;
        return this;
    }
}
