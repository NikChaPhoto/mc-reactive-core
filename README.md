# mc-reactive-core

> A lightweight, zero-dependency, object-oriented Vanilla JavaScript UI framework designed to streamline modern web application development through a clean DOM abstraction layer.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg?style=flat-square)
![Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen.svg?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-OOP%20%2F%20Event--Driven-blue.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-orange.svg?style=flat-square)

---

## Language / Sprache
- [English](#english)
- [Deutsch](#deutsch)

---

## English

### Overview
`mc-reactive-core` provides a predictable, type-safe, and modular layer for building UI applications without the overhead of heavy virtual DOM frameworks. By wrapping native HTML elements into object-oriented classes and managing state through explicit events, it eliminates unnecessary API refetches and UI reflows.

### Key Features
* **Object-Oriented Architecture:** Built on extensible `Component` and `Element` base classes for structured UI management.
* **Semantic Element Abstraction:** Modular OOP wrappers around native HTML5 elements categorized by layout, typography, lists, and forms.
* **Type-Safe Enums:** Standardized tag names, component states, and input types to eliminate magic strings.
* **Event-Driven Updates:** Reactive interaction system allowing targeted DOM and state updates without full layout reflows or unnecessary API requests.
* **Zero Dependencies:** Pure Vanilla JS implementation for maximum performance, predictability, and minimal footprint.

---

## Deutsch

### Übersicht
`mc-reactive-core` ist ein leichtgewichtiges, objektorientiertes JavaScript-UI-Framework ohne externe Abhängigkeiten. Es bietet eine strukturierte DOM-Abstraktionsschicht für skalierbare Webanwendungen und vermeidet unnötige DOM-Rebuilds und API-Anfragen.

### Kernmerkmale
* **Objektorientierte Architektur:** Modulare Basisklassen (`Component`, `Element`) für sauberes UI-State-Management.
* **Semantische HTML-Abstraktion:** Kapselung nativer HTML5-Elemente (Layout, Typografie, Listen, Formulare).
* **Typisierung durch Enums:** Vermeidung von "Magic Strings" durch zentrale Enums für Tags, Zustände und Typen.
* **Ereignisgesteuerte Updates:** Event-basiertes System für gezielte UI- und Datenaktualisierungen ohne vollständige DOM-Rebuilds.
* **Zero-Dependencies:** Reines Vanilla JS für maximale Performance und volle Kontrolle über die Codebase.

---

## Project Architecture

```text
core/
├── components/      # Higher-level composite UI blocks (ButtonComponent, InputComponent, etc.)
├── elements/        # OOP wrappers for native HTML5 tags
│   ├── layout/      # Div, Section, Header, Main, Nav, etc.
│   ├── lists/       # Ul, Ol, Li, Dd, Dl, Dt
│   └── typography/  # H1-H6, P, Span
├── enums/           # Type safety (HTMLTag, ComponentState, InputType, etc.)
├── events/          # Reactive event-handling system
├── Component.js     # Base Component class
└── Element.js       # Base Element class
