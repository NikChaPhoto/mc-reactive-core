# Dein erster Lernpfad

Ziel: Du kannst erklären, was im Browser passiert, statt nur fertigen Code zu kopieren.

## Schritt 1: Ein Objekt besitzt ein anderes Objekt

Öffne `src/core/UIElement.js` und `src/elements/Div.js`.

```js
const div = new Div();
```

Verfolge:

```text
new Div()
  -> Div.constructor()
  -> super('div')
  -> UIElement.constructor('div')
  -> document.createElement('div')
  -> this.node
```

Fragen: Warum ist `div` nicht selbst ein HTMLDivElement? Was ist `div.node`?
Warum brauchen Div und Span dieselben Methoden nicht doppelt?

Aufgabe: Ergänze analog `Ul.js` und `Li.js` sowie ihre Exporte in `src/index.js`.
Verwende sie in einem kleinen Beispiel auf der Showcase.

## Schritt 2: Das DOM verändern

Lies `addClass()`, `text()` und `append()`.

```js
const box = new Div();
const label = new Span();
label.text('Mein erstes Element');
box.append(label);
```

Fragen: Warum nimmt append `child.node` statt `child`? Was bewirkt `return this`?
Warum kann `text()` auf einem Container seine Buttons entfernen?

Aufgabe: Ändere den Text und eine CSS-Klasse im Elements-Beispiel.
Prüfe im Elements-Tab der Browser-Entwicklertools, welcher native Node sich ändert.

## Schritt 3: Struktur und Verhalten verbinden

Lies `Counter.build()` und `Counter.setValue()`.

```text
Klick -> Handler -> setValue() -> count -> valueElement.text() -> DOM
```

`build()` gibt das Skelett zurück. `setValue()` ändert nur den Text des vorhandenen
Elements. Der Button wird nicht neu erzeugt. `this.valueElement` wird als Property
aufbewahrt, weil eine zweite Methode diesen Wrapper später braucht.
`label` und `actions` bleiben dagegen lokal in build.

Aufgabe: Ergänze eine Konfiguration `step`, damit Plus und Minus z. B. in
Fünferschritten zählen. Anfangswert und Reset sollen weiterhin korrekt funktionieren.
Überlege, welche Werte für step erlaubt sein sollen, und schreibe dafür einen Test.

## Schritt 4: Lebensdauer verstehen

Lies `Component.mount()`, `listen()` und `destroy()`, danach `App.destroy()`.

Ein `AbortController` pro Component beendet ihre Listener. Ein Kind-Counter hat
seinen eigenen Controller und wird vom App-Besitzer explizit zerstört.

Aufgabe: Klicke Zerstören und Neu erstellen mehrfach. Der Counter soll jeweils bei
seinem Anfangswert starten und ein Klick soll weiterhin genau einmal zählen.
Die alte Instanz wird nicht wiederbelebt; es wird eine neue erzeugt.

Fragen: Warum reicht root.remove() für einen Listener auf window nicht aus?
Warum rufen wir build nicht im Component-Konstruktor auf?

## Schritt 5: Die nächste echte Component planen

Erst jetzt TreeView. Beginne ohne globalen EventBus und ohne State-Engine:

```js
// Ziel-API für den NÄCHSTEN Meilenstein; noch nicht implementiert.
const tree = new TreeView({
    data: folders,
    getLabel: item => item.Name,
    getChildren: item => item.SubDirectories?.Directory ?? [],
    onSelect: item => console.log(item),
});
```

Baue danach denselben Baum mit einer zweiten Datenstruktur:

```js
getLabel: item => item.label,
getChildren: item => item.children ?? [],
```

Der Beweis für Wiederverwendbarkeit: Nur die Resolver ändern sich, nicht die
TreeView-Implementierung. Speichere aufgelöste Werte lokal, nicht in der Config
oder den originalen Daten.

Wenn wir dabei wiederholte Zuweisungen sehen, entwerfen wir `appendConfig()` anhand
der konkreten Fälle. Bis dahin bleibt eine Funktion einfach eine Funktion.

## Muster nicht mit Zielen verwechseln

- Ein DOM-Wrapper ist nicht automatisch ein klassischer Decorator.
- Chaining allein ist noch kein klassischer Builder.
- Der feste Ablauf mount -> build ist eine kleine Template-Method-artige Struktur.
- Austauschbare getLabel-/getChildren-Funktionen werden unser Strategy-Beispiel.
- Einen EventBus oder Singleton bauen wir erst, wenn die Anwendung ihn wirklich braucht.

Das sind Einordnungen dieser Architektur, keine zusätzlichen Klassen, die du jetzt
implementieren musst. Als erstes Ergebnis reicht: Du kannst den Weg von
`new Div()` zum sichtbaren DOM und vom Klick zur geänderten Zahl selbst erklären.
