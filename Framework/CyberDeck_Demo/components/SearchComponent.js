import Component from '../../assets/core/Component.js';
import InputComponent from '../../assets/core/components/InputComponent.js';
import { InputType } from '../../assets/core/enums/InputType.js';
import Div from '../../assets/core/elements/layout/Div.js';
import Span from '../../assets/core/elements/typography/Span.js';
import Button from '../../assets/core/elements/forms/Button.js';

export default class SearchComponent extends Component {
    constructor(context = null) {
        super();
        this.context = context;
    }

    build() {
        const config = this.getConfig();

        const root = new Div();
        root.classList.add(
            'position-relative',
            'search-component'
        );

        const searchIcon = new Span();
        searchIcon.classList.add(
            'fa',
            'fa-search',
            'position-absolute',
            'top-50',
            'start-0',
            'translate-middle-y',
            'ms-3',
            'text-secondary'
        );

        const inputComponent = new InputComponent().setConfig({
            type: InputType.SEARCH,
            placeholder: config?.placeholder ?? 'Search...',
            classes: [
                'form-control',
                'ps-5',
                'pe-5'
            ]
        });

        const clearButton = new Button();

        clearButton.classList.add(
            'btn',
            'position-absolute',
            'top-50',
            'end-0',
            'translate-middle-y',
            'me-2',
            'p-0',
            'text-secondary',
            'text-decoration-none',
            'd-none'
        );

        clearButton.setAttribute(
            'aria-label',
            'Clear search'
        );

        const clearIcon = new Span();

        clearIcon.classList.add(
            'fa',
            'fa-xmark'
        );

        clearButton.appendChild(clearIcon);

        root.appendChild(searchIcon);

        const inputNode = this.appendComponent(
            root,
            inputComponent
        )?.node ?? null;

        root.appendChild(clearButton);
        if (inputNode) {
            const clearEventHandler = () => {
                clearButton.classList.toggle('d-none', inputNode.value.length === 0);
            }
            inputNode.addEventListener('input', () => {
                clearEventHandler();
            })
            clearButton.addEventListener('click', () => {
                inputNode.value = '';

                inputNode.focus();

                inputNode.dispatchEvent(
                    new Event('input', {
                        bubbles: true
                    })
                );
            });
        }

        return root;
    }
}