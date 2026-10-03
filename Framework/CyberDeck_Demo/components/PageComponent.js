import ContainerComponent from '../../assets/core/components/layout/ContainerComponent.js';
import HeaderComponent from '../../assets/core/components/layout/HeaderComponent.js';
import CardComponent from './CardComponent.js';
import SearchComponent from './SearchComponent.js';

export default class PageComponent extends ContainerComponent {
    constructor(context = null) {
        super();
        this.context = context;
        this.setConfig({
            classes: ['page'],
            components: [
                new HeaderComponent().setConfig({
                    text: 'CyberDeck',
                    classes: ['header', 'pb-2'],
                    components: [
                        new SearchComponent().setConfig({
                            classes: [],
                            placeholder: 'Search...'
                        }),
                    ]
                }),
                new CardComponent().setConfig({
                    classes: ['card'],
                    title: {
                        text: 'Components',
                        classes: ['card__title']
                    },
                    body: {
                        text: 'Our UI is built from components.',
                        classes: ['card__text']
                    }
                }),
                new CardComponent().setConfig({
                    classes: ['card'],
                    title: {
                        text: 'Elements',
                        classes: ['card__title']
                    },
                    body: {
                        text: 'Components create native DOM elements.',
                        classes: ['card__text']
                    }
                }),
                new CardComponent().setConfig({
                    classes: ['card'],
                    title: {
                        text: 'Future',
                        classes: ['card__title']
                    },
                    body: {
                        text: 'Animations, video, games and more.',
                        classes: ['card__text']
                    }
                }),
            ]
        })
    }
}