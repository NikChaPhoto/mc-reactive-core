### Ziel
- Custom Element Button auf Shadow DOM umstellen (richtiges Web-Components-Pattern).
- Weiterhin eine ergonomische Nutzung per new ButtonComponent({...}).build() ermöglichen.
- Fehler in der aktuellen Implementierung beheben (kein return im Konstruktor, saubere Instanziierung, Attribute/Property-Support).

---

### Probleme in der aktuellen Umsetzung (aus den angehängten Dateien)
- C:\projects\components\elements\button.js
    - Zeilen 4–8: Der Konstruktor erstellt ein natives <button>-Element und returned es (Zeile 8). Bei Custom Elements ist das nicht erlaubt – der Konstruktor darf kein anderes Node zurückgeben. Außerdem fehlt Shadow DOM.
    - Zeile 16: customElements.define("custom-button", Button) ist korrekt.
- C:\projects\components\button\button-component.js
    - Zeile 3: ButtonComponent extends Button – das koppelt den Builder unnötig an das HTMLElement.
    - Zeilen 10–15: build() macht new Button() und setzt textContent. Das ist problematisch, solange der Button-Konstruktor ein anderes Element returnt und generell unüblich; Standard ist document.createElement('custom-button') bzw. Property/Attribute setzen.

Ergebnis: Das Custom Element ist nicht standardkonform und nutzt kein Shadow DOM. Der Builder-Ansatz sollte nicht von HTMLElement erben.

---

### Korrektur: Button als echtes Web Component mit Shadow DOM
Ersetzen Sie C:\projects\components\elements\button.js durch folgende Variante. Sie:
- Verwendet Shadow DOM (attachShadow),
- Unterstützt label-Attribut und Property, plus Slot-Fallback,
- Reagiert auf Attributänderungen,
- Hat keine return-Anweisung im Konstruktor.

```js
// C:\projects\components\elements\button.js
export default class Button extends HTMLElement {
    static get observedAttributes() {
        return ['label'];
    }

    constructor() {
        super();
        const root = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
          :host { display: inline-block; }
          button {
            all: unset;
            box-sizing: border-box;
            display: inline-block;
            padding: 0.5rem 0.75rem;
            background: #2b6cb0;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            user-select: none;
            font-family: system-ui, sans-serif;
            border: 1px solid #1a4f86;
          }
          button:focus {
            outline: 2px solid #90cdf4;
            outline-offset: 2px;
          }
        `;

        this._btn = document.createElement('button');
        this._slot = document.createElement('slot');
        this._btn.appendChild(this._slot);

        root.append(style, this._btn);
    }

    connectedCallback() {
        this._updateLabelFromAttribute();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'label' && oldValue !== newValue) {
            this._updateLabelFromAttribute();
        }
    }

    _updateLabelFromAttribute() {
        const label = this.getAttribute('label');
        if (label != null) {
            this._btn.textContent = label;
        } else {
            this._btn.textContent = '';
            this._btn.appendChild(this._slot);
            queueMicrotask(() => {
                if (!this.textContent || this.textContent.trim() === '') {
                    this._btn.textContent = 'Click me';
                }
            });
        }
    }

    get label() { return this.getAttribute('label'); }
    set label(value) {
        if (value == null) this.removeAttribute('label');
        else this.setAttribute('label', String(value));
    }
}

customElements.define('custom-button', Button);
```

Wichtig:
- Kein return im Konstruktor.
- Shadow DOM kapselt Struktur/Styles.
- Attribut/Property und Slot werden unterstützt.

---

### Optionaler Builder: new ButtonComponent({ label }).build()
Ersetzen Sie C:\projects\components\button\button-component.js durch einen einfachen Builder, der NICHT von Button erbt und ein <custom-button>-Element erzeugt:

```js
// C:\projects\components\button\button-component.js
export default class ButtonComponent {
    constructor(context = {}) {
        this.context = context;
        this.node = null;
    }

    build() {
        const node = document.createElement('custom-button');

        if (this.context.label) {
            node.setAttribute('label', this.context.label);
            // alternativ: node.label = this.context.label;
        }

        if (typeof this.context.onClick === 'function') {
            node.addEventListener('click', this.context.onClick);
        }

        // Optional: weitere Props wie disabled, variant, etc.
        if (this.context.disabled) {
            node.setAttribute('disabled', ''); // nur falls Sie disabled im Component-Template unterstützen
        }

        this.node = node;
        return node;
    }
}
```

Warum so? Der Builder kapselt nur die Erstellung/Konfiguration; die eigentliche Web Component bleibt ein reines HTMLElement.

---

### Verwendung: Beispiele
- Direkt (ohne Builder):
```js
// per Attribut
defineOnce(); // Pseudocode: Stellen Sie sicher, dass button.js geladen/definiert ist
const btn1 = document.createElement('custom-button');
btn1.setAttribute('label', 'Speichern');
document.body.appendChild(btn1);

// per Property
const btn2 = document.createElement('custom-button');
btn2.label = 'Abbrechen';
document.body.appendChild(btn2);

// per Slot (Kindinhalt)
const btn3 = document.createElement('custom-button');
btn3.textContent = 'Weiter';
document.body.appendChild(btn3);

// direkt via Klasse (nach define)
const BtnClass = customElements.get('custom-button');
const btn4 = new BtnClass();
btn4.label = 'Direkt via Klasse';
document.body.appendChild(btn4);
```

- Mit Builder new ButtonComponent({...}).build():
```js
import ButtonComponent from './components/button/button-component.js';

const btn = new ButtonComponent({
  label: 'Senden',
  onClick: () => console.log('Clicked!')
}).build();

document.body.appendChild(btn);
```

- In HTML:
```html
<custom-button label="Senden"></custom-button>
<custom-button>Als Slot-Text</custom-button>
```

---

### Häufige Stolpersteine und Tipps
- Im Custom-Element-Konstruktor niemals ein anderes Node returnen.
- this.textContent ist im Konstruktor oft noch leer; für Inhalte via <slot> sorgen oder erst in connectedCallback prüfen.
- Bevorzugt document.createElement('custom-button') statt new Button(), außer Sie greifen explizit über customElements.get('custom-button') auf die Klasse zu.
- Für dynamische Labels Attribute/Property verwenden und observedAttributes/attributeChangedCallback nutzen.

---

### Kurzfazit
- Button-Komponente auf Shadow DOM umstellen (kein return im Konstruktor, Attribut/Property/Slot-Support).
- Builder entkoppeln: ButtonComponent ist ein Erzeuger, der <custom-button> erstellt und konfiguriert.
- Der Ansatz new ButtonComponent({...}).build() funktioniert danach sauber und standardkonform – inklusive Shadow DOM im eigentlichen Custom Element.