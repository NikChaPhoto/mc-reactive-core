# UI / LAB — Framework-Starter

**Meilenstein 1: DOM-Wrapper + Component + Counter + Musterseite.**

Ein kleines Lernprojekt in Vanilla JavaScript. Kein npm install, kein Bundler,
keine Runtime-Abhängigkeiten und kein extern geladener Font.
Es ist eine bewusst begrenzte Ausgangsbasis, kein fertiges Universal-Framework.

## 1. Starten

Entpacke den Ordner `ui-framework-starter` und öffne ihn in deinem Editor.
Im Terminal dieses Ordners einen lokalen HTTP-Server starten.

Windows mit installiertem Python:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Ubuntu / Linux mit installiertem Python 3:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Alternativ mit vorhandenem PHP:

```bash
php -S 127.0.0.1:8000
```

Showcase: `http://127.0.0.1:8000/`

Browser-Tests: `http://127.0.0.1:8000/tests/`

Mit Strg+C beendest du den Server. Nur zur lokalen Entwicklung verwenden.
Nicht per Doppelklick als `file://` starten: ES-Module brauchen hier einen HTTP-Server.
Nach Codeänderungen die Seite neu laden; Hot Reload ist nicht implementiert.
Bei Portkonflikten z. B. 8001 statt 8000 verwenden.

## 2. Wo liegt was?

```text
ui-framework-starter/
    src/
        core/
            UIElement.js       DOM-Wrapper
            Component.js       build / mount / listen / destroy
        elements/
            Div.js
            Span.js
            Button.js
        components/
            Counter.js         wiederverwendbare Beispiel-Component
        index.js               gemeinsame Exporte
    styles/
        framework.css          optionale Button-/Counter-Styles
    showcase/
        App.js                 Musterseite, verwendet src/
        showcase.css           nur das Design der Musterseite
    tests/
        index.html
        tests.js               kleine Tests direkt im Browser
    index.html
    main.js
    README.md
    LERNPFAD.md
```

**Abhängigkeitsrichtung:** Showcase -> Components -> Core/Elements -> DOM.
`src/` importiert nichts aus `showcase/`. Ein Window Manager gehört später
zunächst in eine eigene CyberDeck-Beispielanwendung. Er ist nicht Teil dieses Core.

## 3. Der Weg zur sichtbaren Seite

```text
index.html -> main.js -> App.mount(host) -> App.build()
                                  -> UIElement / Div / Span / Button
                                  -> native DOM-Knoten im Browser
```

`UIElement` heißt bewusst nicht `Element`, damit der Name nicht mit dem nativen
Browser-Typ `Element` verwechselt wird. Ein Wrapper besitzt einen Node:

```js
const div = new Div();
div.node; // natives HTMLDivElement
```

Für seltene Tags ist `new UIElement('section')` völlig ausreichend.
Nicht jeder HTML-Tag braucht am Anfang seine eigene Klasse.

## 4. Die API

### UIElement

| Methode | Vertrag |
| --- | --- |
| `addClass(...names)` | Einzelne Klassennamen übergeben; nicht `'a b'`, sondern `'a', 'b'`. |
| `removeClass(...names)` | Klassen entfernen. |
| `toggleClass(name, force?)` | Ohne force umschalten, mit Boolean gezielt setzen/entfernen. |
| `text(value)` | Reiner Text; ersetzt alle bisherigen Kindknoten. |
| `attr(name, value)` | Wert als String setzen; null/undefined entfernt das Attribut. |
| `append(...children)` | UIElement, native Node, String, Number; null/undefined wird ignoriert. |
| `appendTo(parent)` | Ziel ist UIElement, nativer Element-Knoten oder DocumentFragment. |
| `on(type, handler, options?)` | Nativer DOM-Listener, ohne automatische Component-Zuordnung. |
| `off(type, handler, options?)` | Denselben Handler wieder entfernen. |
| `remove()` | Nur aus dem DOM lösen; kein Component-destroy und kein Event-Cleanup. |

Die Methoden geben `this` zurück. Chaining ist möglich, aber in den Components
wird der Aufbau meistens absichtlich linear geschrieben.

`attr('aria-pressed', false)` setzt den String `"false"`. Das ist beabsichtigt.
Für das boolesche HTML-Attribut `disabled` nutze `button.disabled(false)` statt
`attr('disabled', false)`: Ein vorhandenes disabled-Attribut deaktiviert den Button
unabhängig vom Textwert.

`text()` ist kein HTML-Parser. Eine allgemeine `html()`-Methode ist nicht eingebaut.
Das macht aber nicht jede API automatisch sicher: URLs, Attributnamen und
Event-Handler dürfen nicht ungeprüft aus fremden Daten übernommen werden.

### Component

```js
class MyPanel extends Component {
    build() {
        const root = new Div();
        const button = new Button();
        button.text('Klick');
        this.listen(button, 'click', () => console.log('Klick'));
        root.append(button);
        return root;
    }
}
```

