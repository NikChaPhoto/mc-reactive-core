/**
 * HTMLTag Enum
 * Centralized registry of HTML tags mapped to framework element classes.
 */
export const HTMLTag = Object.freeze({
    // Document
    BASE: 'base',
    BODY: 'body',
    HEAD: 'head',
    HTML: 'html',
    LINK: 'link',
    META: 'meta',
    STYLE: 'style',
    TITLE: 'title',

    // Embedded
    EMBED: 'embed',
    IFRAME: 'iframe',
    OBJECT: 'object',

    // Forms
    BUTTON: 'button',
    DATALIST: 'datalist',
    FIELDSET: 'fieldset',
    FORM: 'form',
    INPUT: 'input',
    LABEL: 'label',
    LEGEND: 'legend',
    METER: 'meter',
    OPTGROUP: 'optgroup',
    OPTION: 'option',
    OUTPUT: 'output',
    PROGRESS: 'progress',
    SELECT: 'select',
    SELECTED_CONTENT: 'selectedcontent',
    TEXTAREA: 'textarea',

    // Graphics
    CANVAS: 'canvas',
    SVG: 'svg',

    // Interactive
    A: 'a',
    DETAILS: 'details',
    DIALOG: 'dialog',
    SUMMARY: 'summary',

    // Layout
    ADDRESS: 'address',
    ARTICLE: 'article',
    ASIDE: 'aside',
    DIV: 'div',
    FOOTER: 'footer',
    HEADER: 'header',
    HGROUP: 'hgroup',
    MAIN: 'main',
    NAV: 'nav',
    SECTION: 'section',

    // Lists
    DD: 'dd',
    DL: 'dl',
    DT: 'dt',
    LI: 'li',
    OL: 'ol',
    UL: 'ul',

    // Media
    AUDIO: 'audio',
    IMG: 'img',
    MAP: 'map',
    PICTURE: 'picture',
    SOURCE: 'source',
    TRACK: 'track',
    VIDEO: 'video',

    // Scripting
    NOSCRIPT: 'noscript',
    SCRIPT: 'script',
    SLOT: 'slot',
    TEMPLATE: 'template',

    // Tables
    CAPTION: 'caption',
    COL: 'col',
    COLGROUP: 'colgroup',
    TABLE: 'table',
    TBODY: 'tbody',
    TD: 'td',
    TFOOT: 'tfoot',
    TH: 'th',
    THEAD: 'thead',
    TR: 'tr',

    // Typography
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
    P: 'p',
    SPAN: 'span'
});