import ContainerComponent from './assets/core/components/layout/ContainerComponent.js';
import ButtonComponent from './assets/core/components/forms/ButtonComponent.js';
import { ButtonType } from './assets/core/enums/ButtonType.js';
import Button from './assets/core/elements/forms/Button.js';
const navButton = (text, active = false) => {
    return new ButtonComponent().setConfig({
        text,
        type: ButtonType.BUTTON,
        classes: [
            'nav-button',
            ...(active ? ['nav-button--active'] : [])
        ]
    });
};

const projectCard = ({
    title,
    description,
    progress
}) => {
    return new ContainerComponent().setConfig({
        classes: ['project-card'],

        components: [
            new ContainerComponent().setConfig({
                text: title,
                classes: ['project-card__title']
            }),

            new ContainerComponent().setConfig({
                text: description,
                classes: ['project-card__description']
            }),

            new ContainerComponent().setConfig({
                classes: ['project-card__progress'],

                components: [
                    new ContainerComponent().setConfig({
                        classes: ['project-card__progress-bar'],

                        attributes: {
                            style: `width: ${progress}%`
                        }
                    })
                ]
            }),

            new ContainerComponent().setConfig({
                text: `${progress}% complete`,
                classes: ['project-card__progress-text']
            })
        ]
    });
};


const app = new ContainerComponent().setConfig({
    classes: ['app'],

    components: [

        // HEADER
        new ContainerComponent().setConfig({
            classes: ['header'],

            components: [
                new ContainerComponent().setConfig({
                    text: 'CYBERDECK',
                    classes: ['header__brand']
                }),

                new ContainerComponent().setConfig({
                    classes: ['header__actions'],

                    components: [
                        new ButtonComponent().setConfig({
                            text: '+ New Project',
                            type: ButtonType.BUTTON,
                            classes: ['button', 'button--primary']
                        }),

                        new ButtonComponent().setConfig({
                            text: '●',
                            type: ButtonType.BUTTON,
                            classes: ['profile-button'],

                            attributes: {
                                'aria-label': 'User menu'
                            }
                        })
                    ]
                })
            ]
        }),

        // BODY
        new ContainerComponent().setConfig({
            classes: ['layout'],

            components: [

                // SIDEBAR
                new ContainerComponent().setConfig({
                    classes: ['sidebar'],

                    components: [
                        new ContainerComponent().setConfig({
                            text: 'Workspace',
                            classes: ['sidebar__title']
                        }),

                        navButton('Dashboard', true),
                        navButton('Projects'),
                        navButton('Tasks'),
                        navButton('Notes'),

                        new ContainerComponent().setConfig({
                            classes: ['sidebar__spacer']
                        }),

                        navButton('Settings')
                    ]
                }),

                // MAIN CONTENT
                new ContainerComponent().setConfig({
                    classes: ['content'],

                    components: [
                        new ContainerComponent().setConfig({
                            text: 'Workspace',
                            classes: ['page-title']
                        }),

                        new ContainerComponent().setConfig({
                            text: 'Your active projects and recent activity.',
                            classes: ['page-description']
                        }),

                        new ContainerComponent().setConfig({
                            classes: ['project-grid'],

                            components: [
                                projectCard({
                                    title: 'UI Framework',
                                    description:
                                        'Vanilla JavaScript component framework.',
                                    progress: 38
                                }),

                                projectCard({
                                    title: 'Dealership',
                                    description:
                                        'Vehicle dealership backend and frontend.',
                                    progress: 12
                                }),

                                projectCard({
                                    title: 'CyberDeck',
                                    description:
                                        'Interactive workspace built with our framework.',
                                    progress: 21
                                })
                            ]
                        }),

                        new ContainerComponent().setConfig({
                            classes: ['activity'],

                            components: [
                                new ContainerComponent().setConfig({
                                    text: 'Recent activity',
                                    classes: ['section-title']
                                }),

                                new ContainerComponent().setConfig({
                                    text: 'Framework core updated',
                                    classes: ['activity-item']
                                }),

                                new ContainerComponent().setConfig({
                                    text: 'Button component created',
                                    classes: ['activity-item']
                                }),

                                new ContainerComponent().setConfig({
                                    text: 'HTML element enums added',
                                    classes: ['activity-item']
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});

const button = new ButtonComponent().setConfig({
    text: 'Click me',
    classes: ['button', 'button--primary']
});
button.mount(document.body);
console.log(button);
console.log(button.element);
console.log(button.constructor);
console.log(button instanceof Button);
console.log(button instanceof Element);
console.log(button instanceof HTMLElement);
console.log(button.element instanceof HTMLElement);
console.log(button.element instanceof HTMLButtonElement);
console.log(button instanceof ButtonComponent);
console.log(button instanceof HTMLElement);
console.log(button instanceof HTMLButtonElement);
app.mount(
    document.getElementById('app')
);