- `build()` wird vom ersten `mount()` aufgerufen, nicht aus dem Basiskonstruktor.
- `build()` liefert synchron genau ein UIElement. Keine Promise und kein async build.
- Ein zweites `mount()` verwendet denselben Baum; bei anderem Ziel wird er verschoben.
- `mount()` ruft keine onMount-Hooks auf. Es kann auch in einen noch nicht verbundenen Container mounten.
- `listen(target, type, handler, options)` registriert Component-eigene Events.
  Ziel kann auch `window` oder `document` sein. Options: capture, once, passive.
  Das AbortSignal gehört der Component und darf nicht extern ersetzt werden.
- `destroy()` entfernt den Root und die über `listen()` registrierten Listener.
  Mehrere destroy-Aufrufe sind sicher. Danach eine **neue Instanz** erzeugen.
- Bei einem fehlgeschlagenen build wird die Instanz zerstört; sie wird nicht erneut verwendet.
- Untergeordnete Components werden explizit vom Besitzer zerstört.
  Siehe `App.destroy()`. DOM-Verschachtelung ist noch kein Ownership-System.
- Timer, Fetches und Store-Subscriptions sind nicht automatisch abgedeckt.
  Sobald wir sie brauchen, ergänzen wir gezielte Cleanup-Verträge.

`build()` nicht direkt als zweite Render-Methode aufrufen. Ein Update wie
`Counter.setValue()` ändert bestehende Nodes, statt den Baum neu aufzubauen.

## 5. Lokaler State, noch kein Store

```js
const counter = new Counter({ initialValue: 10 });
counter.mount(document.getElementById('app'));
counter.setValue(15);
counter.destroy();
```

`count` ist eine normale JavaScript-Eigenschaft. Erst `setValue()` aktualisiert
zusätzlich den Text. Es gibt keine automatische Reaktivität.
Reset setzt auf `initialValue` zurück, nicht unbedingt auf null.
Die Demo verwendet normale JavaScript-Zahlen und ist keine präzise Dezimalarithmetik-Bibliothek.

Die Config wird flach kopiert. Verschachtelte Objekte werden **nicht** geklont
oder eingefroren. Unser Code liest sie und schreibt keine aufgelösten Werte hinein.

## 6. Wiederverwenden

Für eine zweite Browser-Anwendung reichen `src/` und optional
`styles/framework.css`. Die Showcase muss nicht mitkopiert werden:

```js
import { Counter } from './src/index.js';

const counter = new Counter({ initialValue: 5 });
counter.mount(document.getElementById('app'));
```

Die Styles für Buttons/Counter verwenden `ui-`-Klassen und CSS-Variablen. Nur die
Showcase-Styles setzen globale Farben, Reset und Seitenlayout.
Ein gemeinsames Paket für mehrere Repositories folgt später; diese Version ist noch
nicht als npm-Paket veröffentlicht. Das Barrel `src/index.js` ist nur ein Export-Einstieg.

Ziel dieser Version: Browser-DOM in einem Dokument. Kein SSR, Canvas-Renderer,
Native-Mobile-Renderer oder automatisches Cross-Iframe-Objektmodell.
FiveM NUI ist ein plausibles späteres Ziel, aber Bridge, Manifest, Fokussteuerung
und Tests in der konkreten CEF-Umgebung sind hier **nicht** implementiert.

## 7. Was fehlt absichtlich?

Kein Virtual DOM, Signal-System, globaler EventBus, Service-Container,
Window Manager, Router, automatische Renderer-Auswahl oder allgemeiner Config-Resolver.

`this.get()` und `appendConfig()` werden noch nicht vorgetäuscht. Der nächste
Schritt ist eine echte TreeView mit `getLabel(item)` und `getChildren(item)`.
An diesem Beispiel können wir herausarbeiten, was ein allgemeiner Resolver wirklich
leisten muss. Die Originaldaten und die Config-Struktur bleiben dabei erhalten.

## 8. Tests

Die Seite `/tests/` prüft unter anderem DOM-Typen, Textbehandlung, Klassen,
Attribute, Event-Cleanup, zweimaliges mount, destroy, falsche Argumente,
Counter-Isolation und unveränderte Config-Daten.
Es sind funktionale Tests, kein Nachweis vollständiger Accessibility,
plattformübergreifender Kompatibilität oder allgemeiner Memory-Leak-Freiheit.

## 9. Grundlage und Abgrenzung

Aus deinen Vorschlägen übernommen: DOM zuerst, Element-Wrapper, ein linearer
build-Aufbau, Trennung Element/Component, Lernen am echten UI und eine frühe Showcase.

Entscheidungen dieser Umsetzung: synchrones build, terminales destroy,
Component-eigene Listener per AbortController, keine Core-Singletons,
vorerst explizite Updates und Config-Resolver erst im nächsten Meilenstein.
Diese Entscheidungen sind Vorschläge für die Startversion, kein Beleg dafür,
dass es nur diese Architektur geben kann.

## 10. Technische Referenzen

Die Implementierung ist eigener Beispielcode. Die Browser-Verträge lassen sich
hier nachlesen:

- ES-Module: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- DOM-Events und signal: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- textContent: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- Klassen/extends: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends
- Lokaler Python-Server: https://docs.python.org/3/library/http.server.html
- FiveM NUI: https://docs.fivem.net/docs/scripting-manual/nui-development/

Weiter mit `LERNPFAD.md`. Nicht alle Dateien auswendig lernen: mit UIElement und
Div anfangen, dann einen einzelnen Klick durch Counter verfolgen.
