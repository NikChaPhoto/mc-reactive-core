# Testbericht der Startversion

## Ergebnis

- 26 von 26 funktionalen DOM-Tests bestanden.
- Plus, Minus und Reset geprüft; der Wert-Node wird nicht ersetzt.
- Tastaturbedienung mit Enter und erhaltener Button-Fokus geprüft.
- Zehn Zerstören-/Neu-erstellen-Zyklen mit jeweils korrekter Klickanzahl.
- Text- und Klassenumschaltung einschließlich aria-pressed geprüft.
- App.destroy() zerstört den untergeordneten Counter; alte Buttons reagieren nicht mehr.
- Viewports 1440, 1280, 768, 390 und 320 Pixel breit: kein horizontaler Seitenüberlauf.
- Desktop- und Mobile-Darstellung anhand von Screenshots kontrolliert.
- Keine JavaScript-Konsolenfehler in diesen Testabläufen.
- Syntaxprüfung aller JavaScript-Dateien mit Node.js bestanden.
- HTML-, CSS- und JS-Dateien per lokalem Python-HTTP-Server abgerufen; Inhalt und JavaScript-MIME-Typ geprüft.

## Testumgebung und Grenzen

Browser: Chromium 144.0.7559.96, headless, in dieser Entwicklungsumgebung.

Die verwaltete Browserumgebung sperrt URL-Navigation, auch zu localhost. Deshalb
wurden die eigenen lokalen Quelldateien für die DOM- und UI-Tests als Blob-ES-Module
in ein In-Memory-Dokument geladen. Relative Importpfade wurden dabei auf die
entsprechenden lokalen Blob-URLs abgebildet; die Klassen- und Komponentenlogik
blieb gleich. Die normalen HTTP-Dateiabfragen wurden getrennt mit Python getestet.
Ein vollständiger Browserstart über HTTP wurde hier nicht durchgeführt.

Firefox, Safari, reale Smartphones und die konkrete FiveM/CEF-Umgebung wurden nicht
getestet. Die Tests sind kein umfassendes Accessibility-Audit und kein Nachweis
vollständiger Memory-Leak-Freiheit. Gemessen wurde kein Vergleich mit anderen Frameworks.

Die Browser-Tests zum selbst Wiederholen liegen unter `tests/index.html`.
Maschinenlesbare Details des ausgeführten Laufs: `tests/last-run.json`.
